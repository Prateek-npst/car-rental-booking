package com.example.carrental.service;

import com.example.carrental.dto.BookingRequest;
import com.example.carrental.entity.Booking;
import com.example.carrental.entity.Vehicle;
import com.example.carrental.exception.BadRequestException;
import com.example.carrental.exception.DuplicateResourceException;
import com.example.carrental.exception.ResourceNotFoundException;
import com.example.carrental.repository.BookingRepository;
import com.example.carrental.repository.VehicleRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final VehicleRepository vehicleRepository;

    public BookingService(
            BookingRepository bookingRepository,
            VehicleRepository vehicleRepository
    ) {
        this.bookingRepository = bookingRepository;
        this.vehicleRepository = vehicleRepository;
    }

    public Booking createBooking(BookingRequest request) {

        validateDateRange(request);

        Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found with id: " + request.getVehicleId()
                        )
                );

        boolean overlappingBooking =
                bookingRepository
                        .existsByVehicleIdAndStartDateLessThanAndEndDateGreaterThan(
                                request.getVehicleId(),
                                request.getEndDate(),
                                request.getStartDate()
                        );

        if (overlappingBooking) {
            throw new DuplicateResourceException(
                    "Vehicle is already booked for the requested date range"
            );
        }

        Booking booking = new Booking(
                request.getCustomerName(),
                request.getStartDate(),
                request.getEndDate(),
                vehicle
        );

        return bookingRepository.save(booking);
    }

    public Page<Booking> getAllBookings(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        return bookingRepository.findAll(pageable);
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Booking not found with id: " + id
                        )
                );
    }

    public Booking updateBooking(Long id, BookingRequest request) {

        validateDateRange(request);

        Booking existingBooking = getBookingById(id);

        Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found with id: " + request.getVehicleId()
                        )
                );

        boolean overlappingBooking =
                bookingRepository
                        .existsByVehicleIdAndIdNotAndStartDateLessThanAndEndDateGreaterThan(
                                request.getVehicleId(),
                                id,
                                request.getEndDate(),
                                request.getStartDate()
                        );

        if (overlappingBooking) {
            throw new DuplicateResourceException(
                    "Vehicle is already booked for the requested date range"
            );
        }

        existingBooking.setCustomerName(request.getCustomerName());
        existingBooking.setStartDate(request.getStartDate());
        existingBooking.setEndDate(request.getEndDate());
        existingBooking.setVehicle(vehicle);

        return bookingRepository.save(existingBooking);
    }

    public void deleteBooking(Long id) {
        Booking booking = getBookingById(id);
        bookingRepository.delete(booking);
    }

    public List<Booking> getBookingsByVehicleId(Long vehicleId) {

        vehicleRepository.findById(vehicleId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found with id: " + vehicleId
                        )
                );

        return bookingRepository.findByVehicleId(vehicleId);
    }

    private void validateDateRange(BookingRequest request) {

        LocalDate today = LocalDate.now();
        LocalDate maxDate = LocalDate.of(2050, 12, 31);

        if (request.getStartDate().isBefore(today)) {
            throw new BadRequestException(
                    "Start date cannot be before today"
            );
        }

        if (request.getEndDate().isAfter(maxDate)) {
            throw new BadRequestException(
                    "End date cannot be after 31 December 2050"
            );
        }

        if (request.getStartDate().isAfter(maxDate)) {
            throw new BadRequestException(
                    "Start date cannot be after 31 December 2050"
            );
        }

        if (!request.getStartDate().isBefore(request.getEndDate())) {
            throw new BadRequestException(
                    "Start date must be before end date"
            );
        }
    }
}
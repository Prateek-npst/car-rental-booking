package com.example.carrental.repository;

import com.example.carrental.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    boolean existsByVehicleIdAndStartDateLessThanAndEndDateGreaterThan(
            Long vehicleId,
            LocalDate endDate,
            LocalDate startDate
    );

    boolean existsByVehicleIdAndIdNotAndStartDateLessThanAndEndDateGreaterThan(
            Long vehicleId,
            Long bookingId,
            LocalDate endDate,
            LocalDate startDate
    );

    List<Booking> findByVehicleId(Long vehicleId);
}
package com.example.carrental.dto;

import com.example.carrental.entity.Booking;

import java.time.LocalDate;

public class BookingResponse {

    private Long id;
    private String customerName;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long vehicleId;

    public BookingResponse(
            Long id,
            String customerName,
            LocalDate startDate,
            LocalDate endDate,
            Long vehicleId
    ) {
        this.id = id;
        this.customerName = customerName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.vehicleId = vehicleId;
    }

    public static BookingResponse from(Booking booking) {
        return new BookingResponse(
                booking.getId(),
                booking.getCustomerName(),
                booking.getStartDate(),
                booking.getEndDate(),
                booking.getVehicle().getId()
        );
    }

    public Long getId() {
        return id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public Long getVehicleId() {
        return vehicleId;
    }
}
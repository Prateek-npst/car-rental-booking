package com.example.carrental.controller;

import com.example.carrental.entity.Vehicle;
import com.example.carrental.service.VehicleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.example.carrental.dto.VehicleRequest;
import jakarta.validation.Valid;
import com.example.carrental.dto.BookingResponse;
import com.example.carrental.entity.Booking;
import com.example.carrental.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    private final VehicleService vehicleService;
    private final BookingService bookingService;

    public VehicleController(
            VehicleService vehicleService,
            BookingService bookingService
    ) {
        this.vehicleService = vehicleService;
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<Vehicle> createVehicle(
            @Valid @RequestBody VehicleRequest request
    ) {
        Vehicle createdVehicle = vehicleService.createVehicle(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdVehicle);
    }

    @GetMapping
    public ResponseEntity<List<Vehicle>> getAllVehicles() {
        return ResponseEntity.ok(vehicleService.getAllVehicles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable Long id) {
        return ResponseEntity.ok(vehicleService.getVehicleById(id));
    }

    @GetMapping("/{vehicleId}/bookings")
    public ResponseEntity<List<BookingResponse>> getBookingsByVehicleId(
            @PathVariable Long vehicleId
    ) {
        List<BookingResponse> responses = bookingService
                .getBookingsByVehicleId(vehicleId)
                .stream()
                .map(BookingResponse::from)
                .toList();

        return ResponseEntity.ok(responses);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vehicle> updateVehicle(
            @PathVariable Long id,
            @Valid @RequestBody VehicleRequest request
    ) {
        return ResponseEntity.ok(vehicleService.updateVehicle(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.noContent().build();
    }
}
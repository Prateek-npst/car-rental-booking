package com.example.carrental.service;

import com.example.carrental.dto.VehicleRequest;
import com.example.carrental.entity.Vehicle;
import com.example.carrental.exception.DuplicateResourceException;
import com.example.carrental.exception.ResourceNotFoundException;
import com.example.carrental.repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public Vehicle createVehicle(VehicleRequest request) {
        if (vehicleRepository.existsByRegNumber(request.getRegNumber())) {
            throw new DuplicateResourceException(
                    "Vehicle with registration number "
                            + request.getRegNumber()
                            + " already exists"
            );
        }

        Vehicle vehicle = new Vehicle(
                request.getRegNumber(),
                request.getModel(),
                request.getDailyRate()
        );

        return vehicleRepository.save(vehicle);
    }

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Vehicle getVehicleById(Long id) {
        return vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found with id: " + id
                        )
                );
    }

    public Vehicle updateVehicle(Long id, VehicleRequest request) {
        Vehicle existingVehicle = getVehicleById(id);

        if (!existingVehicle.getRegNumber().equals(request.getRegNumber())
                && vehicleRepository.existsByRegNumber(request.getRegNumber())) {

            throw new DuplicateResourceException(
                    "Vehicle with registration number "
                            + request.getRegNumber()
                            + " already exists"
            );
        }

        existingVehicle.setRegNumber(request.getRegNumber());
        existingVehicle.setModel(request.getModel());
        existingVehicle.setDailyRate(request.getDailyRate());

        return vehicleRepository.save(existingVehicle);
    }

    public void deleteVehicle(Long id) {
        Vehicle vehicle = getVehicleById(id);
        vehicleRepository.delete(vehicle);
    }
}
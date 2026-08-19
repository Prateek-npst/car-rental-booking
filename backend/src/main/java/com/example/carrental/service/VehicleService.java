package com.example.carrental.service;

import com.example.carrental.entity.Vehicle;
import com.example.carrental.repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public Vehicle createVehicle(Vehicle vehicle) {
        if (vehicleRepository.existsByRegNumber(vehicle.getRegNumber())) {
            throw new IllegalArgumentException(
                    "Vehicle with registration number " + vehicle.getRegNumber() + " already exists"
            );
        }

        return vehicleRepository.save(vehicle);
    }

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Vehicle getVehicleById(Long id) {
        return vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Vehicle not found with id: " + id)
                );
    }

    public Vehicle updateVehicle(Long id, Vehicle updatedVehicle) {
        Vehicle existingVehicle = getVehicleById(id);

        if (!existingVehicle.getRegNumber().equals(updatedVehicle.getRegNumber())
                && vehicleRepository.existsByRegNumber(updatedVehicle.getRegNumber())) {
            throw new IllegalArgumentException(
                    "Vehicle with registration number " + updatedVehicle.getRegNumber() + " already exists"
            );
        }

        existingVehicle.setRegNumber(updatedVehicle.getRegNumber());
        existingVehicle.setModel(updatedVehicle.getModel());
        existingVehicle.setDailyRate(updatedVehicle.getDailyRate());

        return vehicleRepository.save(existingVehicle);
    }

    public void deleteVehicle(Long id) {
        Vehicle vehicle = getVehicleById(id);
        vehicleRepository.delete(vehicle);
    }
}
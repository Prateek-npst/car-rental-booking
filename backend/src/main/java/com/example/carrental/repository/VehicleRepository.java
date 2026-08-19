package com.example.carrental.repository;

import com.example.carrental.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    boolean existsByRegNumber(String regNumber);
}
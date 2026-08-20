package com.example.carrental.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public class VehicleRequest {

    @NotBlank(message = "Registration number is required")
    @Size(max = 12, message = "Registration number cannot exceed 12 characters")
    @Pattern(
            regexp = "^[A-Z0-9]+$",
            message = "Registration number can contain only uppercase letters and numbers"
    )
    private String regNumber;

    @NotBlank(message = "Model is required")
    @Size(max = 20, message = "Model cannot exceed 20 characters")
    private String model;

    @DecimalMin(value = "0.01", message = "Daily rate must be greater than 0")
    @DecimalMax(value = "99999.99", message = "Daily rate cannot exceed 99,999.99")
    private BigDecimal dailyRate;

    public VehicleRequest() {
    }

    public VehicleRequest(
            String regNumber,
            String model,
            BigDecimal dailyRate
    ) {
        this.regNumber = regNumber;
        this.model = model;
        this.dailyRate = dailyRate;
    }

    public String getRegNumber() {
        return regNumber;
    }

    public void setRegNumber(String regNumber) {
        this.regNumber = regNumber;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public BigDecimal getDailyRate() {
        return dailyRate;
    }

    public void setDailyRate(BigDecimal dailyRate) {
        this.dailyRate = dailyRate;
    }
}
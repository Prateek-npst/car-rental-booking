# Car Rental Booking System

A full-stack car rental booking application built with **Spring Boot**, **React**, **JPA/Hibernate**, and **H2**.

The application allows users to manage rental vehicles and customer bookings through a responsive web interface. The backend provides REST APIs with validation, exception handling, booking conflict detection, and pagination.

---

## Features

### Vehicle Management

- Add a rental vehicle
- View all vehicles
- View a vehicle by ID
- Update vehicle details
- Delete a vehicle
- View bookings for a specific vehicle
- Prevent duplicate vehicle registration numbers

### Booking Management

- Create a booking
- View bookings
- View a booking by ID
- Update a booking
- Delete a booking
- Paginated booking list
- Select a vehicle while creating a booking
- Prevent overlapping bookings for the same vehicle

### Validation

#### Vehicle Registration Number

- Maximum 12 characters
- Only uppercase letters (`A-Z`) and numbers (`0-9`)
- Lowercase letters are automatically converted to uppercase in the frontend
- Special characters and spaces are rejected

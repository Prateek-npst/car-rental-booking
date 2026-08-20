# 🚗 Car Rental Booking System

A full-stack car rental management application for managing **vehicles and customer bookings** with validation, conflict detection, pagination, and a responsive React UI.

---

## 🛠️ Tech Stack

### Backend
- **Java 17+**
- **Spring Boot**
- **Spring Web / REST API**
- **Spring Data JPA**
- **Hibernate**
- **H2 Database**
- **Jakarta Bean Validation**
- **Maven**

### Frontend
- **React**
- **Vite**
- **JavaScript**
- **Axios**
- **CSS**

### Tools
- Git / GitHub
- IntelliJ IDEA
- cURL

---

## 📁 Project Structure

```text
car-rental-booking/
├── backend/                 # Spring Boot REST API
│   └── src/main/java/
│       └── com/example/carrental/
│           ├── config/
│           ├── controller/
│           ├── dto/
│           ├── entity/
│           ├── exception/
│           ├── repository/
│           └── service/
│
├── frontend/                # React application
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/
│
└── README.md
```

---

## ✨ Features

### Vehicle Management
- Create, view, update and delete vehicles
- Prevent duplicate registration numbers
- View bookings for a specific vehicle
- Vehicle input validation

### Booking Management
- Create, view, update and delete bookings
- Select vehicle while creating a booking
- Paginated booking list
- Booking date validation
- Automatic booking conflict detection

### UI
- Dashboard
- Vehicle management screen
- Booking management screen
- Responsive design
- Loading, success and error states
- User-friendly validation messages

---

## 🔐 Validation & Edge Cases

### Vehicle Registration Number

- Maximum **12 characters**
- Only `A-Z` and `0-9`
- Lowercase letters are automatically converted to uppercase
- Spaces and special characters are rejected
- Duplicate registration numbers are rejected

Examples:

```text
MH12AB1234     ✅
mh12ab1234     → MH12AB1234
MH12-AB1234    ❌
MH 12 AB1234   ❌
```

### Vehicle Model

- Required
- Maximum **20 characters**

### Daily Rate

- Must be greater than `0`
- Maximum **₹99,999.99**
- Maximum **2 decimal places**
- Values above the limit cannot be entered through the UI

```text
2500       ✅
2500.50    ✅
99999.99   ✅
100000     ❌
2500.555   ❌
```

### Customer Name

- Required
- Maximum **20 characters**

### Booking Dates

- Start date cannot be before today
- End date cannot be before today
- Dates cannot be after **31 December 2050**
- Start date must be before end date

```text
Start = End     ❌
Start > End     ❌
Start < End     ✅
```

### Booking Conflicts

Two bookings for the same vehicle cannot overlap.

```text
Booking 1: 01 Sep → 05 Sep
Booking 2: 03 Sep → 07 Sep
             ❌ Conflict
```

Adjacent bookings are allowed:

```text
Booking 1: 01 Sep → 05 Sep
Booking 2: 05 Sep → 10 Sep
             ✅ Allowed
```

Conflict responses return:

```text
HTTP 409 Conflict
```

---

## 🏗️ Architecture

```text
React Frontend
      │
      │ Axios / REST
      ▼
Spring Boot Controllers
      │
      ▼
Service Layer
      │
      ▼
Repository Layer
      │
      ▼
JPA / Hibernate
      │
      ▼
H2 Database
```

The **backend is the source of truth for business rules**.  
Frontend validation provides immediate user feedback, while backend validation prevents API-level bypasses.

---

## 🔌 Main API Endpoints

### Vehicles

```text
POST   /api/vehicles
GET    /api/vehicles
GET    /api/vehicles/{id}
PUT    /api/vehicles/{id}
DELETE /api/vehicles/{id}

GET    /api/vehicles/{vehicleId}/bookings
```

### Bookings

```text
POST   /api/bookings
GET    /api/bookings
GET    /api/bookings/{id}
PUT    /api/bookings/{id}
DELETE /api/bookings/{id}
```

### Pagination

```text
GET /api/bookings?page=0&size=10
```

---

## 📊 HTTP Status Codes

| Code | Meaning |
|------|---------|
| `200` | Successful request |
| `201` | Resource created |
| `204` | Resource deleted |
| `400` | Invalid request / validation failure |
| `404` | Resource not found |
| `409` | Duplicate or booking conflict |

---

## 🚀 Running the Project

### 1. Start Backend

```bash
cd backend
./mvnw spring-boot:run
```

Backend:

```text
http://localhost:8080
```

Run backend tests:

```bash
./mvnw test
```

---

### 2. Start Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🗄️ Database

Development database:

```text
H2 (in-memory)
```

JDBC URL:

```text
jdbc:h2:mem:car_rental_db
```

H2 Console:

```text
http://localhost:8080/h2-console
```

> Because H2 is configured as an in-memory database, data is reset when the backend restarts.

---

## 🧪 Testing

Backend:

```bash
cd backend
./mvnw test
```

Frontend production build:

```bash
cd frontend
npm run build
```

API testing can also be performed using `curl`.

Example:

```bash
curl -i http://localhost:8080/api/vehicles
```

---

## 🔒 CORS

The backend allows requests from the React development server:

```text
http://localhost:5173
```

CORS configuration:

```text
backend/src/main/java/com/example/carrental/config/CorsConfig.java
```

---

## 📝 Error Handling

The backend uses a centralized exception handler for:

- Validation errors
- Resource not found
- Duplicate vehicles
- Booking conflicts
- Invalid booking dates
- Invalid pagination parameters

Example:

```json
{
  "status": 409,
  "message": "Vehicle is already booked for the requested date range"
}
```

---

## 🔮 Possible Future Improvements

- User authentication and authorization
- PostgreSQL/MySQL
- Payment integration
- Booking cancellation
- Rental history
- Admin/user roles
- Automated frontend tests
- Docker deployment
- Cloud deployment

---

## 👨‍💻 Author

**Prateek Singh**

Full-Stack Car Rental Booking System

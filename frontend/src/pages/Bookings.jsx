import { useEffect, useState } from "react";
import BookingForm from "../components/BookingForm";
import Pagination from "../components/Pagination";
import { bookingApi, vehicleApi } from "../services/api";

function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    const [page, setPage] = useState(0);
    const [pageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const [loading, setLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingBooking, setEditingBooking] = useState(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const loadBookings = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await bookingApi.getAll(
                page,
                pageSize
            );

            setBookings(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalElements(response.data.totalElements);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const loadVehicles = async () => {
        try {
            const response = await vehicleApi.getAll();

            setVehicles(response.data);
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    useEffect(() => {
        loadBookings();
    }, [page]);

    useEffect(() => {
        loadVehicles();
    }, []);

    const handleAdd = () => {
        setEditingBooking(null);
        setShowForm(true);
        setError("");
        setSuccess("");
    };

    const handleEdit = (booking) => {
        setEditingBooking(booking);
        setShowForm(true);
        setError("");
        setSuccess("");
    };

    const handleSubmit = async (bookingData) => {
        try {
            setFormLoading(true);
            setError("");
            setSuccess("");

            if (editingBooking) {
                await bookingApi.update(
                    editingBooking.id,
                    bookingData
                );

                setSuccess(
                    "Booking updated successfully."
                );
            } else {
                await bookingApi.create(bookingData);

                setSuccess(
                    "Booking created successfully."
                );
            }

            setShowForm(false);
            setEditingBooking(null);

            // Return to first page so the newly created
            // booking is easy to find.
            if (!editingBooking) {
                setPage(0);
            } else {
                await loadBookings();
            }
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setFormLoading(false);
        }
    };

    const handleDelete = async (booking) => {
        const confirmed = window.confirm(
            `Delete booking for ${booking.customerName}?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setSuccess("");

            await bookingApi.remove(booking.id);

            setSuccess(
                "Booking deleted successfully."
            );

            // If the current page becomes empty after deletion,
            // move back one page when possible.
            if (bookings.length === 1 && page > 0) {
                setPage((current) => current - 1);
            } else {
                await loadBookings();
            }
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    const getVehicleName = (vehicleId) => {
        const vehicle = vehicles.find(
            (item) => item.id === vehicleId
        );

        if (!vehicle) {
            return `Vehicle #${vehicleId}`;
        }

        return `${vehicle.regNumber} — ${vehicle.model}`;
    };

    return (
        <section className="page-section">
            <div className="page-header">
                <div>
                    <p className="eyebrow dark">
                        RENTAL MANAGEMENT
                    </p>

                    <h1>Bookings</h1>

                    <p>
                        Manage customer reservations and rental dates.
                    </p>
                </div>

                {!showForm && (
                    <button
                        className="primary-button dark-button"
                        onClick={handleAdd}
                        disabled={vehicles.length === 0}
                    >
                        + Add Booking
                    </button>
                )}
            </div>

            {vehicles.length === 0 && !loading && (
                <div className="alert error-alert">
                    Add at least one vehicle before creating a booking.
                </div>
            )}

            {error && (
                <div className="alert error-alert">
                    {error}
                </div>
            )}

            {success && (
                <div className="alert success-alert">
                    {success}
                </div>
            )}

            {showForm && (
                <BookingForm
                    booking={editingBooking}
                    vehicles={vehicles}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingBooking(null);
                    }}
                    loading={formLoading}
                />
            )}

            <div className="table-card">
                {loading ? (
                    <div className="empty-state">
                        Loading bookings...
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📅</div>

                        <h2>No bookings yet</h2>

                        <p>
                            Create a booking to see it here.
                        </p>

                        {vehicles.length > 0 && (
                            <button
                                className="primary-button dark-button"
                                onClick={handleAdd}
                            >
                                + Create Booking
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Vehicle</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>

                                <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking.id}>
                                        <td>
                                            <strong>
                                                {booking.customerName}
                                            </strong>
                                        </td>

                                        <td>
                                            {getVehicleName(
                                                booking.vehicleId
                                            )}
                                        </td>

                                        <td>
                                            {booking.startDate}
                                        </td>

                                        <td>
                                            {booking.endDate}
                                        </td>

                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    className="table-button"
                                                    onClick={() =>
                                                        handleEdit(booking)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="table-button danger-button"
                                                    onClick={() =>
                                                        handleDelete(booking)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        <Pagination
                            page={page}
                            totalPages={totalPages}
                            totalElements={totalElements}
                            onPageChange={setPage}
                        />
                    </>
                )}
            </div>
        </section>
    );
}

function getErrorMessage(error) {
    if (error.response?.status === 409) {
        return (
            error.response.data?.message ||
            "Vehicle is already booked for the selected dates."
        );
    }

    if (error.response?.data?.errors) {
        return Object.values(
            error.response.data.errors
        ).join(", ");
    }

    if (error.response?.data?.message) {
        return error.response.data.message;
    }

    if (error.message === "Network Error") {
        return (
            "Unable to connect to the backend. " +
            "Make sure Spring Boot is running on port 8080."
        );
    }

    return "Something went wrong. Please try again.";
}

export default Bookings;
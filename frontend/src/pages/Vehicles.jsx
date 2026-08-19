import { useEffect, useState } from "react";
import VehicleForm from "../components/VehicleForm";
import { vehicleApi } from "../services/api";

function Vehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [bookings, setBookings] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [bookingsLoading, setBookingsLoading] = useState(false);

    const loadVehicles = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await vehicleApi.getAll();

            setVehicles(response.data);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadVehicles();
    }, []);

    const handleAdd = () => {
        setEditingVehicle(null);
        setShowForm(true);
        setError("");
        setSuccess("");
    };

    const handleEdit = (vehicle) => {
        setEditingVehicle(vehicle);
        setShowForm(true);
        setError("");
        setSuccess("");
    };

    const handleSubmit = async (vehicleData) => {
        try {
            setFormLoading(true);
            setError("");
            setSuccess("");

            if (editingVehicle) {
                await vehicleApi.update(editingVehicle.id, vehicleData);
                setSuccess("Vehicle updated successfully.");
            } else {
                await vehicleApi.create(vehicleData);
                setSuccess("Vehicle added successfully.");
            }

            setShowForm(false);
            setEditingVehicle(null);

            await loadVehicles();
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setFormLoading(false);
        }
    };

    const handleDelete = async (vehicle) => {
        const confirmed = window.confirm(
            `Delete ${vehicle.model} (${vehicle.regNumber})?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setSuccess("");

            await vehicleApi.remove(vehicle.id);

            setSuccess("Vehicle deleted successfully.");

            await loadVehicles();
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    const handleViewBookings = async (vehicle) => {
        try {
            setBookingsLoading(true);
            setError("");
            setSuccess("");

            const response = await vehicleApi.getBookings(vehicle.id);

            setSelectedVehicle(vehicle);
            setBookings(response.data);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setBookingsLoading(false);
        }
    };

    const closeBookings = () => {
        setSelectedVehicle(null);
        setBookings([]);
    };

    return (
        <section className="page-section">
            <div className="page-header">
                <div>
                    <p className="eyebrow dark">FLEET MANAGEMENT</p>
                    <h1>Vehicles</h1>
                    <p>
                        Manage the vehicles available for rental.
                    </p>
                </div>

                {!showForm && (
                    <button
                        className="primary-button dark-button"
                        onClick={handleAdd}
                    >
                        + Add Vehicle
                    </button>
                )}
            </div>

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
                <VehicleForm
                    vehicle={editingVehicle}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingVehicle(null);
                    }}
                    loading={formLoading}
                />
            )}

            {selectedVehicle && (
                <div className="booking-panel">
                    <div className="booking-panel-header">
                        <div>
                            <p className="eyebrow dark">VEHICLE BOOKINGS</p>
                            <h2>
                                {selectedVehicle.model}
                            </h2>
                            <p>
                                {selectedVehicle.regNumber}
                            </p>
                        </div>

                        <button
                            className="close-button"
                            onClick={closeBookings}
                        >
                            ×
                        </button>
                    </div>

                    {bookingsLoading ? (
                        <div className="empty-state">
                            Loading bookings...
                        </div>
                    ) : bookings.length === 0 ? (
                        <div className="empty-state">
                            No bookings found for this vehicle.
                        </div>
                    ) : (
                        <div className="mini-table-wrapper">
                            <table>
                                <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                </tr>
                                </thead>

                                <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking.id}>
                                        <td>{booking.customerName}</td>
                                        <td>{booking.startDate}</td>
                                        <td>{booking.endDate}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            <div className="table-card">
                {loading ? (
                    <div className="empty-state">
                        Loading vehicles...
                    </div>
                ) : vehicles.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">🚗</div>
                        <h2>No vehicles yet</h2>
                        <p>Add your first rental vehicle to get started.</p>

                        <button
                            className="primary-button dark-button"
                            onClick={handleAdd}
                        >
                            + Add Vehicle
                        </button>
                    </div>
                ) : (
                    <div className="table-wrapper">
                        <table>
                            <thead>
                            <tr>
                                <th>Registration</th>
                                <th>Model</th>
                                <th>Daily Rate</th>
                                <th>Actions</th>
                            </tr>
                            </thead>

                            <tbody>
                            {vehicles.map((vehicle) => (
                                <tr key={vehicle.id}>
                                    <td>
                                        <strong>{vehicle.regNumber}</strong>
                                    </td>

                                    <td>{vehicle.model}</td>

                                    <td>
                                        ₹{Number(vehicle.dailyRate).toFixed(2)}
                                    </td>

                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="table-button"
                                                onClick={() => handleViewBookings(vehicle)}
                                            >
                                                Bookings
                                            </button>

                                            <button
                                                className="table-button"
                                                onClick={() => handleEdit(vehicle)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="table-button danger-button"
                                                onClick={() => handleDelete(vehicle)}
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
                )}
            </div>
        </section>
    );
}

function getErrorMessage(error) {
    if (error.response?.data?.message) {
        return error.response.data.message;
    }

    if (error.response?.data?.errors) {
        return Object.values(error.response.data.errors).join(", ");
    }

    if (error.message === "Network Error") {
        return "Unable to connect to the backend. Make sure Spring Boot is running on port 8080.";
    }

    return "Something went wrong. Please try again.";
}

export default Vehicles;
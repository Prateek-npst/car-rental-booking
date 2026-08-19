import { useEffect, useState } from "react";
import { bookingApi, vehicleApi } from "../services/api";

function Dashboard({ onNavigate }) {
    const [vehicleCount, setVehicleCount] = useState(0);
    const [bookingCount, setBookingCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const [vehiclesResponse, bookingsResponse] =
                    await Promise.all([
                        vehicleApi.getAll(),
                        bookingApi.getAll(0, 1),
                    ]);

                setVehicleCount(vehiclesResponse.data.length);
                setBookingCount(
                    bookingsResponse.data.totalElements
                );
            } catch (error) {
                console.error("Failed to load dashboard statistics", error);
            } finally {
                setLoading(false);
            }
        };

        loadStats();
    }, []);

    return (
        <section className="dashboard">
            <div className="hero-card">
                <div>
                    <p className="eyebrow">
                        CAR RENTAL BOOKING
                    </p>

                    <h1>
                        Manage your rentals with ease.
                    </h1>

                    <p className="hero-description">
                        Manage vehicles and bookings from one simple
                        dashboard.
                    </p>

                    <div className="hero-actions">
                        <button
                            className="primary-button"
                            onClick={() => onNavigate("vehicles")}
                        >
                            Manage Vehicles
                        </button>

                        <button
                            className="secondary-button"
                            onClick={() => onNavigate("bookings")}
                        >
                            View Bookings
                        </button>
                    </div>
                </div>

                <div className="hero-icon">
                    🚘
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="info-card">
                    <span className="info-icon">🚗</span>

                    <h2>Vehicles</h2>

                    <div className="stat-number">
                        {loading ? "..." : vehicleCount}
                    </div>

                    <p>
                        Vehicles currently available in the fleet.
                    </p>

                    <button
                        onClick={() => onNavigate("vehicles")}
                    >
                        Manage Vehicles →
                    </button>
                </div>

                <div className="info-card">
                    <span className="info-icon">📅</span>

                    <h2>Bookings</h2>

                    <div className="stat-number">
                        {loading ? "..." : bookingCount}
                    </div>

                    <p>
                        Total customer bookings recorded.
                    </p>

                    <button
                        onClick={() => onNavigate("bookings")}
                    >
                        Manage Bookings →
                    </button>
                </div>

                <div className="info-card">
                    <span className="info-icon">🛡️</span>

                    <h2>Smart Booking</h2>

                    <div className="stat-label">
                        Conflict Protection
                    </div>

                    <p>
                        Overlapping bookings for the same vehicle
                        are automatically rejected.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Dashboard;
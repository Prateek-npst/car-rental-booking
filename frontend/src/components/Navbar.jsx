function Navbar({ activePage, onNavigate }) {
    return (
        <header className="navbar">
            <div className="navbar-inner">
                <button
                    className="brand"
                    onClick={() => onNavigate("dashboard")}
                >
                    🚗 Car Rental
                </button>

                <nav className="nav-links">
                    <button
                        className={activePage === "dashboard" ? "active" : ""}
                        onClick={() => onNavigate("dashboard")}
                    >
                        Dashboard
                    </button>

                    <button
                        className={activePage === "vehicles" ? "active" : ""}
                        onClick={() => onNavigate("vehicles")}
                    >
                        Vehicles
                    </button>

                    <button
                        className={activePage === "bookings" ? "active" : ""}
                        onClick={() => onNavigate("bookings")}
                    >
                        Bookings
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
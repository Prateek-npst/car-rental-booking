import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Bookings from "./pages/Bookings";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "vehicles":
        return <Vehicles />;

      case "bookings":
        return <Bookings />;

      default:
        return <Dashboard onNavigate={setActivePage} />;
    }
  };

  return (
      <div className="app">
        <Navbar
            activePage={activePage}
            onNavigate={setActivePage}
        />

        <main className="main-content">
          {renderPage()}
        </main>
      </div>
  );
}

export default App;
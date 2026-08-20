import { useEffect, useState } from "react";
const TODAY = new Date().toISOString().split("T")[0];
const MAX_BOOKING_DATE = "2050-12-31";

const emptyForm = {
    customerName: "",
    startDate: "",
    endDate: "",
    vehicleId: "",
};

function BookingForm({
                         booking,
                         vehicles,
                         onSubmit,
                         onCancel,
                         loading,
                     }) {
    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (booking) {
            setForm({
                customerName: booking.customerName || "",
                startDate: booking.startDate || "",
                endDate: booking.endDate || "",
                vehicleId: booking.vehicleId?.toString() || "",
            });
        } else {
            setForm(emptyForm);
        }

        setErrors({});
    }, [booking]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));

        setErrors((current) => ({
            ...current,
            [name]: "",
        }));
    };

    const validate = () => {
        const nextErrors = {};

        if (!form.customerName.trim()) {
            nextErrors.customerName = "Customer name is required";
        }

        if (form.customerName.length > 20) {
            nextErrors.customerName =
                "Customer name cannot exceed 20 characters";
        }

        if (!form.startDate) {
            nextErrors.startDate = "Start date is required";
        }

        if (!form.endDate) {
            nextErrors.endDate = "End date is required";
        }

        if (!form.vehicleId) {
            nextErrors.vehicleId = "Vehicle is required";
        }

        if (
            form.startDate &&
            form.endDate &&
            form.startDate >= form.endDate
        ) {
            nextErrors.endDate = "End date must be after start date";
        }

        setErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        onSubmit({
            customerName: form.customerName.trim(),
            startDate: form.startDate,
            endDate: form.endDate,
            vehicleId: Number(form.vehicleId),
        });
    };

    return (
        <form className="form-card" onSubmit={handleSubmit}>
            <div className="form-header">
                <div>
                    <p className="eyebrow dark">BOOKING</p>

                    <h2>
                        {booking ? "Edit Booking" : "Create Booking"}
                    </h2>
                </div>

                <button
                    type="button"
                    className="close-button"
                    onClick={onCancel}
                    disabled={loading}
                >
                    ×
                </button>
            </div>

            <div className="form-grid booking-form-grid">
                <div className="field">
                    <label htmlFor="customerName">
                        Customer Name
                    </label>

                    <input
                        id="customerName"
                        name="customerName"
                        value={form.customerName}
                        onChange={handleChange}
                        maxLength={20}
                        placeholder="e.g. Rahul Sharma"
                    />

                    {errors.customerName && (
                        <span className="field-error">
              {errors.customerName}
            </span>
                    )}
                </div>

                <div className="field">
                    <label htmlFor="vehicleId">
                        Vehicle
                    </label>

                    <select
                        id="vehicleId"
                        name="vehicleId"
                        value={form.vehicleId}
                        onChange={handleChange}
                    >
                        <option value="">
                            Select a vehicle
                        </option>

                        {vehicles.map((vehicle) => (
                            <option
                                key={vehicle.id}
                                value={vehicle.id}
                            >
                                {vehicle.regNumber} — {vehicle.model}
                            </option>
                        ))}
                    </select>

                    {errors.vehicleId && (
                        <span className="field-error">
              {errors.vehicleId}
            </span>
                    )}
                </div>

                <div className="field">
                    <label htmlFor="startDate">
                        Start Date
                    </label>

                    <input
                        id="startDate"
                        name="startDate"
                        type="date"
                        min={TODAY}
                        max={MAX_BOOKING_DATE}
                        value={form.startDate}
                        onChange={handleChange}
                    />

                    {errors.startDate && (
                        <span className="field-error">
              {errors.startDate}
            </span>
                    )}
                </div>

                <div className="field">
                    <label htmlFor="endDate">
                        End Date
                    </label>

                    <input
                        id="endDate"
                        name="endDate"
                        type="date"
                        min={form.startDate || TODAY}
                        max={MAX_BOOKING_DATE}
                        value={form.endDate}
                        onChange={handleChange}
                    />

                    {errors.endDate && (
                        <span className="field-error">
              {errors.endDate}
            </span>
                    )}
                </div>
            </div>

            <div className="form-actions">
                <button
                    type="button"
                    className="secondary-button light-button"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="primary-button dark-button"
                    disabled={loading}
                >
                    {loading
                        ? "Saving..."
                        : booking
                            ? "Update Booking"
                            : "Create Booking"}
                </button>
            </div>
        </form>
    );
}

export default BookingForm;
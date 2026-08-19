import { useEffect, useState } from "react";

const emptyForm = {
    regNumber: "",
    model: "",
    dailyRate: "",
};

function VehicleForm({ vehicle, onSubmit, onCancel, loading }) {
    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (vehicle) {
            setForm({
                regNumber: vehicle.regNumber || "",
                model: vehicle.model || "",
                dailyRate: vehicle.dailyRate ?? "",
            });
        } else {
            setForm(emptyForm);
        }

        setErrors({});
    }, [vehicle]);

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

        if (!form.regNumber.trim()) {
            nextErrors.regNumber = "Registration number is required";
        }

        if (!form.model.trim()) {
            nextErrors.model = "Model is required";
        }

        if (!form.dailyRate || Number(form.dailyRate) <= 0) {
            nextErrors.dailyRate = "Daily rate must be greater than 0";
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
            regNumber: form.regNumber.trim(),
            model: form.model.trim(),
            dailyRate: Number(form.dailyRate),
        });
    };

    return (
        <form className="form-card" onSubmit={handleSubmit}>
            <div className="form-header">
                <div>
                    <p className="eyebrow dark">VEHICLE</p>
                    <h2>{vehicle ? "Edit Vehicle" : "Add Vehicle"}</h2>
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

            <div className="form-grid">
                <div className="field">
                    <label htmlFor="regNumber">Registration Number</label>

                    <input
                        id="regNumber"
                        name="regNumber"
                        value={form.regNumber}
                        onChange={handleChange}
                        placeholder="e.g. MH12AB1234"
                    />

                    {errors.regNumber && (
                        <span className="field-error">{errors.regNumber}</span>
                    )}
                </div>

                <div className="field">
                    <label htmlFor="model">Model</label>

                    <input
                        id="model"
                        name="model"
                        value={form.model}
                        onChange={handleChange}
                        placeholder="e.g. Honda City"
                    />

                    {errors.model && (
                        <span className="field-error">{errors.model}</span>
                    )}
                </div>

                <div className="field">
                    <label htmlFor="dailyRate">Daily Rate</label>

                    <input
                        id="dailyRate"
                        name="dailyRate"
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={form.dailyRate}
                        onChange={handleChange}
                        placeholder="e.g. 2500"
                    />

                    {errors.dailyRate && (
                        <span className="field-error">{errors.dailyRate}</span>
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
                        : vehicle
                            ? "Update Vehicle"
                            : "Add Vehicle"}
                </button>
            </div>
        </form>
    );
}

export default VehicleForm;
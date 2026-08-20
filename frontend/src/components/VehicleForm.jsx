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

        if (name === "regNumber") {
            const formattedValue = value
                .toUpperCase()
                .replace(/[^A-Z0-9]/g, "")
                .slice(0, 12);

            setForm((current) => ({
                ...current,
                regNumber: formattedValue,
            }));
        } else if (name === "dailyRate") {
            if (value === "") {
                setForm((current) => ({
                    ...current,
                    dailyRate: "",
                }));

                return;
            }

            if (!/^\d*\.?\d*$/.test(value)) {
                return;
            }

            const decimalPart = value.split(".")[1];

            if (decimalPart && decimalPart.length > 2) {
                return;
            }

            const numericValue = Number(value);

            if (numericValue > 99999.99) {
                return;
            }

            setForm((current) => ({
                ...current,
                dailyRate: value,
            }));
        } else {
            setForm((current) => ({
                ...current,
                [name]: value,
            }));
        }

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

        if (
            form.regNumber &&
            !/^[A-Z0-9]{1,12}$/.test(form.regNumber)
        ) {
            nextErrors.regNumber =
                "Registration number must contain only letters and numbers and be at most 12 characters";
        }

        if (!form.model.trim()) {
            nextErrors.model = "Model is required";
        }

        if (form.model.length > 20) {
            nextErrors.model =
                "Model cannot exceed 20 characters";
        }

        if (!form.dailyRate || Number(form.dailyRate) <= 0) {
            nextErrors.dailyRate = "Daily rate must be greater than 0";
        }

        if (
            form.dailyRate &&
            Number(form.dailyRate) > 99999.99
        ) {
            nextErrors.dailyRate =
                "Daily rate cannot exceed 99,999.99";
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
                        maxLength={12}
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
                        maxLength={20}
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
                        type="text"
                        inputMode="decimal"
                        value={form.dailyRate}
                        onChange={handleChange}
                        placeholder="e.g. 2500.00"
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
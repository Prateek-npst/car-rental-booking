import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export const vehicleApi = {
    getAll: () => api.get("/vehicles"),

    getById: (id) => api.get(`/vehicles/${id}`),

    create: (vehicle) => api.post("/vehicles", vehicle),

    update: (id, vehicle) => api.put(`/vehicles/${id}`, vehicle),

    remove: (id) => api.delete(`/vehicles/${id}`),

    getBookings: (vehicleId) =>
        api.get(`/vehicles/${vehicleId}/bookings`),
};

export const bookingApi = {
    getAll: (page = 0, size = 10) =>
        api.get("/bookings", {
            params: { page, size },
        }),

    getById: (id) => api.get(`/bookings/${id}`),

    create: (booking) => api.post("/bookings", booking),

    update: (id, booking) => api.put(`/bookings/${id}`, booking),

    remove: (id) => api.delete(`/bookings/${id}`),
};

export default api;
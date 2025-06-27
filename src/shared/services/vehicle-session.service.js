export const VehicleSessionService = {
    setVehicleId(id) {
        sessionStorage.setItem("vehicleId", id);
    },
    getVehicleId() {
        return sessionStorage.getItem("vehicleId");
    },
    clearSession() {
        sessionStorage.removeItem("vehicleId");
    }
};
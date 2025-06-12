export class VehicleLife {
    constructor({
        owner = "",
        vehicleHealth = 0,
        monthlyMileage = [],
        lifeEstimate = [],
                }) {
        this.owner = owner;
        this.vehicleHealth = vehicleHealth;
        this.monthlyMileage = monthlyMileage;
        this.lifeEstimate = lifeEstimate;
    }
}
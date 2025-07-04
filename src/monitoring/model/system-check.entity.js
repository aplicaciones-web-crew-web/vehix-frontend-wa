export class systemCheck {
    constructor({
                    id = 0,
                    vehicleId = 0,
                    engine = 0,
                    transmission = 0,
                    brake = 0,
                    electrical = 0,
                    steering = 0,
                    suspension = 0,
                    fuel = 0,
                    refrigeration = 0,
                } = {}) {
        this.id = id;
        this.vehicleId = vehicleId;
        this.engine = engine;
        this.transmission = transmission;
        this.brake = brake;
        this.electrical = electrical;
        this.steering = steering;
        this.suspension = suspension;
        this.fuel = fuel;
        this.refrigeration = refrigeration;
    }
}
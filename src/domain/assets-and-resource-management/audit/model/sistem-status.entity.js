export class SystemStatusCheck {
    constructor({
                    id = 0,
                    engine = 0,
                    transmission = 0,
                    brakes = 0,
                    electrical = 0,
                    steering = 0,
                    suspension = 0,
                    fuel = 0,
                    refrigeration = 0,
                    vehiclesID = 0
                } = {}) {
        this.id = id;
        this.engine = engine;
        this.transmission = transmission;
        this.brakes = brakes;
        this.electrical = electrical;
        this.steering = steering;
        this.suspension = suspension;
        this.fuel = fuel;
        this.refrigeration = refrigeration;
        this.vehiclesID = vehiclesID;
    }
}

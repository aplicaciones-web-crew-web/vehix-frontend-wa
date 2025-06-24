export class VehicleFailure {
    constructor({
                    id = 0,
                    vehicleId = 0,
                    failureId = 0,
                    date = '',
                    status = '',
                } = {}) {
        this.id = id;
        this.vehicleId = vehicleId;
        this.failureId = failureId;
        this.date = date;
        this.status = status;
    }
}
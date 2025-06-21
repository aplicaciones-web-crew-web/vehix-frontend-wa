export class Vehicle {
    constructor({
                    id = 0,
                    userId = 0,
                    description = '',
                    name = '',
                    brand = '',
                    model = '',
                    mileage = '',
                    year = '',
                    image = ''
                } = {}) {
        this.id = id;
        this.userId = userId;
        this.description = description;
        this.name = name;
        this.brand = brand;
        this.model = model;
        this.mileage = mileage;
        this.year = year;
        this.image = image;
    }
}

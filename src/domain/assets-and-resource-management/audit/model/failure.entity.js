export class Failure {
    constructor({
                    id = 0,
                    title = '',
                    description = '',
                    solutions = '',
                    isSolved = false,
                    vehicleId = 0
                } = {}) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.solutions = solutions;
        this.isSolved = isSolved;
        this.vehicleId = vehicleId;
    }
}

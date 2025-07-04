export class Report {
    constructor({
                    id = 0,
                    vehicleId = 0,
                    title = '',
                    description = '',
                    suggestedSolution = '',
                    comment = ''
                } = {}) {
        this.id = id;
        this.vehicleId = vehicleId;
        this.title = title;
        this.description = description;
        this.suggestedSolution = suggestedSolution;
        this.comment = comment;
    }
}
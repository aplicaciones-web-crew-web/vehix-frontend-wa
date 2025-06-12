/**
 * @class Failure
 * @description Represents a failure car
 * with the details of the failure.
 */
export class Failure {
    /**
     * Creates a new Failure instance.
     * @param {number} id - The unique identifier for the failure.
     * @param {string} simpleName - The simple name of the failure.
     * @param {string} technicalCode - The technical code associated with the failure (OBD2).
     * @param {string} description - A brief description of the failure.
     * @param {string} severityLevel - The severity level of the failure (e.g., 'Minor', 'Moderate', 'Critical').
     * @param {string} image - An image representing the failure.
     * @param {number} badPracticeId - The ID of the bad practice associated with the failure.
     * @param {number} suggestSolutionId - The ID of the suggested solution for the failure.
     * @param {number} carId - The ID of the car associated with the failure.
     */
    constructor({
                    id= 0,
                    simpleName= '',
                    technicalCode= '',
                    description= '',
                    severityLevel= '',
                    image= '',
                    badPracticeId= 0,
                    suggestSolutionId=0,
                    carId= 0
                }) {
        this.id = id;
        this.simpleName = simpleName;
        this.technicalCode = technicalCode;
        this.description = description;
        this.severityLevel = severityLevel;
        this.image = image;
        this.badPracticeId = badPracticeId;
        this.suggestSolutionId = suggestSolutionId;
        this.carId = carId;
    }

}
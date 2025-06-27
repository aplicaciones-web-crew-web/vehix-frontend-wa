import {VehicleFailure} from "../model/vehicle-failure.entity.js";

export class VehicleFailureAssembler {
    static toEntityFromResource(resource) {
        return new VehicleFailure(resource);
    }

    /**
     * Converts a response containing Bad Practice resources to an array of Bad Practice entities.
     * This method is used to transform the raw data from the API into an array of Bad Practice entities.
     * @param response
     * @returns {BadPractice[]} Array of Bad Practices entities
     */
    static toEntitiesFromResponse(response) {
        if (!response || !response.data || !Array.isArray(response.data)) {
            console.error('Invalid resource: ', response);
            return [];
        }
        return response.data.map(vehicleFailureResource => this.toEntityFromResource(vehicleFailureResource));
    }
}
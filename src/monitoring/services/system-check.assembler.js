import {systemCheck} from "../model/system-check.entity.js";

export class SystemCheckAssembler {
    static toEntityFromResource(resource) {
        return new systemCheck(resource);
    }

    /**
     * Converts a response containing system check resources to an array of Bad Practice entities.
     * This method is used to transform the raw data from the API into an array of system checks entities.
     * @param response
     * @returns {systemCheck[]} Array of System Check entities
     */
    static toEntitiesFromResponse(response) {
        if (!response || !response.data || !Array.isArray(response.data)) {
            console.error('Invalid resource: ', response);
            return [];
        }
        return response.data.map(vehicleFailureResource => this.toEntityFromResource(vehicleFailureResource));
    }
}
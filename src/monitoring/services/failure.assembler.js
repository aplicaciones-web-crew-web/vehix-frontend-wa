import {Failure} from "../model/failure.entity.js";

export class FailureAssembler {
    static toEntityFromResource(resource) {
        return new Failure(resource);
    }


    /**
     * Converts a response containing Failure resources to an array of Failure entities.
     * This method is used to transform the raw data from the API into an array of Failure entities.
     * @param response
     * @return {Failure[]} Array of Failure entities
     * @author u202318274 Julca Minaya Sergio Gino
     */
    static toEntitiesFromResponse(response) {
        if (!response || !response.data || !Array.isArray(response.data)) {
            console.error('Invalid resource: ', response);
            return [];
        }
        return response.data.map(failureResource => this.toEntityFromResource(failureResource));
    }
}
import {OdbError} from "../model/odb-error.entity.js";

export class OdbErrorAssembler {
    static toEntityFromResource(resource) {
        return new OdbError(resource);
    }

    /**
     * Converts a response containing ODB Error resources to an array of ODB Error entities.
     * This method is used to transform the raw data from the API into an array of ODB Error entities.
     * @param response
     * @return {OdbError[]} Array of ODB Error entities
     * @author u202318274 Julca Minaya Sergio Gino
     */
    static toEntitiesFromResponse(response) {
        if (!response || !response.data || !Array.isArray(response.data)) {
            console.error('Invalid resource: ', response);
            return [];
        }
        return response.data.map(odbErrorResource => this.toEntityFromResource(odbErrorResource));
    }
}
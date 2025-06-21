import {Vehicle} from "../model/vehicle.entity.js";

/**
 * @description VehicleAssembler class to convert vehicle resources to entity objects.
 * This class provides methods to convert a single vehicle resource
 * to an entity and to convert a response containing multiple vehicle resources
 * to an array of entity objects.
 * @class VehicleAssembler
 * @author u202318274 Julca Minaya Sergio Gino
 */
export class VehicleAssembler {


    /**
     * @description Converts a vehicle resource to a Vehicle entity.
     * @param {Object} resource - The vehicle resource object.
     * @return {Vehicle}
     * @author u202318274 Julca Minaya Sergio Gino
     */
    static toEntityFromResource(resource) {
        return new Vehicle(resource);
    }

    /**
     * @description Converts a response containing vehicle resources to an array of Vehicle entities.
     * @param response
     * @return {Vehicle[]}
     * @author u202318274 Julca Minaya Sergio Gino
     */
    static toEntitiesFromResponse(response) {
        if (!response || !response.data || !Array.isArray(response.data)) {
            console.error('Invalid resource: ', response);
            return [];
        }
        return response.data.map(vehicleResource => this.toEntityFromResource(vehicleResource));
    }
}
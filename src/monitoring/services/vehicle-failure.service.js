import httpInstance from "../../shared/services/http.instance.js";

export class VehicleFailureService {
    resourceEndPoint = import.meta.env.VITE_VEHICLES_FAILURES_ENDPOINT_PATH;


    /**
     * @summary Fetches all vehicle failure resources
     * @description This method retrieves all failures of a vehicle resources from the API endpoint defined in resourceEndPoint.
     * @author u202318274 Julca Minaya Sergio Gino
     * @return {Promise<axios.AxiosResponse<any>>}
     */
    getAll() {
        return httpInstance.get(this.resourceEndPoint);
    }


    /**
     * @summary Creates a new vehicle failure resource
     * @description This method sends a POST request to the API endpoint to create a new vehicle failure resource with the provided data.
     * @param resource
     * @return {Promise<axios.AxiosResponse<any>>}
     */
    create(resource) {
        return httpInstance.post(this.resourceEndPoint, resource);
    }

    /**
     * @summary Fetches vehicle failure by ID
     * @description This method retrieves a specific vehicle failure resource by its ID from the API endpoint.
     * @author u202318274 Julca Minaya Sergio Gino
     * @param id
     * @return {Promise<axios.AxiosResponse<any>>}
     */
    getById(id) {
        return httpInstance.get(`${this.resourceEndPoint}/${id}`);
    }

    /**
     * @summary Fetches vehicle failures by vehicle ID
     * @description This method retrieves all vehicle failures associated with a specific vehicle ID from the API endpoint.
     * @author u202318274 Julca Minaya Sergio Gino
     */
    getByVehicleId(id) {
        return httpInstance.get(`${this.resourceEndPoint}?vehicleId=${id}`);
    }

    /**
     * @summary Updates an existing vehicle failure resource
     * @description This method sends a PUT request to the API endpoint to update an existing vehicle failure resource with the provided data.
     * @param id
     * @param resource
     * @return {Promise<axios.AxiosResponse<any>>}
     */
    update(id, resource) {
        return httpInstance.put(`${this.resourceEndPoint}/${id}`, resource);
    }

}
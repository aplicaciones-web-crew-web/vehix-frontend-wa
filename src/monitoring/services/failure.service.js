import httpInstance from "../../shared/services/http.instance.js";

export class FailureService {
    resourceEndPoint = import.meta.env.VITE_FAILURES_ENDPOINT_PATH;


    /**
     * @summary Fetches all failure resources
     * @description This method retrieves all failure resources from the API endpoint defined in resourceEndPoint.
     * @author u202318274 Julca Minaya Sergio Gino
     * @return {Promise<axios.AxiosResponse<any>>}
     */
    getAll() {
        return httpInstance.get(this.resourceEndPoint);
    }


    /**
     * @summary Creates a new failure resource
     * @description This method sends a POST request to the API endpoint to create a new failure resource with the provided data.
     * * @author u202318274 Julca Minaya Sergio Gino
     * @param resource
     * @return {Promise<axios.AxiosResponse<any>>}
     */
    create(resource) {
        return httpInstance.post(this.resourceEndPoint, resource);
    }


    /**
     * @summary Fetches failures for a specific vehicle
     * @description This method retrieves failures associated with a specific vehicle ID from the API endpoint.
     * @author u202318274 Julca Minaya Sergio Gino
     * @param id
     * @return {Promise<axios.AxiosResponse<any>>}
     */
    getById(id) {
        return httpInstance.get(`${this.resourceEndPoint}/${id}`);
    }

    /**
     * @summary Updates an existing failure resource
     * @description This method sends a PUT request to the API endpoint to update an existing failure resource with the provided data.
     * @author u202318274 Julca Minaya Sergio Gino
     * @param id
     * @param resource
     * @return {Promise<axios.AxiosResponse<any>>}
     */
    update(id, resource) {
        return httpInstance.put(`${this.resourceEndPoint}/${id}`, resource);
    }
}



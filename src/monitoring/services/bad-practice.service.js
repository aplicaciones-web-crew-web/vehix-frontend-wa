import httpInstance from "../../shared/services/http.instance.js";

export class BadPracticeService {
    resourceEndPoint = import.meta.env.VITE_BAD_PRACTICE_ENDPOINT_PATH;

    /**
     * @summary Fetches all bad practice resources
     * @description This method retrieves all bad practice resources from the API endpoint defined in resourceEndPoint.
     * @return {Promise<axios.AxiosResponse<any>>}
     * @author u202318274 Julca Minaya Sergio Gino
     */
    getAll() {
        return httpInstance.get(this.resourceEndPoint);
    }

    /**
     * @summary Creates a new bad practice resource
     * @description This method sends a POST request to the API endpoint to create a new bad practice resource with the provided data.
     * @param resource
     * @return {Promise<axios.AxiosResponse<any>>}
     * @author u202318274 Julca Minaya Sergio Gino
     */
    create(resource) {
        return httpInstance.post(this.resourceEndPoint, resource);
    }

    /**
     * @summary Fetches bad practices for a specific vehicle
     * @description This method retrieves bad practices associated with a specific vehicle ID from the API endpoint.
     * @param id
     * @return {Promise<axios.AxiosResponse<any>>}
     * @author u202318274 Julca Minaya Sergio Gino
     */
    getById(id) {
        return httpInstance.get(`${this.resourceEndPoint}/${id}`);
    }

    /**
     * @summary Creates a new bad practice resource
     * @description This method sends a POST request to the API endpoint to create a new bad practice resource with the provided data.
     * @param id
     * @param resource
     * @return {Promise<axios.AxiosResponse<any>>}
     * @author u202318274 Julca Minaya Sergio Gino
     */
    update(id, resource) {
        return httpInstance.put(`${this.resourceEndPoint}/${id}`, resource);
    }

}
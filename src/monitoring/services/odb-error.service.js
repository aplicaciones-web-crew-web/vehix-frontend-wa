import httpInstance from "../../shared/services/http.instance.js";

export class OdbErrorService {
    resourceEndPoint = import.meta.env.VITE_ODB_ERRORS_ENDPOINT_PATH;

    /**
     * @summary Fetches all ODB error resources
     * @description This method retrieves all ODB error resources from the API endpoint defined in resourceEndPoint.
     * * @author u202318274 Julca Minaya Sergio Gino
     * @return {Promise<axios.AxiosResponse<any>>}
     */
    getAll() {
        return httpInstance.get(this.resourceEndPoint);
    }


    /**
     * @summary Creates a new ODB error resource
     * @description This method sends a POST request to the API endpoint to create a new ODB error resource with the provided data.
     * @param resource
     * @return {Promise<axios.AxiosResponse<any>>}
     * @author u202318274 Julca Minaya Sergio Gino
     */
    create(resource) {
        return httpInstance.post(this.resourceEndPoint, resource);
    }


    /**
     * @summary Fetches ODB errors for a specific vehicle
     * @description This method retrieves ODB errors associated with a specific vehicle ID from the API endpoint.
     * * @author u202318274 Julca Minaya Sergio Gino
     * @param id
     * @return {Promise<axios.AxiosResponse<any>>}
     */
    getById(id) {
        return httpInstance.get(`${this.resourceEndPoint}/${id}`);
    }

    /**
     * @summary Updates an existing ODB error resource
     * @description This method sends a PUT request to the API endpoint to update an existing ODB error resource with the provided data.
     * * @author u202318274 Julca Minaya Sergio Gino
     * @param id
     * @param resource
     * @return {Promise<axios.AxiosResponse<any>>}
     */
    update(id, resource) {
        return httpInstance.put(`${this.resourceEndPoint}/${id}`, resource);
    }

}
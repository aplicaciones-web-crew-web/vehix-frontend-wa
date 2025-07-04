import httpInstance from "../../shared/services/http.instance.js";

export class SystemCheckService {
    resourceEndPoint = import.meta.env.VITE_SYSTEM_CHECKS_ENDPOINT_PATH;


    /**
     * @summary Fetches all System Checks resources
     * @description This method retrieves all system check resources from the API endpoint defined in resourceEndPoint.
     * @author u202318274 Julca Minaya Sergio Gino
     * @return {Promise<axios.AxiosResponse<any>>}
     */
    getAll() {
        return httpInstance.get(this.resourceEndPoint);
    }


    /**
     * @summary Fetches all system checks by vehicle ID
     * @description This method retrieves all vehicle status associated with a specific vehicle ID from the API endpoint.
     * @param vehicleId
     * @return {Promise<axios.AxiosResponse<any>>}
     */
    getByVehicleId(vehicleId) {
        return httpInstance.get(`${this.resourceEndPoint}?vehicleId=${vehicleId}`);
    }

    /**
     * @summary Creates a new system check resource
     * @description This method sends a POST request to the API endpoint to create a new system check resource with the provided data.
     * @param resource
     * @author u202318274 Julca Minaya Sergio Gino
     * @return {Promise<axios.AxiosResponse<any>>}
     */
    create(resource) {
        return httpInstance.post(this.resourceEndPoint, resource);
    }


    /**
     * @summary Fetches system check by ID
     * @description This method retrieves a specific system check resource by its ID from the API endpoint.
     * @author u202318274 Julca Minaya Sergio Gino
     * @param id
     * @return  {Promise<axios.AxiosResponse<any>>}
     */
    getById(id) {
        return httpInstance.get(`${this.resourceEndPoint}/${id}`);
    }


    /**
     * @summary Updates an existing system check resource
     * @param id
     * @param resource
     * @return  {Promise<axios.AxiosResponse<any>>}
     */
    update(id, resource) {
        return httpInstance.put(`${this.resourceEndPoint}/${id}`, resource);
    }

}
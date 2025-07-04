import httpInstance from "../../shared/services/http.instance.js";


/**
 * @class SubscriptionPlanService
 * @description Class for managing subscription plan resources through API calls.
 * This service provides methods to interact with the subscription plans endpoint, allowing for CRUD operations.
 * @author u202318274 Julca Minaya Sergio Gino
 */
export class SubscriptionPlanService {
    /**
     * @property {string} resourceEndPoint - The API endpoint for subscription plans.
     * @description This endpoint is used to perform CRUD operations on subscription plans.
     * @author u202318274 Julca Minaya Sergio Gino
     */
    resourceEndPoint = import.meta.env.VITE_PLANS_ENDPOINT_PATH;

    /**
     * @summary Fetches all subscription plan resources
     * @description This method retrieves all subscription plan resources from the API endpoint.
     * It sends a GET request to the specified endpoint and returns the response.
     * @returns {Promise<axios.AxiosResponse<any>>}
     * @author u202318274 Julca Minaya Sergio Gino
     */
    getAll(){
        return httpInstance.get(this.resourceEndPoint);
    }

    /**
     * @summary Fetches a plan resource by its ID
     * @description This method retrieves a specific subscription plan resource from the API endpoint using its ID.
     * @param id
     * @returns {Promise<axios.AxiosResponse<any>>}
     * @author u202318274 Julca Minaya Sergio Gino
     */
    getById(id){
        return httpInstance.get(`${this.resourceEndPoint}/${id}`);
    }

    /**
     * @summary Creates a new subscription plan resource
     * @description This method sends a POST request to the API endpoint to create a new plan resource with the provided data.
     * @param resource
     * @returns {Promise<axios.AxiosResponse<any>>}
     * @author u202318274 Julca Minaya Sergio Gino
     */
    create(resource){
        return httpInstance.post(this.resourceEndPoint, resource);
    }

    /**
     * @summary Updates an existing subscription plan resource
     * @description This method sends a PUT request to the API endpoint to update an existing subscription plan resource identified by its plan ID.
     * @param id
     * @param resource
     * @returns {Promise<axios.AxiosResponse<any>>}
     * @author u202318274 Julca Minaya Sergio Gino
     */
    update(id, resource){
        return httpInstance.put(`${this.resourceEndPoint}/${id}`, resource);
    }

    /**
     * @summary Deletes a plan resource by its plan ID
     * @description This method sends a DELETE request to the API endpoint to remove a subscription plan resource identified by its ID.
     * @param id
     * @returns {Promise<axios.AxiosResponse<any>>}
     * @author u202318274 Julca Minaya Sergio Gino
     */
    delete(id){
        return httpInstance.delete(`${this.resourceEndPoint}/${id}`);
    }
}

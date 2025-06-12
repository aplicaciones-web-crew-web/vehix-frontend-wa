import httpInstance from "../../shared/services/http.instance.js";


/**
 * @class PaymentApiService
 * @description Class for managing subscription plan resources through API calls.
 * This service provides methods to interact with the subscription plans endpoint, allowing for CRUD operations.
 * @author u202318274 Julca Minaya Sergio Gino
 */
export class PaymentApiService {
    /**
     * @property {string} resourceEndPoint - The API endpoint for payments.
     * @description This endpoint is used to perform CRUD operations on payments .
     * @author u202318274 Julca Minaya Sergio Gino
     */
    resourceEndPoint = import.meta.env.VITE_PAYMENTS_ENDPOINT_PATH;

    /**
     * @summary Fetches all payments plan resources
     * @description This method retrieves all payments resources from the API endpoint.
     * It sends a GET request to the specified endpoint and returns the response.
     * @returns {Promise<axios.AxiosResponse<any>>}
     * @author u202318274 Julca Minaya Sergio Gino
     */
    getAll(){
        return httpInstance.get(this.resourceEndPoint);
    }

    /**
     * @summary Fetches a payment resource by its ID
     * @description This method retrieves a specific payment resource from the API endpoint using its ID.
     * @param id
     * @returns {Promise<axios.AxiosResponse<any>>}
     * @author u202318274 Julca Minaya Sergio Gino
     */
    getById(id){
        return httpInstance.get(`${this.resourceEndPoint}/${id}`);
    }

    /**
     * @summary Creates a new payment resource
     * @description This method sends a POST request to the API endpoint to create a new payment resource with the provided data.
     * @param resource
     * @returns {Promise<axios.AxiosResponse<any>>}
     * @author u202318274 Julca Minaya Sergio Gino
     */
    create(resource){
        return httpInstance.post(this.resourceEndPoint, resource);
    }

    /**
     * @summary Updates an existing payment resource
     * @description This method sends a PUT request to the API endpoint to update an existing payment resource identified by its ID.
     * @param id
     * @param resource
     * @returns {Promise<axios.AxiosResponse<any>>}
     * @author u202318274 Julca Minaya Sergio Gino
     */
    update(id, resource){
        return httpInstance.put(`${this.resourceEndPoint}/${id}`, resource);
    }

    /**
     * @summary Deletes a payment resource
     * @description This method sends a DELETE request to the API endpoint to delete a payment resource identified by its ID.
     * @author u202318274 Julca Minaya Sergio Gino
     * @param id
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    delete(id){
        return httpInstance.delete(`${this.resourceEndPoint}/${id}`);
    }
}

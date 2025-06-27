import httpInstance from "../../shared/services/http.instance.js";

/**
 * @description Service to interact with the vehicle FAKEApi.
 * @class VehicleService
 * @author u202318274 Julca Minaya Sergio Gino
 */
export class VehicleService {

    /**
     * @description The endpoint path for the vehicle resource.
     * @type {string}
     * @author u202318274 Julca Minaya Sergio Gino
     */
    resourceEndPoint = import.meta.env.VITE_VEHICLES_ENDPOINT_PATH;

    /**
     * @description Fetches all vehicles from the FAKEApi.
     * @return {Promise<axios.AxiosResponse<any>>}
     * @author u202318274 Julca Minaya Sergio Gino
     */
    getAll(){
        return httpInstance.get(this.resourceEndPoint);
    }


    /**
     * @description Fetches a vehicle by its ID from the FAKEApi.
     * @param id
     * @return {Promise<axios.AxiosResponse<any>>}
     * @author u202318274 Julca Minaya Sergio Gino
     */
    getById(id){
        return httpInstance.get(`${this.resourceEndPoint}/${id}`);
    }


    /**
     * @description Creates a new vehicle in the FAKEApi.
     * @param resource
     * @return {Promise<axios.AxiosResponse<any>>}
     * @author u202318274 Julca Minaya Sergio Gino
     */
    create(resource){
        return httpInstance.post(this.resourceEndPoint, resource);
    }


    /**
     * @description Updates an existing vehicle in the FAKEApi.
     * @param id
     * @param resource
     * @return {Promise<axios.AxiosResponse<any>>}
     * @author u202318274 Julca Minaya Sergio Gino
     */
    update(id, resource){
        return httpInstance.put(`${this.resourceEndPoint}/${id}`, resource);
    }


    /**
     * @description Deletes a vehicle by its ID from the FAKEApi.
     * @param id
     * @return {Promise<axios.AxiosResponse<any>>}
     * @author u202318274 Julca Minaya Sergio Gino
     */
    delete(id){
        return httpInstance.delete(`${this.resourceEndPoint}/${id}`);
    }

    /**
     * @description Fetches vehicles by userId from the FAKEApi.
     * @param {string|number} userId - The ID of the user whose vehicles are to be fetched.
     * @return {Promise<axios.AxiosResponse<any>>}
     * @author u202318274 Julca Minaya Sergio Gino
     */
    getByUserId(userId){
        return httpInstance.get(`${this.resourceEndPoint}?userId=${userId}`);
    }
}

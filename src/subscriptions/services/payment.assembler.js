import {Payment} from "../models/payment.entity.js";

/**
 * @class PaymentAssembler
 * This class is responsible for converting Payment resources from the API into Payment entities.
 */
export class PaymentAssembler{

    /**
     * @description Converts a payment resource to a Payment entity.
     * This method is used to transform the raw data from the API into a Payment entity.
     * @param resource
     * @returns {Payment}
     * @author Julca Minaya Sergio Gino, u202318274
     */
    static toEntityFromResource(resource) {
        return new Payment(resource);
    }


    /**
     * @description Converts a response containing payment resources to an array of Payment entities.
     * This method is used to transform the raw data from the API into an array of Payment entities.
     * @param response
     * @return {Payment[]}
     * @author Julca Minaya Sergio Gino, u202318274
     */
    static toEntitiesFromResponse(response) {
        if (!response || !response.data || !Array.isArray(response.data)) {
            console.error('Invalid resource: ', response);
            return [];
        }
        return response.data.map(paymentResource => this.toEntityFromResource(paymentResource));
    }
}
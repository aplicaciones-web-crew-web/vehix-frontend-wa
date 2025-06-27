import {SubscriptionPlan} from "../models/subscription-plan.entity.js";

/**
 * @class SubscriptionPlanAssembler
 * @description Class for assembling SubscriptionPlan entities from various data sources (fakeAPI).
 * Follows the assembler pattern.
 * @author Julca Minaya Sergio Gino, u202318274
 */
export class SubscriptionPlanAssembler{

    /**
     * Converts a subscription plan resource to a SubscriptionPlan entity.
     * This method is used to transform the raw data from the API into a SubscriptionPlan entity.
     * @param resource
     * @returns {SubscriptionPlan}
     * @author Julca Minaya Sergio Gino, u202318274
     */
    static toEntityFromResource(resource) {
        return new SubscriptionPlan(resource);
    }

    /**
     * Converts a response containing subscription plan resources to an array of SubscriptionPlan entities.
     * This method is used to transform the raw data from the API into an array of SubscriptionPlan entities.
     * @param response
     * @returns {SubscriptionPlan[]}
     * @author Julca Minaya Sergio Gino, u202318274
     */
    static toEntitiesFromResponse(response) {
        if (!response || !response.data || !Array.isArray(response.data)) {
            console.error('Invalid resource: ', response);
            return [];
        }
        return response.data.map(subscriptionPlanResource => this.toEntityFromResource(subscriptionPlanResource));
    }
}
/**
 * @class Plan
 * @description Represents a Subscription Plan
 * with the details of the failure.
 * @author Julca Minaya Sergio Gino, u202318274
 */
export class SubscriptionPlan {

    constructor({
                    id = 0,
                    name = '',
                    price = 0.00,
                    imageUrl = ''
                }) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
    }

}
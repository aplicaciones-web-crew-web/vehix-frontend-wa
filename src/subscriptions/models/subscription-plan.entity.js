/**
 * @class Plan
 * @description Represents a Subscription Plan
 * with the details of the failure.
 */
export class SubscriptionPlan {

    constructor({
                    id= 0,
                    name= '',
                    price = 0.00
                }) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

}
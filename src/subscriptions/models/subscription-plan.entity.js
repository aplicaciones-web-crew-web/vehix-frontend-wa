/**
 * @class Plan
 * @description Represents a Subscription Plan
 * with the details of the failure.
 */
export class SubscriptionPlan {

    constructor({
                    id= 0,
                    name= '',
                    price = ''
                }) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

}
/**
 * @class Payment
 * Represents a payment entity.
 * This class is used to encapsulate the details of a payment.
 * @author Julca Minaya Sergio Gino, u202318274
 */
export class Payment {

    constructor({
                    id= 0,
                    userId= 0,
                    planId = 0,
                    amount = 0,
                    date = '',
                    status = ''
                }) {
        this.id = id;
        this.userId = userId;
        this.planId = planId;
        this.amount = amount;
        this.date = date;
        this.status = status;
    }

}
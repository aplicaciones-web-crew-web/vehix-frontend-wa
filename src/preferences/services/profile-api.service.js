import {UsersApiService} from "../../IAM/services/users-api.service.js";
import {SubscriptionPlanApiService} from "../../subscriptions/services/subscription-plan-api.service.js";

/**
 * @class ProfileApiService
 * @description Service for profile related operations such as retrieving the
 * current user and their plan information.
 */
export class ProfileApiService {
    constructor() {
        this.userService = new UsersApiService();
        this.planService = new SubscriptionPlanApiService();
    }

    /**
     * Fetch user data by id.
     * @param {string|number} id - user id
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getUserById(id) {
        return this.userService.getById(id);
    }

    /**
     * Fetch plan data by id.
     * @param {string|number} id - plan id
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getPlanById(id) {
        return this.planService.getById(id);
    }
}
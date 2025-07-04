<script>
import SubscriptionPlanList from "../components/subscription-plan-list.component.vue";
import {UserSessionService} from "../../shared/services/user-session.service.js";
import {SubscriptionPlanAssembler} from "../services/subscription-plan.assembler.js";
import {SubscriptionPlanService} from "../services/subscription-plan.service.js";
import {UserService} from "../../IAM/services/user.service.js";

export default {
  name: "subscription-plan-management",
  components: { SubscriptionPlanList},
  data() {
    return {
      userService: null,
      userId: null,
      subscriptionsPlans: [],
      subscriptionPlanService: null
    };
  },
  created() {
    //Initializing services and loading data
    this.userId = UserSessionService.getUserId();
    this.userService = new UserService();
    this.subscriptionPlanService = new SubscriptionPlanService();

    //Subscriptions Plans loading
    this.subscriptionPlanService.getAll().then(response => {
      this.subscriptionsPlans = SubscriptionPlanAssembler.toEntitiesFromResponse(response);
      console.log("Subscriptions Plans loaded successfully");
    }).catch(error => {
      console.error("Plans data loading error: ", error);
    });

    if (!this.userId) { console.log("User ID not found."); return;}

    //User Service loading to verify if the user has a plan
    this.userService.getById(this.userId).then(response => {
      const user = response.data;
      if (user.planId !== 0) {
        this.$router.push("/home");
      }
    }).catch(error => {
      console.error("User data loading error: ", error);
    })
  },

  methods:{
    goToPayment(plan){
      this.$router.push({
        name: 'payment-management',
        query: { planName: plan.name }
      });
    }
  }
}
</script>

<template>
  <subscription-plan-list
      :plans="subscriptionsPlans"
      @plan-selected="goToPayment">
  </subscription-plan-list>
</template>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
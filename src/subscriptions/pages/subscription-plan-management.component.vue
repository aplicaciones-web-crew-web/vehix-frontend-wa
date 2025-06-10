<script>
import SubscriptionPlanList from "../components/subscription-plan-list.component.vue";
import {UsersApiService} from "../../IAM/services/users-api.service.js";
import {UserSessionService} from "../../shared/services/user-session.service.js";

export default {
  name: "subscription-plan-management",
  components: { SubscriptionPlanList},
  data() {
    return {
      userService: null,
      userId: null
    };
  },
  created() {
    this.userId = UserSessionService.getUserId();
    if (!this.userId) {
      console.log("User ID not found.");
      return;
    }

    this.userService = new UsersApiService();
    this.userService.getById(this.userId).then(response => {
      const user = response.data;
      if (user.planId !== 0) {
        this.$router.push("/home");
      }
    }).catch(error => {
      console.error("User data loading error: ", error);
    })
  },
}
</script>

<template>
  <subscription-plan-list></subscription-plan-list>
</template>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
<script>
import {SubscriptionsPlansApiService} from "../services/subscriptions-plans-api.service.js";
import {SubscriptionPlanAssembler} from "../services/subscription-plan.assembler.js";
import {Button as PvButton} from "primevue";

export default {
  name: "subscription-plan-list",
  components: {PvButton},
  data() {
    return {
      subscriptionPlans: [],
      subscriptionsPlansApiService: null,
    }
  },
  created() {
    this.subscriptionsPlansApiService = new SubscriptionsPlansApiService();
    this.subscriptionsPlansApiService.getAll().then(response => {
      this.subscriptionPlans = SubscriptionPlanAssembler.toEntitiesFromResponse(response);
      console.log("Plans loaded successfully");
    }).catch(error => {
      console.error("Plans data loading error: ", error);
    });
  },
  methods: {
    /**
     * Returns the json Object based on the plan name.
     * @param {string} planName - The name of the subscription plan.
     * @returns {string} - The translation key for the plan.
     */
    getTranslationKey(planName) {
      if (planName.toLowerCase().includes('standard')) return 'planStandard';
      if (planName.toLowerCase().includes('pro')) return 'planPro';
      return '';
    },

    planSelected(plan) {
      this.$router.push({name: 'payment-management', query: {planName: plan.name}})
    }

  }

}
</script>

<template>
  <div class="subscription-plan-list-container">
    <pv-card
        v-for="plan in subscriptionPlans"
        :key="plan.id"
        class="subscription-card"
    >
      <template #title>
        {{ $t(getTranslationKey(plan.name) + '.title') }}
      </template>

      <template #subtitle>
        {{ $t(getTranslationKey(plan.name) + '.planTerm') }}
      </template>

      <template #content>
        <ul>
          <li v-for="i in 6" :key="i">
            {{ $t(`${getTranslationKey(plan.name)}.benefit${i}`) }}
          </li>
        </ul>
        <pv-button @click="planSelected(plan)">$/. {{ plan.price }} / month</pv-button>
      </template>
    </pv-card>
  </div>
</template>


<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
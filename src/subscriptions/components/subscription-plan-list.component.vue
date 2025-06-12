<script>
import {SubscriptionPlanApiService} from "../services/subscription-plan-api.service.js";
import {SubscriptionPlanAssembler} from "../services/subscription-plan.assembler.js";
import {Button as PvButton} from "primevue";

export default {
  name: "subscription-plan-list",
  props: {
    plans: {
      type: Array,
      required: true,
    }
  },
  components: {PvButton},
  data() {
    return {
      subscriptionsPlans: [],
      subscriptionPlanService: null,
    }
  },
  methods: {
    /**
     * Returns the json Object based on the plan name.
     * @param {string} planName - The name of the subscription plan.
     * @returns {string} - The translation key for the plan.
     */
    getPlanInJsonFormatToTranslate(planName) {
      if (planName.toLowerCase().includes('standard')) return 'planStandard';
      if (planName.toLowerCase().includes('pro')) return 'planPro';
      return '';
    },

    planSelected(plan) {
      this.$emit("plan-selected", plan);
    }
  }

}

</script>

<template>
  <div class="subscription-plan-list-container">
    <pv-card
        v-for="plan in plans"
        :key="plan.id"
        class="subscription-card"
    >
      <template #title>
        {{ $t(getPlanInJsonFormatToTranslate(plan.name) + '.title') }}
      </template>

      <template #subtitle>
        {{ $t(getPlanInJsonFormatToTranslate(plan.name) + '.planTerm') }}
      </template>

      <template #content>
        <ul>
          <li v-for="i in 6" :key="i">
            {{ $t(`${getPlanInJsonFormatToTranslate(plan.name)}.benefit${i}`) }}
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
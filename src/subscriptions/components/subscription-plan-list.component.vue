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
    },

    getNamePvCardClass(planId) {
      return "subscription-card-" + planId;
    },

    getTitleClass(planId) {
      return "card-title-" + planId;
    },
    getSubtitleClass(planId) {
      return "card-subtitle-" + planId;
    },
    getContentClass(planId) {
      return "card-content-" + planId;
    },
    getButtonClass(planId) {
      return "button-plan-" + planId;
    }
  }

}

</script>

<template>
  <div class="subscription-plan-list-container">
    <pv-card
        v-for="plan in plans"
        :key="plan.id"
        :class="getNamePvCardClass(plan.id)"
        style="border-radius: 0 0 0 0;"
    >
      <template #title>
        <div :class="getTitleClass(plan.id)">
          {{ $t(getPlanInJsonFormatToTranslate(plan.name) + '.title') }}
        </div>
      </template>
      <template #subtitle>
        <div :class="getSubtitleClass(plan.id)">
          {{ $t(getPlanInJsonFormatToTranslate(plan.name) + '.planTerm') }}
        </div>
      </template>

      <template #content>
        <div :class="getContentClass(plan.id)">
          <ul>
            <li v-for="i in 6" :key="i">
              {{ $t(`${getPlanInJsonFormatToTranslate(plan.name)}.benefit${i}`) }}<br><br>
            </li>
          </ul>
          <pv-button :class="getButtonClass(plan.id)" @click="planSelected(plan)">$/. {{ plan.price }} / month
          </pv-button>
        </div>
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

.subscription-plan-list-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}


.card-title-1 {
  font-size: clamp(1.5rem, 7vw, 7rem);
  font-weight: bold;
  color: black;
  margin-top: 1rem;
}

.card-subtitle-1 {
  font-size: clamp(1.5rem, 2vw, 2rem);
  color: black;
  margin-top: 1rem;
}

.card-content-1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  font-size: clamp(1rem, 1.5vw, 1.5rem);
  color: black;
}

.subscription-card-1 {
  display: flex;
  width: 50%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.button-plan-1 {
  width: 30%;
  height: 10rem;
  font-size: 2rem;
  background-color: black;
  color: white;
}



.card-title-2 {
  font-size: clamp(1.5rem, 7vw, 7rem);
  font-weight: bold;
  margin-top: 1rem;
  color: white;
}

.card-subtitle-2 {
  font-size: clamp(1.5rem, 2vw, 2rem);
  margin-top: 1rem;
  color: white;
}

.card-content-2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  font-size: clamp(1rem, 1.5vw, 1.5rem);
  color: white;

}

.subscription-card-2 {
  display: flex;
  width: 50%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: black !important;
  color: white;
}

.button-plan-2 {
  width: 30%;
  height: 10rem;
  font-size: 2rem;
  background: white;
  color: black;
}
.subscription-card-2 {
  background-color: #000 !important;
}
.card-title-2,
.card-subtitle-2,
.card-content-2 {
  color: white !important;
}

ul li {
  text-align: center;
  list-style-type: none;
}

@media only screen and (max-width: 900px) {
  .subscription-plan-list-container {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .subscription-card-1, .subscription-card-2 {
    width: 100%;
    height: auto;
  }

  .button-plan-1, .button-plan-2 {
    width: 80%;
    height: auto;
    font-size: 1.5rem;
  }
}
</style>
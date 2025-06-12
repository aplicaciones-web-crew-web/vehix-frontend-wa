<script>
import ToolbarPayment from "../components/toolbar-payment.component.vue";
import PaymentSummaryCard from "../components/payment-summary-card.component.vue";
import PaymentFormCard from "../components/payment-form-card.component.vue";
import {PaymentApiService} from "../services/payment-api.service.js";
import {PaymentAssembler} from "../services/payment.assembler.js";
import {SubscriptionPlanApiService} from "../services/subscription-plan-api.service.js";
import {SubscriptionPlanAssembler} from "../services/subscription-plan.assembler.js";

export default {
  name: "payment-management",
  components: {PaymentFormCard, PaymentSummaryCard, ToolbarPayment},
  data() {
    return {
      planName: null,
      plans: [],
      selectedPlan: null,
      amount: 0,
      subscriptionPlanService: null,
      paymentService: null,
    }
  },
  created() {
    this.planName = this.$route.query.planName;
    this.subscriptionPlanService = new SubscriptionPlanApiService();
    this.paymentService = new PaymentApiService();

    this.subscriptionPlanService.getAll()
        .then((response) => {
          this.plans = SubscriptionPlanAssembler.toEntitiesFromResponse(response);
          this.selectedPlan = this.plans.find(p => p.name === this.planName);
        })
        .catch((error) => {
          console.error("Error loading subscription plans: ", error);
        })
  },


  methods: {
    handleAmountUpdate(newAmount) {
      this.amount = newAmount;
    },

    handleSubmit(paymentData) {
      try {
        const newPayment = PaymentAssembler.toEntityFromResource(paymentData);
        this.paymentService.create(newPayment);
      } catch (error) {
        console.log("Error making payment: ", error)
      }
    },
  }

}
</script>

<template>
  <div class="payment-page">
    <toolbar-payment :selected-plan="this.planName" class="toolbar-container"></toolbar-payment>
    <div class="content-container">
      <div class="payment-process-container">
        <div class="payment-information-container">
          <payment-summary-card v-if="selectedPlan"
                                :plan="selectedPlan"
                                @update-amount="handleAmountUpdate"
          ></payment-summary-card>
        </div>
        <div class="contact-information-container">
          <payment-form-card :plan="selectedPlan"
                             :amount="amount"
                             @submit="handleSubmit"
          ></payment-form-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.payment-process-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.payment-information-container {
  order: 1;
}

.contact-information-container {
  order: 0;
}

.content-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  padding: 2rem;
}

.payment-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.payment-process-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 800px) {
  .payment-process-container {
    flex-direction: column;
  }
}
</style>
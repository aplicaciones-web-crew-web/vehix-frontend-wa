<script>
import ToolbarPayment from "../components/toolbar-payment.component.vue";
import PaymentSummaryCard from "../components/payment-summary-card.component.vue";
import PaymentFormCard from "../components/payment-form-card.component.vue";

export default {
  name: "payment-management",
  components: {PaymentFormCard, PaymentSummaryCard, ToolbarPayment},
  data() {
    return {
      planName: null,
    }
  },
  created() {
    this.planName = this.$route.query.planName;
  },
}
</script>

<template>
  <div class="payment-page">
    <toolbar-payment :selected-plan="this.planName" class="toolbar-container"></toolbar-payment>
    <div class="content-container">
      <div class="payment-process-container">
        <payment-form-card class="contact-information-container"></payment-form-card>
        <payment-summary-card :selected-plan="this.planName" class="payment-information-container"></payment-summary-card>
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
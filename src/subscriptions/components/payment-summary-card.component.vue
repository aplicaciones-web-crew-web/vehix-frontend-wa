<script>
import PaymentFormCardComponent from "./payment-form-card.component.vue";
import {PaymentsApiService} from "../services/payments-api.service.js";
import {PaymentAssembler} from "../services/payment.assembler.js";

export default {
  name: "payment-summary-card",
  components: {ContactInformationCard: PaymentFormCardComponent},
  props: {
    selectedPlan: {
      type: String,
      required: true
    },
  },

  methods:{
  }
}
</script>

<template>
  <div class="plan-contact-information-price-container">
    <div v-if="selectedPlan === 'Plan Standard'">
      <pv-card class="plan-standard-card">
        <template #title><img width="50%"
                              src="https://drive.google.com/file/d/1glEvXB3Q3RiidNpQM1R-uadrxcAu_AiS/view">
        </template>
        <template #content>
          <h3>{{ $t('payment.summaryOrder') }}</h3>
        </template>

      </pv-card>
    </div>

    <div v-else-if="selectedPlan === 'Plan Pro'" class="plan-pro-container">
      <pv-card class="plan-pro-card">
        <template #title><img width="50%"
                              src="https://w7.pngwing.com/pngs/527/625/png-transparent-scalable-graphics-computer-icons-upload-uploading-cdr-angle-text-thumbnail.png">
        </template>
        <template #content>
          jdisaijasd
        </template>
      </pv-card>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.plan-standard-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.plan-pro-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


</style>
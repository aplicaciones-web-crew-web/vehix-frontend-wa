<script>
import PaymentFormCardComponent from "./payment-form-card.component.vue";
import {SubscriptionPlanApiService} from "../services/subscription-plan-api.service.js";
import {SubscriptionPlanAssembler} from "../services/subscription-plan.assembler.js";

export default {
  name: "payment-summary-card",
  components: {ContactInformationCard: PaymentFormCardComponent},
  props: {
    plan: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      subscriptionPlanService: null,
      subscriptionsPlans: [],
      vehixScannerCost: 0.0,
      vehixPlanCost: 0.0,
      subtotalCost: 0.0,
      shipmentCost: 0.0,
      totalCost: 0.0,
    }
  },
  created() {
    this.subscriptionPlanService = new SubscriptionPlanApiService()
    this.subscriptionPlanService.getAll().then(response => {
      this.subscriptionsPlans = SubscriptionPlanAssembler.toEntitiesFromResponse(response);
      console.log("Plans loaded successfully");
    }).catch(error => {
      console.error("Plans data loading error: ", error);
    });
  },
  methods: {


    getSubTotalPrice() {
      const vehixPlanPrice = parseFloat(this.getStringPriceVehixPlan());
      const vehixScannerPrice = (this.getStringPriceVehixScanner() === 'Free') ? 0 : 35.00;
      return vehixPlanPrice + vehixScannerPrice;
    },

    getStringShipmentPrice() {
      if (this.plan.name === "Plan Standard") return '15.00';
      if (this.plan.name === "Plan Pro") return '00.00';
    },

    getTotalPrice() {
      const subTotal = this.getSubTotalPrice();
      const shipmentPrice = parseFloat(this.getStringShipmentPrice());
      const total = subTotal + shipmentPrice;
      this.$emit("update-amount", total);
      return subTotal + shipmentPrice;
    },


    getPlanNameInStringToEnOrEs() {
      if (this.plan.name === "Plan Standard") return 'payment.vehixPlanStandard';
      if (this.plan.name === "Plan Pro") return 'payment.vehixPlanPro';
    },
    getPreviousPriceVehixScanner() {
      return this.plan.price * 2
    },

    getStringPriceVehixScanner() {
      if (this.plan.name === "Plan Standard") return '35.00'
      if (this.plan.name === "Plan Pro") return 'Free'

    },

    getStringPriceVehixPlan() {
      if (this.plan.name === "Plan Standard") return '65.00'
      if (this.plan.name === "Plan Pro") return '100.00'
    }

  }
}
</script>

<template>
  <div class="plan-contact-information-price-container" v-if="plan">
    <pv-card class="plan-standard-card">
      <template #title><img width="50%"
                            src="#">
      </template>
      <template #content>
        <div class="order-summary-container">
          <div class="summary-order-title"><h2>{{ $t('payment.summaryOrder') }}</h2></div>

          <div class="product-container">
            <div class="product-img"><img width="50%" src="#"></div>
            <div class="product-title"><h5>{{ $t('payment.vehixScanner') }}</h5></div>
            <div class="product-price">
              <h5>{{ getStringPriceVehixScanner() }}</h5>
              <h5>{{ getPreviousPriceVehixScanner() }}</h5>
            </div>
          </div>

          <div class="product-container">
            <div class="product-img"><img width="50%" src="#"></div>
            <div class="product-title"><h5>{{ $t(getPlanNameInStringToEnOrEs()) }}</h5></div>
            <div class="product-price">
              <h5>{{ getStringPriceVehixPlan() }}</h5>
            </div>
          </div>

          <div class="summary-price-container">
            <div class="subtotal-price-container">
              <div class="subtotal-label"><h5>{{ $t('payment.subTotal') }}</h5></div>
              <div class="subtotal-price"><h5>{{ getSubTotalPrice() }}</h5></div>
            </div>
            <div class="shipment-price-container">
              <div class="shipment-label"><h5>{{ $t('payment.shipping') }}</h5></div>
              <div class="shipment-price"><h5>{{ getStringShipmentPrice() }}</h5></div>
            </div>
            <div class="total-price-container">
              <div class="total-label"><h5>{{ $t('payment.total') }}</h5></div>
              <div class="total-price"><h5>{{ getTotalPrice() }}</h5></div>
            </div>

          </div>
        </div>
      </template>

    </pv-card>

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
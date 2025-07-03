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
    <pv-card class="plan-card">
      <template #title><img src="https://preview.redd.it/compatibility-v0-4q4hg446qoaf1.png?width=320&crop=smart&auto=webp&s=8237e4a951c07400c485c5a6981ad2af41b7f49c">
      </template>
      <template #content>
        <div class="order-summary-container">
          <div class="summary-order-title"><h2>{{ $t('payment.summaryOrder') }}</h2></div>

          <div class="product-container">
            <div class="product-img"><img width="50%"
                                          src="https://preview.redd.it/ltoe1gz9roaf1.png?width=86&format=png&auto=webp&s=47bcbc78885beb0d26b8b7ad67e49bede7f05425">
            </div>
            <div class="product-information-container">

              <div class="product-title"><h5>{{ $t('payment.vehixScanner') }}</h5></div>
              <div class="product-price">
                <h5>{{ getStringPriceVehixScanner() }}</h5>
                <h5 style="text-decoration: line-through">$/.{{ getPreviousPriceVehixScanner() }}.00</h5>
              </div>
            </div>
          </div>

          <div class="product-container">
            <div class="product-img"><img
                src="https://preview.redd.it/qgl8ie0aroaf1.png?width=86&format=png&auto=webp&s=c8a6f193b145f6e2b06736630ff43b772565da20">
            </div>
            <div class="product-information-container">
              <div class="product-title"><h5>{{ $t(getPlanNameInStringToEnOrEs()) }}</h5></div>
              <div class="product-price"><h5>$/.{{ getStringPriceVehixPlan() }}</h5></div>
            </div>
          </div>

          <div class="summary-price-container">
            <div class="subtotal-price-container">
              <div class="subtotal-label"><h5>{{ $t('payment.subTotal') }}</h5></div>
              <div class="subtotal-price"><h5>$/.{{ getSubTotalPrice() }}.00</h5></div>
            </div>
            <div class="shipment-price-container">
              <div class="shipment-label"><h5>{{ $t('payment.shipping') }}</h5></div>
              <div class="shipment-price"><h5>$/.{{ getStringShipmentPrice() }}</h5></div>
            </div>
            <div class="total-price-container">
              <div class="total-label"><h5>{{ $t('payment.total') }}</h5></div>
              <div class="total-price"><h5>$/.{{ getTotalPrice() }}</h5></div>
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

.plan-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.total-price-container{
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.3rem;
  background: #A9D8DC;
}
.summary-price-container {
  display: flex;
  flex-direction: column;
}

.product-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
}

.product-information-container {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
}

.subtotal-price-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.total-price-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.shipment-price-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

img {
  width: 100%;
}

@media only screen and (max-width: 900px) {
  .plan-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

  }
  .order-summary-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .total-price-container{
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 0.3rem;
    background: #A9D8DC;
  }
  .summary-price-container {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .product-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 1rem;
  }

  .product-information-container {
    display: flex;
    width: 100%;
    flex-direction: column;
    text-align: center;
    justify-content: space-around;
  }

  .subtotal-price-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .total-price-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .shipment-price-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
}

</style>
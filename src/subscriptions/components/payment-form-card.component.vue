<script>
import AlertCard from "../../shared/components/alert-card.component.vue";
import {isNumeric, isValidEmail} from "../../shared/utils/validation.util.js";
import {PaymentsApiService} from "../services/payments-api.service.js";
import {PaymentAssembler} from "../services/payment.assembler.js";


export default {
  name: "payment-form-card",
  components: {AlertCard},
  data() {
    return {
      email: '',

      address: '',
      street: '',
      city: '',
      country: '',
      floor: '',
      province: '',
      postalCode: '',
      phoneNumber: '',

      cardNumber: '',
      cvv: '',

      currentAlert: null,

      today: null,
      currentYear: null,
      currentMonth: null,
      minDate: null,
      maxDate: null,
      expirationDate: '',


      payments: [],
      paymentApiService: null
    }
  },
  created() {
    this.today = new Date();
    this.currentYear = this.today.getFullYear();
    this.currentMonth = this.today.getMonth();
    this.minDate = new Date(this.currentYear, this.currentMonth, 1);
    this.maxDate = new Date(this.currentYear + 5, this.currentMonth + 1, 0);

    this.paymentApiService = new PaymentsApiService();
    this.paymentApiService.getAll().then(response => {
      this.payments = PaymentAssembler.toEntitiesFromResponse(response);
      console.log("Payments loaded successfully:", this.payments);
    }).catch(error => {
      console.error("Payment data loading error: ", error);
    })
  },
  methods: {
    /**
     * Displays an alert message with the given title, message, and type.
     * This method correctly sets the currentAlert data property.
     * @param {string} title - The title of the alert.
     * @param {string} message - The message to display in the alert.
     * @param {string} type - The type of alert (e.g., 'info', 'warn', 'error', 'success').
     * @author U202318274 Julca Minaya Sergio Gino
     */
    displayAlert(title, message, type) {
      this.currentAlert = {title, message, type};
    },

    /**
     * Closes the current alert message and resets the currentAlert data property.
     * This method is called when the alert is closed.
     * @param {string} action - The type of action that closed the alert ('x-button', 'ok', 'cancel').
     * @author U202318274 Julca Minaya Sergio Gino
     */
    onAlertClosed(action) {
      this.currentAlert = null;
      console.log('AlertCard closed by:', action);
    },

    validateFilledFields() {
      if (!this.email || !this.address || !this.street || !this.city || !this.country || !this.floor || !this.province || !this.postalCode || !this.phoneNumber || !this.cardNumber || !this.expirationDate || !this.cvv) {
        this.displayAlert("Empty Fields", "Complete all inputs", "warn");
        return false;
      }
      return true;
    },
    /**
     * To validate if the inputs are filled with only numbers
     * @returns {boolean} - Returns true if all inputs are filled, false otherwise.
     * @author U202318274 Julca Minaya Sergio Gino
     */
    validateOnlyNumbers() {
      if (!isNumeric(this.postalCode) || !isNumeric(this.phoneNumber) || !isNumeric(this.cardNumber) || !isNumeric(this.cvv)) {
        this.displayAlert("Invalid Input", "Please enter only numbers in the fields: Postal Code, Phone Number, Card Number, and CVV.", "warn");
        return false;
      }
      return true;
    },

    validateEmail() {
        if (!isValidEmail(this.email)) {
          this.displayAlert("Invalid Input", "Please enter a valid email", "warn");
          return false;
        }
        return true;
    },

    resetFields() {
      this.email = '';
      this.address = '';
      this.street = '';
      this.city = '';
      this.country = '';
      this.floor = '';
      this.province = '';
      this.postalCode = '';
      this.phoneNumber = '';
      this.cardNumber = '';
      this.expirationDate = '';
      this.cvv = '';
    },

    validatePayment() {
      if (!this.validateFilledFields()) return;
      if (!this.validateOnlyNumbers()) return;
      if (!this.validateEmail()) return;
      const payment = PaymentAssembler.toEntityFromResource( {
        userId: ,
        planId: ,
        amount: ,
        date: new Date(),
        status : 'PENDING',
      })
      this.paymentApiService.create(payment).then(() => {
        this.displayAlert("Payment Successful", "Your payment has been processed successfully.", "success");
        this.resetFields();
      }).catch(error => {
        console.error("Payment processing error: ", error);
        this.displayAlert("Payment Error", "There was an error processing your payment. Please try again.", "error");
      });


    },

  }
}
</script>

<template>
  <alert-card
      v-if="currentAlert"
      :key="currentAlert.title + currentAlert.message + currentAlert.type"
      :title="currentAlert.title"
      :message="currentAlert.message"
      :type="currentAlert.type"
      :show-actions="currentAlert.type === 'error' || currentAlert.type === 'warn'" @closed="onAlertClosed"
  ></alert-card>
  <pv-card class="contact-information-card">
    <template #content>
      <div class="contact-fields">
        <div class="contact-information-container">
          <h1>{{ $t('payment.contactInformation') }}</h1>
          <pv-input-text :placeholder="$t('payment.email')" v-model="email"></pv-input-text>
        </div>

        <div class="address-container">
          <h1>{{ $t('payment.mailingAddress') }}</h1>
          <div class="separator-container">
            <pv-input-text :placeholder="$t('payment.address')" v-model="address"></pv-input-text>
            <pv-input-text :placeholder="$t('payment.street')" v-model="street"></pv-input-text>
          </div>
          <div class="separator-container">
            <pv-input-text :placeholder="$t('payment.city')" v-model="city"></pv-input-text>
            <pv-input-text :placeholder="$t('payment.country')" v-model="country"></pv-input-text>
          </div>
          <div class="separator-container">
            <pv-input-text :placeholder="$t('payment.floor')" v-model="floor"></pv-input-text>
            <pv-input-text :placeholder="$t('payment.province')" v-model="province"></pv-input-text>
          </div>
          <div class="separator-container">
            <pv-input-text :placeholder="$t('payment.postalCode')" v-model="postalCode"></pv-input-text>
            <pv-input-text :placeholder="$t('payment.phoneNumber')" v-model="phoneNumber"></pv-input-text>
          </div>
        </div>

        <div class="payment-method-container">
          <h1>{{ $t('payment.paymentMethod') }}</h1>
          <h5>{{ $t('payment.description') }}</h5>
          <pv-input-text :placeholder="$t('payment.cardNumber')" v-model="cardNumber"></pv-input-text>
          <!--ExpirationDate-->
          <pv-expiration-date :placeholder="$t('payment.expirationDate')" show-icon v-model="expirationDate"
                              view="month" date-format="mm/yy" :min-date="minDate" :max-date="maxDate"
                              :manual-input="false"></pv-expiration-date>
          <pv-input-text :placeholder="$t('payment.cvv')" v-model="cvv"></pv-input-text>
        </div>

        <div class="button-complete-payment-container">
          <pv-button @click="validatePayment()">{{ $t('payment.paymentMethod') }}</pv-button>
        </div>
      </div>
    </template>
  </pv-card>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.contact-fields {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.address-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.separator-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 3rem;
}

.payment-method-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
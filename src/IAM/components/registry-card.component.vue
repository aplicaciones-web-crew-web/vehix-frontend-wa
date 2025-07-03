<script>

import {UsersApiService} from "../services/users-api.service.js";
import AlertCard from "../../shared/components/alert-card.component.vue";
import {isNumeric} from "../../shared/utils/validation.util.js";
import {isValidEmail} from "../../shared/utils/validation.util.js";
import {UserAssembler} from "../services/user.assembler.js";

export default {
  name: "registry-card",
  components: {AlertCard},
  emits: ['toggle-mode'],
  data() {
    return {
      dni: '',
      password: '',
      name: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      gender: '',
      userApiService: null,
      currentAlert: null,
      users: [],
    }
  },
  /**
   * @description Fetches all users from the user service and initializes the users array.
   * @summary This method is called when the component is created.
   * @author U202318274 Julca Minaya Sergio Gino
   */
  created() {
    this.userApiService = new UsersApiService();
    this.userApiService.getAll().then(response => {
      this.users = UserAssembler.toEntitiesFromResponse(response);
      console.log("Users loaded successfully: ", this.users);
    }).catch(error => {
      console.error("User data loading error: ", error);
      this.displayAlert("Conection Error", "Failed to load user data. Please try again later.", "error");
    });
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

    /**
     * @description Validates that all required fields are filled and that the email, phone number, and DNI are in the correct format.
     * This method is called when the user clicks the "Register" button.
     * @returns {boolean}
     */
    validateFilledFields() {
      if (this.dni === '' || this.password === '' || this.name === '' || this.lastName === '' || this.email === '' || this.phoneNumber === '') {
        this.displayAlert("Empty fields", "Please complete all fields", "warn");
        return false;
      }
      if (!isValidEmail(this.email) || !isNumeric(this.phoneNumber)|| !isNumeric(this.dni)){
        this.displayAlert("Invalid values", "Check email, phone number or dni", "warn");
        return false;
      }
      return true;
    },

    /**
     * @summary Validates that the user does not already exist based on DNI or email.
     *  If a user with the same DNI or email exists, it displays an alert message.
     * @returns {boolean} - Returns true if the user does not exist, false otherwise.
     * @author U202318274 Julca Minaya Sergio Gino
     */
    validateUserNotExist() {
      const userExists = this.users.some(user => user.dni === this.dni || user.email === this.email);
      if (userExists) {
        this.displayAlert("User already exists", "Please try with another ID or email", "warn");
        return false;
      }
      return true
    },

    /**
     * @summary Validates the registration form and creates a new user if all validations pass.
     * This method is called when the user clicks the "Register" button.
     * @author U202318274 Julca Minaya Sergio Gino
     */
    validateRegistry() {
      this.currentAlert = null;
      if (!this.validateFilledFields()) return;

      if (this.validateUserNotExist()) {
        const newUser = UserAssembler.toEntityFromResource({
          dni: this.dni,
          password: this.password,
          name: this.name,
          lastName: this.lastName,
          email: this.email,
          phoneNumber: this.phoneNumber,
          gender: this.gender,
        })
        this.userApiService.create(newUser).then(() => {
          this.displayAlert("Registration successful", `Welcome, ${newUser.name} ${newUser.lastName}!. Enter your credentials to validate your account.`, "success");
          this.resetFormData();
        }).catch(error => {
          console.error("Error during registration: ", error);
          this.displayAlert("Registration failed", "An error occurred during registration. Please try again.", "error");
        });
      }


    },
    /**
     * @summary Resets the form data to empty strings.
     * This method is called after a successful registration or when the form needs to be cleared.
     * @author U202318274 Julca Minaya Sergio Gino
     */
    resetFormData() {
      this.dni = '';
      this.password = '';
      this.name = '';
      this.lastName = '';
      this.email = '';
      this.phoneNumber = '';
      this.gender = '';
    },

    /**
     * @summary Emits an event to toggle between login and registration modes.
     * This method is called when the user clicks the "Already have an account?" button.
     * @author U202318274 Julca Minaya Sergio Gino
     */
    emitToggleMode() {
      this.$emit('toggle-mode');
    }
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
  <video autoplay loop muted playsinline class="video-background">
    <source src="https://preview.redd.it/hl0umqudjqaf1.gif?width=1920&format=mp4&s=953a6332be88407a82760aff925924fd1485c6be" type="video/mp4">
    Tu navegador no soporta el video.
  </video>
  <div class="registry-container">

    <pv-card class="registry-card" style="background: rgba(255,255,255,0.52)">
      <template #title><h1>VEHIX</h1></template>
      <template #subtitle><h1> {{ $t('register.title') }}</h1>
      </template>
      <template #content>
        <div class="form-fields registry-fields">
          <pv-input-text :placeholder="$t('register.name')" v-model="name"></pv-input-text>
          <pv-input-text :placeholder="$t('register.lastName')" v-model="lastName"></pv-input-text>
          <pv-input-text :placeholder="$t('register.email')" v-model="email" type="email"></pv-input-text>
          <pv-input-text :placeholder="$t('register.password')" type="password" v-model="password"></pv-input-text>
          <pv-input-text :placeholder="$t('register.phoneNumber')" v-model="phoneNumber" type="tel"></pv-input-text>
          <pv-input-text :placeholder="$t('register.dni')" v-model="dni"></pv-input-text>
          <div class="gender-container">
            Gender: {{ $t('register.genderMale') }} <pv-radio-button v-model="gender" name="male" value="male"/> {{ $t('register.genderFemale') }} <pv-radio-button v-model="gender" name="female" value="female"/>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="buttons-container">
          <pv-button :label="$t('register.registerButton')" @click="validateRegistry()"></pv-button>

          <pv-button :label="$t('register.alreadyHaveAccount')" @click="emitToggleMode"></pv-button>
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
.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.6;
}
.registry-container {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}

.registry-card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1;

}

.registry-fields {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
}

.buttons-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
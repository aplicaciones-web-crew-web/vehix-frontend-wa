<script>
import {UsersApiService} from "../services/users-api.service.js";
import AlertCard from "../../shared/components/alert-card.component.vue";
import {UserAssembler} from "../services/user.assembler.js"; // Asegúrate de que el path sea correcto
import {isNumeric} from "../../shared/utils/validation.util.js";
import {UserSessionService} from "../../shared/services/user-session.service.js";

export default {
  name: "log-in-card",
  components: {AlertCard},
  emits: ['toggle-mode'],
  data() {
    return {
      dni: '',
      password: '',
      users: [],
      userService: null,
      currentAlert: null,
    }
  },
  /**
   * Fetches all users from the user service and initializes the users array.
   * This method is called when the component is created.
   * @author U202318274 Julca Minaya Sergio Gino
   */
  created() {
    this.userService = new UsersApiService();
    this.userService.getAll().then(response => {
      this.users = UserAssembler.toEntitiesFromResponse(response);
      console.log("Users loaded successfully:", this.users);
    }).catch(error => {
      console.error("User data loading error: ", error);
      this.displayAlert("Error", "Failed to load user data. Please try again later.", "error");
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
     * Validates that the filled fields are not empty.
     * If any field is empty, it displays an alert message.
     * @returns {boolean} - Returns true if all fields are filled, false otherwise.
     * @author U202318274 Julca Minaya Sergio Gino
     */
    validateFilledFields(){
      if (this.dni === '' || this.password === '') {
        this.displayAlert("Empty fields", "Please complete all fields", "warn");
        return false;
      }
      if (!isNumeric(this.dni)) {
        this.displayAlert("Empty fields", "Please complete ID with only numbers", "warn");
        return false;
      }
      return true;
    },

    /**
     * Handles the login process by validating credentials.
     * It checks if the provided DNI and password match any user in the users array.
     * @author U202318274 Julca Minaya Sergio Gino
     */
    validateLogin(){
      this.currentAlert = null;
      if (!this.validateFilledFields()) { return;}
      const foundUser = this.users.find( user => user.dni === this.dni && user.password === this.password);

      if (foundUser) {
        this.displayAlert("Succesfull login", `Welcome back, ${foundUser.name} ${foundUser.lastName}!`, "success");
        console.log('Logged in user ', foundUser);

        UserSessionService.setUserId(foundUser.id)

        setTimeout(() => {
          this.$router.push('/subscriptions');
        }, 1500);

      } else {
        this.displayAlert("Invalid credentials", "Incorrect ID or password. Please verify your details", "error");
        console.log('Login failed for user with DNI:', this.dni);
      }
    },

    /**
     * @summary Emits an event to toggle between login and registration modes.
     * This method is called when the user clicks the "Register" button.
     * @author U202318274 Julca Minaya Sergio Gino
     */
    emitToggleMode() {
      this.$emit('toggle-mode');
    }
  },
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
  <div v-if="currentAlert" class="modal-overlay"></div> <div class="login-container">

  <video autoplay loop muted playsinline class="video-background">
    <source src="https://packaged-media.redd.it/biq46suadqaf1/pb/m2-res_360p.mp4?m=DASHPlaylist.mpd&v=1&e=1751594400&s=b7e7d28c0042e41351ee23c8f06328ac577529fe" type="video/mp4">
    Your navigator does not support the video tag.
  </video>
  <pv-card class="login-card" style="background: rgba(255, 255, 255, 0.3);">
    <template #title>

      <h1>VEHIX</h1>
    </template>
    <template #subtitle><h1> {{ $t('login.title') }}</h1></template>
    <template #content>
      <div class="form-fields login-fields">
        <pv-input-text :placeholder="$t('login.dni')" v-model="dni"></pv-input-text>
        <pv-input-text :placeholder="$t('login.password')" type="password" v-model="password"></pv-input-text>
      </div>
    </template>
    <template #footer>
      <div class="buttons-container">
        <pv-button :label="$t('login.loginButton')" @click="validateLogin()" style="color: white"></pv-button>
        <pv-button :label="$t('login.registerButton')" @click="emitToggleMode()"></pv-button>
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

.login-container {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
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



.login-card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1;
}

.form-fields {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
}

.buttons-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  transition: opacity 0.3s ease;
}
</style>
<script>

import {VehicleSessionService} from "../../shared/services/vehicle-session.service.js";
import AlertCard from "../../shared/components/alert-card.component.vue";
import {SystemCheckService} from "../services/system-check.service.js";

export default {
  name: "scan",
  components: {AlertCard},
  props: {
    showScannedResults: {
      type: Boolean,
      default: false
    },
    vehicleImage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      vehicleId: 0,
      currentAlert: null,
      systemCheckService: null,

    };
  },
  created() {
    this.vehicleId = VehicleSessionService.getVehicleId();
    this.systemCheckService = new SystemCheckService();
    console.log(this.vehicleImage);
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

    getRandomEngine() {
      return Math.floor(Math.random() * 100) + 1;
    },

    getRandomTransmission() {
      return Math.floor(Math.random() * 100) + 1;
    },

    getRandomBrakes() {
      return Math.floor(Math.random() * 100) + 1;
    },
    getRandomElectrical() {
      return Math.floor(Math.random() * 100) + 1;
    },
    getRandomSteering() {
      return Math.floor(Math.random() * 100) + 1;
    },
    getRandomSuspension() {
      return Math.floor(Math.random() * 100) + 1;
    },
    getRandomFuel() {
      return Math.floor(Math.random() * 100) + 1;
    },
    getRandomRefrigeration() {
      return Math.floor(Math.random() * 100) + 1;
    },
    async validateTapToScan() {
      if (!this.showScannedResults) {
        this.displayAlert("Error", "NO VEHICLE WAS SCANNED", "error");
        return;
      }


      try {
        const response = await this.systemCheckService.getByVehicleId(this.vehicleId);
        const existingChecks = response.data;

        if (existingChecks.length > 0) {
          const existingCheck = existingChecks[0];
          const newStatusCheck = {
            vehicleId: parseInt(this.vehicleId),
            engine: this.getRandomEngine(),
            transmission: this.getRandomRefrigeration(),
            brakes: this.getRandomBrakes(),
            electrical: this.getRandomElectrical(),
            steering: this.getRandomSteering(),
            suspension: this.getRandomSuspension(),
            fuel: this.getRandomFuel(),
            refrigeration: this.getRandomRefrigeration()
          };
          await this.systemCheckService.update(existingCheck.id, newStatusCheck);
          console.log("SystemCheck updated:", existingCheck.id);
        } else {

          await this.systemCheckService.create(newStatusCheck);
          console.log("✔ SystemCheck created");
        }

        this.redirectTo("/maintenance/failures");
      } catch (error) {
        console.error("Error updating the systemcheck: ", error);
      }
    },

    redirectTo(path) {
      this.$router.push(path);
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
  <div class="scan-main-container">
    <div class="tap-scan-container" @click="validateTapToScan()">
      <div class="outer-circle">
        <div class="inner-circle">
          {{ $t('diagnostic.tapToScan') }}
        </div>
      </div>
    </div>
    <div class="img" v-if="vehicleId">
      <img width="700px" :src="vehicleImage">
    </div>
  </div>

</template>

<style>
.scan-main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50vw;
  gap: 1rem;
}

.img {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.outer-circle {
  width: 270px;
  height: 270px;
  border: 8px solid black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.inner-circle {
  width: 250px;
  height: 250px;
  background-color: black;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.outer-circle:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
}

.outer-circle:hover .inner-circle {
  background-color: white;
  color: black;
}


</style>
<script>
import LoadingSpinner from "../../shared/components/loading-spinner.component.vue";
import {UserSessionService} from "../../shared/services/user-session.service.js";
import AlertCard from "../../shared/components/alert-card.component.vue";

export default {
  name: "vehicle-item-create",
  components: {AlertCard, LoadingSpinner},
  props: {
    carsImagesApi: {
      type: Object,
      default: null
    },
    vehicles: {
      type: Array,
      default: null
    },
    carsBrandsApi: {
      type: Object,
      default: null
    },
    vehicleService: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      query: '',
      loading: false,
      userId: 0,
      vehicleImageLink: '',
      vehicleName: '',
      carBrands: [
        'toyota', 'honda', 'nissan', 'ford', 'chevrolet', 'kia', 'hyundai', 'mazda', 'bmw',
        'mercedes-benz', 'audi', 'volkswagen', 'subaru', 'jeep', 'dodge', 'gmc', 'ram',
        'lexus', 'volvo', 'porsche', 'jaguar', 'land rover', 'fiat', 'mitsubishi', 'tesla', 'cadillac'
      ],
      currentAlert: null
    };
  },
  created() {
    this.loading = true;
    this.userId = UserSessionService.getUserId();
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
     * @summary This method generates a random brand from the predefined list of car brands.
     * @description The brand is selected randomly from the `carBrands` array.
     * @return {string} A string representing the random car brand.
     * @author u202318274 Julca Minaya Sergio Gino
     */
    getRandomBrand() {
      const index = Math.floor(Math.random() * this.carBrands.length);
      return (this.carBrands[index]).toString();
    },

    /**
     * @summary This method generates a random year for the vehicle.
     * @description The year is a random number between 2000 and the current year.
     * @return {string} A string representing the random year.
     * @author u202318274 Julca Minaya Sergio Gino
     */
    getRandomYear() {
      const currentYear = new Date().getFullYear();
      return (Math.floor(Math.random() * (currentYear - 2000 + 1)) + 2000).toString();
    },

    /**
     * @summary This method generates a random mileage for the vehicle.
     * @description The mileage is a random number between 1000 and 200000.
     * @return {string} A string representing the random mileage.
     * @author u202318274 Julca Minaya Sergio Gino
     */
    getRandomMileage() {
      return (Math.floor(Math.random() * (200000 - 1000 + 1)) + 1000).toString();
    },

    /**
     * @summary This method retrieves random vehicle information to search for images.
     * @param attempt
     * @param maxAttempts
     * @return {Promise<null|{brand: *, model: *, year: *}|*>}
     * @author u202318274 Julca Minaya Sergio Gino
     */
    async getRandomVehicleInformationToSearch(attempt = 1, maxAttempts = 10) {
      const brand = this.getRandomBrand();
      const year = this.getRandomYear();
      const vehicles = await this.carsBrandsApi.getCarsByMake(brand, year);


      if (vehicles && vehicles.length > 0) {
        const random = vehicles[Math.floor(Math.random() * vehicles.length)];
        return {
          brand: random.make,
          model: random.model,
          year: random.year
        };
      } else {
        console.log(`🔁 Attempt ${attempt}: No vehicles found for brand: ${brand} and year: ${year}. Retrying...`);
        if (attempt < maxAttempts) {
          return this.getRandomVehicleInformationToSearch(attempt + 1, maxAttempts);
        } else {
          console.warn(`❌ No vehicles found for brand: ${brand} and year: ${year} after ${maxAttempts} attempts.`);
          return null;
        }
      }
    },

    /**
     * @summary This method searches for vehicle images based on the vehicle name.
     * @description It retrieves random vehicle information, constructs a query, and fetches images from the `carsImagesApi` service.
     * @param {string} vehicleName - The name of the vehicle to search for images.
     * @author u202318274 Julca Minaya Sergio Gino
     */
    async searchVehiclesImages() {
      this.loading = true;

      if (!this.vehicleName) return;
      try {
        const vehicle = await this.getRandomVehicleInformationToSearch();

        if (!vehicle) {
          this.vehicleImageLink = '';
          this.displayAlert("Please try again", "The vehicle was not found", "error");
          this.loading = true;
          this.vehicleName = '';
          return;
        }

        this.query = `${vehicle.brand} ${vehicle.model}` + " png";

        console.log(this.query);
        const response = await this.carsImagesApi.searchImageCar(this.query);
        const items = response.data.items || [];

        if (items.length > 0) {
          this.vehicleImageLink = items[0].link;
          const vehicleGeneric = {
            userId: parseInt(this.userId),
            description: this.vehicleName,
            name: this.vehicleName,
            brand: vehicle.brand,
            model: vehicle.model,
            mileage: this.getRandomMileage(),
            year: vehicle.year,
            image: this.vehicleImageLink,
          };
          this.$emit('submit', vehicleGeneric);

        } else {
          this.vehicleImageLink = '';
          this.error = '' + 'Dont have images for this vehicle.';
        }


      } catch (err) {
        this.vehicleImageLink = '';
        this.displayAlert("Please try again", "The vehicle was not found", "error");
        this.loading = true;
        this.vehicleName = '';
      } finally {
        this.displayAlert("Vehicle created", "The vehicle was created successfully", "success");
        this.loading = false;
        this.vehicleName = '';
      }

    },
  },
};
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
  <div class="vehicle-item-create-main-container">
    <pv-card class="vehicle-card">
      <template #title class="card-vehicle-item">
        <loading-spinner v-if="loading" :visible="loading"></loading-spinner>
        <div class="card-vehicle-item-container" v-else>
          <img :src="vehicleImageLink"
               width="100%">
        </div>
        <div class="input-card-vehicle-name">
        <pv-input-text v-model="vehicleName" :placeholder="$t('vehicleRegistration.vehicleName')"></pv-input-text>
        <pv-button @click="searchVehiclesImages()">EnterName</pv-button>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style>
.card-vehicle-item{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.input-card-vehicle-name{
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.vehicle-item-create-main-container{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 65px);
}
.vehicle-card{
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>

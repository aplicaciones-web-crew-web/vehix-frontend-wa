<script>

import Scan from "../components/scan.component.vue";
import {VehicleSessionService} from "../../shared/services/vehicle-session.service.js";
import {VehicleService} from "../../assets-and-resources-management/services/vehicle.service.js";

export default {
  name: "maintenance-management",
  components: {Scan},
  data() {
    return {
      vehicleId: null,
      vehicleService: null,
      vehicleImage: '',
      showScannedResults: false,
      showPredictiveAnalysis: false,
    };
  },
  created() {

    this.vehicleId = VehicleSessionService.getVehicleId();
    this.showScannedResults = !!this.vehicleId;
    this.showPredictiveAnalysis = !!this.vehicleId;
    this.vehicleService = new VehicleService();
    this.vehicleService.getById(this.vehicleId).then(response => {
      this.vehicleImage = response.data.image;
      console.log(this.vehicleImage);
    }).catch(error => {
      console.error("Error fetching vehicle data:", error);
    });
  },

  methods: {}

}
</script>

<template>
  <div class="maintenance-management-container">
    <div class="analysis-container">
      <p>lorem*5dsakdasnjidasnjidasnjioasdinjasdnuidas<br>dasjinasdnjasddoasodnas<br></p>
    </div>
    <div class="scan-container">
      <scan
          :showScannedResults="showScannedResults"
          :vehicleImage="vehicleImage">
      </scan>
    </div>
  </div>
</template>

<style>
.maintenance-management-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.analysis-container{
  width: 40vw;
}

.scan-container{
  width: 60vw;
}
</style>
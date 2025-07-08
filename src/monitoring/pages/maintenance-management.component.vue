<script>

import Scan from "../components/scan.component.vue";
import {VehicleSessionService} from "../../shared/services/vehicle-session.service.js";
import {VehicleService} from "../../ASM/services/vehicle.service.js";
import Analysis from "../components/analysis.component.vue";
import {SystemCheckService} from "../services/system-check.service.js";

export default {
  name: "maintenance-management",
  components: {Analysis, Scan},
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
      <analysis></analysis>
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
.maintenance-management-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
  width: 100vw;

}

.analysis-container {
  width: 40vw;
  height: calc(100vh - 65px);
}

.scan-container {
  display: flex;
  width: 60vw;
  height: calc(100vh - 65px);
  justify-content: center;
  align-items: center;

}
</style>
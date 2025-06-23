<script>

import Scan from "../components/scan.component.vue";
import {VehicleSessionService} from "../../shared/services/vehicle-session.service.js";

export default {
  name: "scan-management",
  components: {Scan},
  data() {
    return {
      vehicleId: null,
      showScannedResults: false,
      showPredictiveAnalysis: false,
    };
  },
  created() {

    this.vehicleId = VehicleSessionService.getVehicleId();
    console.log("ID del vehículo obtenido de la sesión:", this.vehicleId);
    this.showScannedResults = !!this.vehicleId;
    this.showPredictiveAnalysis = !!this.vehicleId;
    console.log("Estado de showScannedResults:", this.showScannedResults);
    console.log("Estado de showPredictiveAnalysis:", this.showPredictiveAnalysis);

  },

  methods:{
  }

}
</script>

<template>
  <scan
      :showScannedResults="showScannedResults">
  </scan>
</template>

<style scoped>

</style>
<script>
import Analysis from "../components/analysis.component.vue";
import Scan from "../components/scan.component.vue";
import {VehicleSessionService} from "../../shared/services/vehicle-session.service.js";
import {VehicleService} from "../../assets-and-resources-management/services/vehicle.service.js";
import {BadPracticeService} from "../services/bad-practice.service.js";
import {OdbErrorService} from "../services/odb-error.service.js";

export default {
  name: "failures-management",
  components: {Analysis, Scan},
  data() {
    return {
      vehicleId: null,
      vehicleImage: '',
      vehicleService: null,
      badPracticeService: null,
      odbErrorService: null,
      failureService: null,

      vehicleFailures: null,
    };
  },
  created(){
    this.vehicleId=VehicleSessionService.getVehicleId();
    if(!this.vehicleId) this.$router.push("/login");

    this.vehicleService = new VehicleService();
    this.badPracticeService = new BadPracticeService();
    this.odbErrorService = new OdbErrorService();


  }

}
</script>

<template>

</template>

<style>

</style>
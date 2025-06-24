<script>

import {VehicleSessionService} from "../../shared/services/vehicle-session.service.js";
import {VehicleFailureService} from "../services/vehicle-failure.service.js";
import {FailureService} from "../services/failure.service.js";
import {VehicleAssembler} from "../../assets-and-resources-management/services/vehicle.assembler.js";
import {FailureAssembler} from "../services/failure.assembler.js";
import {Button as PvButton} from "primevue";
import {VehicleFailureAssembler} from "../services/vehicle-failure.assembler.js";
import {Vehicle} from "../../assets-and-resources-management/model/vehicle.entity.js";
import {VehicleFailure} from "../model/vehicle-failure.entity.js";

export default {
  name: "failures-management",
  components: {PvButton},
  data() {
    return {
      vehicleId: null,
      vehicleImage: '',

      failureService: null,

      vehicleFailureService: null,

      vehicleFailures: [],
      failures: [],
      failuresId: [],
      vehicleFailuresIds: [],
    };
  },
  created() {
    this.vehicleId = VehicleSessionService.getVehicleId();
    if (!this.vehicleId) this.$router.push("/login");


    this.failureService = new FailureService();
    this.vehicleFailureService = new VehicleFailureService();

    this.loadVehiclesFailures();
    this.loadVehicleFailuresId();
  },
  methods: {


    async loadVehiclesFailures() {
      try {
        const response = await this.vehicleFailureService.getAll();
        this.vehicleFailures = VehicleFailureAssembler.toEntitiesFromResponse(response);
        console.log("VehiclesFailures loaded successfully:", this.vehicleFailures);
      } catch (error) {
        console.error("Error loading VehiclesFailures: ", error);
      }
    },

    /**
     * @summary Return failuresId of the vehicle Failures
     * @return {Array} Array of failures objects
     * @author U202318274 Julca Minaya Sergio Gino
     */
    async loadVehicleFailuresId() {
      this.vehicleFailureService.getByVehicleId(this.vehicleId).then(response => {
        this.vehicleFailures = VehicleFailureAssembler.toEntitiesFromResponse(response);
        this.vehicleFailuresIds = this.vehicleFailures.map(vf => vf.failureId);
      }).catch(error => {
        console.error("Error loading vehicle failures: ", error);
      });
    },

    /**
     * Get Failures In pending of the current vehicle
     * @returns {Promise<void>}
     */
    async getFailuresInPendingOfCurrentVehicle(){
    }
  }


}
</script>

<template>

  <pv-button @click="getVehicleFailuresIds()">Dale click para tener las fallas</pv-button>
</template>

<style>

</style>
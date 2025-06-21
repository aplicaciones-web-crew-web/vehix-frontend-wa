<script>

import {VehicleService} from "../services/vehicle.service.js";
import {CarsImagesApiService} from "../services/cars-images-api.service.js";
import {VehicleAssembler} from "../services/vehicle.assembler.js";
import {CarsBrandsApiService} from "../services/cars-brands-api.service.js";
import VehicleItemCreate from "../components/vehicle-item-create.component.vue";
import {VehicleSessionService} from "../../shared/services/vehicle-session.service.js";

export default {
  name: "vehicle-registration-management",
  components: {VehicleItemCreate},
  data() {
    return {
      vehicleService: null,
      carsImagesApiService: null,
      carsBrandsApiService: null,
      vehicles: [],
    }
  },
  created() {
    this.vehicleService = new VehicleService();
    this.loadVehicles();
    this.carsBrandsApiService = new CarsBrandsApiService()
    this.carsImagesApiService = new CarsImagesApiService();
  },
  methods: {
    async loadVehicles() {
      try {
        const response = await this.vehicleService.getAll();
        this.vehicles = VehicleAssembler.toEntitiesFromResponse(response);
        console.log("Vehicles loaded successfully:", this.vehicles);
      } catch (error) {
        console.error("Error loading vehicles: ", error);
      }
    },

    async handleVehicleCreated(vehicleData) {
      try {
        const newVehicle = VehicleAssembler.toEntityFromResource(vehicleData);

        const createdVehicleResponse = await this.vehicleService.create(newVehicle);
        const createdVehicleWithId = VehicleAssembler.toEntityFromResource(createdVehicleResponse.data);
        VehicleSessionService.setVehicleId(createdVehicleWithId.id);
        this.vehicles.push(createdVehicleWithId);
      } catch (error) {
        console.log("Error making vehicle: ", error)
      }
    }
  }
}
</script>

<template>
  <vehicle-item-create
      :cars-images-api="carsImagesApiService"
      :vehicles="vehicles"
      :cars-brands-api="carsBrandsApiService"
      :vehicle-service="vehicleService"
      @submit="handleVehicleCreated">
  </vehicle-item-create>
</template>

<style>

</style>
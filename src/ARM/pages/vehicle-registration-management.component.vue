<script>

import {VehicleService} from "../services/vehicle.service.js";
import {CarsImagesApiService} from "../services/cars-images-api.service.js";
import {VehicleAssembler} from "../services/vehicle.assembler.js";
import {CarsBrandsApiService} from "../services/cars-brands-api.service.js";
import VehicleItemCreate from "../components/vehicle-item-create.component.vue";

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
    this.vehicleService.getAll().then((response) => {
      this.vehicles = VehicleAssembler.toEntitiesFromResponse(response);
    }).catch((error) => {
      console.error("Error loading vehicles: ", error);
    });
    this.carsBrandsApiService = new CarsBrandsApiService()
    this.carsImagesApiService = new CarsImagesApiService();
  },
  methods: {

    handleVehicleCreated(vehicleData) {
      try {
        const newVehicle = VehicleAssembler.toEntityFromResource(vehicleData);
        console.log(newVehicle);
        this.vehicleService.create(newVehicle);
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
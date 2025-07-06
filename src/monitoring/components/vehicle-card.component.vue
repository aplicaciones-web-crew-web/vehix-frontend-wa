<script>

import {VehicleSessionService} from "../../shared/services/vehicle-session.service.js";
import {VehicleService} from "../../ASM/services/vehicle.service.js";

export default {
  name: "vehicle-card",
  data() {
    return {
      vehicleId: 0,
      vehicleImage: null,
      vehicleName: "",
      vehicleService: null,
    };
  },
  async created() {
    this.vehicleId = VehicleSessionService.getVehicleId();
    this.vehicleService = new VehicleService();
    this.vehicleService.getById(this.vehicleId).then(async response => {
      this.vehicleImage = await response.data.image;
      this.vehicleName = await response.data.name;
      console.log(this.vehicleImage);
    }).catch(error => {
      console.error("Error fetching vehicle data:", error);
    });
  },
  methods: {}
}
</script>

<template>
  <div class="main-container-card">
    <div class="avatar">
      <span style="--i:0;"></span>
      <span style="--i:1;"></span>
      <span style="--i:2;"></span>
    </div>

    <div class="vehicle-image-card">
      <img width="700px" :src="vehicleImage" alt="Vehicle Image" class="vehicle-image" />
      <p>{{ vehicleName }}</p>
      <p>Urgency Level</p>
      <p>🔴Critical  🟠 Moderate  🟢Mild</p>
    </div>
  </div>
</template>

<style>

.main-container-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}



.vehicle-image-card p{
  text-align: center;
}


.vehicle-image-card {
  display: flex;
  flex-direction: column;
  align-items: center;

}

.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: relative;
  background-color: #ccc;

}

.avatar span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: inherit;
  border-radius: inherit;
  opacity: .8;
  animation: pulseAnimate 4s ease-out infinite;
  animation-delay: calc(var(--i) * 1s);

}

@keyframes pulseAnimate {
  100% {
    opacity: 0;
    transform: scale(1.4);
  }
}
</style>
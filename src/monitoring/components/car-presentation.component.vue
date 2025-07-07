<!-- src/components/car-presentation.vue -->
<script>
import {VehicleSessionService} from "../../shared/services/vehicle-session.service.js";
import {VehicleService} from "../../ASM/services/vehicle.service.js";
import {UserSessionService} from "../../shared/services/user-session.service.js";

const userName = "Vitaly Baca"
export default {
  name: "car-presentation",
  data() {
    return {
      userName: '',

      vehicleId: 0,
      userId: 0,

      vehicleService: null,
      vehicles: [],
      img: ""
    };
  },
  created() {
    this.userId = UserSessionService.getUserId();
    this.vehicleId = VehicleSessionService.getVehicleId();
    console.log("ID del vehículo de sesión:", this.vehicleId);
    this.vehicleService = new VehicleService();
    if (this.vehicleId) {
      this.vehicleService.getById(this.vehicleId).then(response => {
        this.img = response.data.image;
      }).catch(error => {
        console.error("Error loading vehicle: ", error);
      });
    }
  }
}
</script>

<template>
  <div class="car-status-container">
    <div class="car-content-wrapper">
      <div class="avatar-wrapper">
        <div class="avatar">
          <span style="--i:0;"></span>
          <span style="--i:1;"></span>
          <span style="--i:2;"></span>
        </div>
        <h2>{{ userName }}'s</h2>
        <img class="car-image" :src=this.img alt="Car image"/>
      </div>

      <div class="legend">
        <p class="legend-title">Urgency level</p>
        <div class="legend-items-wrapper">
          <div class="legend-item">
            <span class="dot red"></span>
            <span>Critical</span>
          </div>
          <div class="legend-item">
            <span class="dot yellow"></span>
            <span>Moderate</span>
          </div>
          <div class="legend-item">
            <span class="dot green"></span>
            <span>Mild</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.car-status-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.car-content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  padding: 20px;
  width: 300px;
}

.avatar-wrapper {
  position: relative;
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
  margin-bottom: 10px;
}

.car-image{
  width: 80%;
  height: 100%;
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
    transform: scale(2);
  }
}

.car-image {
  width: 250px;
  margin: 20px 0;
}

.legend {
  margin-top: 20px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.legend-title {
  font-size: 14px;
  color: gray;
}

.legend-items-wrapper {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.red {
  background-color: #ff6b6b;
}

.yellow {
  background-color: #ffe066;
}

.green {
  background-color: #51cf66;
}

</style>

<script>

import {VehicleSessionService} from "../../shared/services/vehicle-session.service.js";

export default {
  name: "scan",
  props: {
    vehicleImage: {
      type: String,
      default: ''
    }
  },
  methods: {
    goToMap() {
      this.$router.push('/mechanic');
    }
  }
}
</script>

<template>
  <div class="scan-main-container">
    <div class="tap-scan-container" @click="goToMap">
      <div class="outer-circle">
        <div class="inner-circle">
          {{ $t('diagnostic.tapToScan') }}
        </div>
      </div>
    </div>
    <div class="img">
      <img width="700px" :src="vehicleImage">
    </div>
  </div>
</template>

<style>
.scan-main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50vw;
  gap: 1rem;
}

.img {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.outer-circle {
  width: 270px;
  height: 270px;
  border: 8px solid black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.inner-circle {
  width: 250px;
  height: 250px;
  background-color: black;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.outer-circle:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
}

.outer-circle:hover .inner-circle {
  background-color: white;
  color: black;
}

</style>


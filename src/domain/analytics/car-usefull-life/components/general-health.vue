<script>
import { ref, onMounted } from 'vue'
import { Vehicle_lifeService } from '../services/vehicle_life.service.js'

export default {
  name: 'VehicleHealth',
  setup() {
    const health = ref(0)
    const ownerName = ref('Vitaly Baca')

    const service = new Vehicle_lifeService()
    onMounted(async () => {
      const data = await service.getAllVehicle(1)
      const vehicle = Array.isArray(data) ? data[0] : data
      health.value = vehicle.vehicleHealth
      ownerName.value = vehicle.owner
    })
    return {
      health,
      ownerName
    }
  }
}
</script>

<template>
  <div class="vehicle-health-container">
    <h2 class="title">Car useful life</h2>
    <p class="owner-name">{{ ownerName }} car</p>


    <img class="vehicle-img" src="/toyota-rush-car.png" alt="Car Image" />

    <h3>Vehicle health</h3>

    <div class="health-bar" :style="{ backgroundColor: healthColor }">
      <span class="health-text">VEHICLE HEALTH: {{ health }}%</span>
    </div>

    <p class="note">Note: This graph represents vehicle health in percentages terms.</p>
  </div>
</template>

<style scoped>
.vehicle-health-container {
  text-align: center;
  padding: 16px;
  background-color: white;
  border-radius: 12px;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.owner-name {
  font-size: 16px;
  margin-bottom: 20px;
  color: #444;
}

.vehicle-img {
  width: 100%;
  max-width: 400px;
  margin: 0 auto 24px;
  display: block;
}

.health-bar {
  background-color: black;
  color: white;
  font-weight: bold;
  padding: 12px;
  width: 80%;
  margin: 16px auto;
  border-radius: 6px;
}

.note {
  font-size: 12px;
  color: #555;
}
</style>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Vehicle_lifeService } from '../services/vehicle_life.service.js'

const lifeEstimate = ref(null)
const dashArray = 283

const vehicleService = new Vehicle_lifeService()

onMounted(async () => {
  const data = await vehicleService.getAllVehicle(1)
  const vehicle = Array.isArray(data) ? data[0] : data
  lifeEstimate.value = vehicle.lifeEstimate
})

const dashOffset = computed(() => {
  if (!lifeEstimate.value) return dashArray
  const percent = lifeEstimate.value.currentRemaining / lifeEstimate.value.maxYears
  return dashArray - (dashArray * percent)
})
</script>


<template>
  <div class="estimated-life">
    <h2 class="title">Estimated Life</h2>

    <p>
      Based on real-time data and historical trends, the current life estimate suggests that your vehicle has
      {{ lifeEstimate?.currentRemaining }} years of healthy operation remaining under the current driving habits.
    </p>

    <div class="gauge-container">
      <svg class="gauge" viewBox="0 0 200 100">
        <circle
            cx="100" cy="100" r="90"
            fill="none"
            stroke="#DBDBDB"
            stroke-width="15"
            stroke-dasharray="283"
            stroke-dashoffset="0"
            transform="rotate(-90 100 100)"
        />
        <circle
            cx="100" cy="100" r="90"
            fill="none"
            stroke="black"
            stroke-width="15"
            :stroke-dasharray="dashArray"
            :stroke-dashoffset="dashOffset"
            transform="rotate(-90 100 100)"
        />

        <text x="20" y="95" font-size="10">0 yr</text>
        <text x="180" y="95" font-size="10" text-anchor="end">{{ lifeEstimate?.maxYears }} yr</text>
        <text x="100" y="120" font-size="16" text-anchor="middle" font-weight="bold">
          {{ lifeEstimate?.estimatedYears }} years
        </text>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.estimated-life {
  background-color: white;
  color: black;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  padding: 24px;
  text-align: center;
}

.title {
  font-size: 22px;
  margin-bottom: 10px;
  font-weight: bold;
}

.gauge-container {
  margin-top: 20px;
  position: relative;
}

.gauge {
  width: 70%;
  max-width: 300px;
  margin: 0 auto;
}

.life-value {
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
}
</style>
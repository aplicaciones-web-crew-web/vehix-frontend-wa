<script setup>
import { ref, onMounted } from 'vue'
import SystemStatusItem from '../components/system-status-item.vue'
import FailureItem from '../components/failure-item.vue'
import BtnGenerateReport from '../components/btn-generate-report.vue'

import { FailureService } from '../services/failure.service.js'
import { StatusService } from '../services/status.service.js'

const failures = ref([])
const systems = ref([])

const failureService = new FailureService()
const statusService = new StatusService()

onMounted(async () => {
  const vehicleId = 1
  failures.value = await failureService.getAllFailures(vehicleId)

  const status = await statusService.getStatusServices(vehicleId)
  systems.value = [
    { name: 'Engine System', percentage: status.engine },
    { name: 'Transmission System', percentage: status.transmission },
    { name: 'Brake System', percentage: status.brakes },
    { name: 'Electrical system', percentage: status.electrical },
    { name: 'Steering System', percentage: status.steering },
    { name: 'Suspension System', percentage: status.suspension },
    { name: 'Fuel System', percentage: status.fuel },
    { name: 'Refrigeration system', percentage: status.refrigeration }
  ]
})
</script>


<template>
  <div class="audit-page-wrapper">
    <!-- Columna izquierda -->
    <div class="left-column">
      <h2>Audit of failures</h2>
      <img class="car-image" src="/toyota-rush-car.png" alt="Car image" />
      <h3>Principles Systems</h3>
      <div class="status-grid">
        <SystemStatusItem
            v-for="(system, index) in systems"
            :key="index"
            :systemName="system.name"
            :percentage="system.percentage"
        />
      </div>
    </div>

    <!-- Columna derecha -->
    <div class="right-column">
      <h2>Audit of failures</h2>
      <div class="failures-container">
        <FailureItem
            v-for="failure in failures"
            :key="failure.id"
            :title="failure.title"
            :description="failure.description"
            :solution="failure.solutions"
            :isSolved="failure.isSolved"
        />
      </div>
      <BtnGenerateReport />
    </div>
  </div>
</template>


<style scoped>
.audit-page-wrapper {
  display: flex;
  color: black;
  justify-content: center;
  padding: 2rem;
  gap: 5rem;
  font-family: 'Montserrat', sans-serif;
}

.left-column {
  flex: 1;
  max-width: 450px;
  text-align: center;
}

.car-image {
  width: 100%;
  max-width: 300px;
  margin-bottom: 2rem;
}

.status-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  justify-items: center;
  margin-top: 2rem;
}

.right-column {
  flex: 2;
}

.failures-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  margin-bottom: 2rem;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import { StatusService } from '../services/status.service.js'
import SystemStatusItem from './system-status-item.vue'

const systems = ref([])
const statusService = new StatusService()

onMounted(async () => {
  const vehicleId = 1
  const status = await statusService.getStatusServices(vehicleId)
  systems.value = [
    { name: 'Engine System', percentage: status.engine },
    { name: 'Transmission System', percentage: status.transmission },
    { name: 'Brake System', percentage: status.brakes },
    { name: 'Electrical System', percentage: status.electrical },
    { name: 'Steering System', percentage: status.steering },
    { name: 'Suspension System', percentage: status.suspension },
    { name: 'Fuel System', percentage: status.fuel },
    { name: 'Cooling System', percentage: status.refrigeration }
  ]
})
</script>

<template>
  <div class="status-container">
    <SystemStatusItem v-for="system in systems"
                      :key="system.name"
                      :systemName="system.name"
                      :percentage="system.percentage">
    </SystemStatusItem>
  </div>
</template>

<style scoped>
.status-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}
</style>

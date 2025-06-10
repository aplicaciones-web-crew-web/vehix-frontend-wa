<script setup lang="ts">
import GeneralHealth from '../components/general-health.vue'
import LifeEstimate from '../components/life-estimate.vue'
import MonthlyMileageTimeline from '../components/monthly-mileage-timeline.vue'
import { ArrowLeft } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => router.back()

</script>

<template>

  <div class="back-button" @click="goBack">
    <ArrowLeft/>
  </div>

  <div class="dashboard-container">
    <div class="left-panel">
      <GeneralHealth />
    </div>
    <div class="right-panel">
      <MonthlyMileageTimeline />
      <LifeEstimate />
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 24px;
  padding: 32px;
  flex-wrap: wrap;
}

.left-panel {
  flex: 1 1 45%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-panel {
  flex: 1 1 45%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
}

.back-button {
  color: black;
  padding: 8px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  margin-bottom: 12px;
  transition: transform 0.2s ease;
}

.back-button:hover {
  transform: scale(1.1);
}


</style>

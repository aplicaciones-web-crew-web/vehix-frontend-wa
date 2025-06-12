<script setup>
import { onMounted, ref } from 'vue'
import { Failure } from '../model/failure.entity.js'
import FailureItem from './failure-item.vue'
import BtnGenerateReport from './btn-generate-report.vue'
import { FailureService } from '../services/failure.service.js'

const failures = ref([])
const failureService = new FailureService()
onMounted(async () => {
  const vehicleId = 1
  const data = await failureService.getAllFailures(vehicleId)
  failures.value = data.map(f => new Failure(f))
})
</script>

<template>
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

  <div>
    <BtnGenerateReport />
  </div>
</template>

<style scoped>
.failures-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}
</style>

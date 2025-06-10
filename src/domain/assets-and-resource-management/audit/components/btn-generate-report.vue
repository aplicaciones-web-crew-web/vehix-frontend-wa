<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToReportPage() {
  router.push('/report')
}
</script>

<template>
  <button class="generate-btn" @click="goToReportPage">
    Generate report
  </button>
</template>

<style scoped>
.generate-btn {
  background-color: black;
  font-family: "Montserrat", sans-serif;
  color: white;
  font-weight: bold;
  font-size: 18px;
  padding: 14px 32px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.generate-btn:hover {
  background-color: #333;
}
</style>
<script setup>
import { ref, onMounted } from 'vue'
import { Vehicle_lifeService } from '../services/vehicle_life.service.js'

const mileageData = ref([])
const service = new Vehicle_lifeService()

onMounted(async () => {
  const data = await service.getAllVehicle(1)
  const vehicle = Array.isArray(data) ? data[0] : data
  mileageData.value = vehicle.monthlyMileage || []
})
</script>


<template>
  <div class="mileage-card">
    <div class="title">Monthly mileage timeline</div>

    <div class="timeline-line">
      <div class="dot" v-for="(item, index) in mileageData" :key="index" />
    </div>

    <div class="timeline-info">
      <div class="month" v-for="(item, index) in mileageData" :key="index">
        <div>{{ item.month }}</div>
        <div>{{ item.distance }} km</div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.mileage-card {
  padding: 20px;
  text-align: center;
  background-color: #DBDBDB;
  color: black;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
}

.timeline-line {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  border-top: 1px solid gray;
  height: 30px;
  margin-bottom: 12px;
}

.dot {
  width: 30px;
  height: 15px;
  background-color: black;
  border-radius: 50px;
  margin-top: -8px;
}

.timeline-info {
  display: flex;
  justify-content: space-around;
  text-align: center;
}

.month {
  font-size: 16px;
}

</style>

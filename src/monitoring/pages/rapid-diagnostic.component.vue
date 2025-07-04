<script setup>
import { ref, onMounted } from 'vue';
import { ReportService } from '../services/report.service.js';

const reportService = new ReportService();
const reports = ref([]);

const systems = [
  { label: 'Engine System', value: 75 },
  { label: 'Transmission System', value: 100 },
  { label: 'Brake System', value: 100 },
  { label: 'Electrical System', value: 61 },
  { label: 'Steering System', value: 100 },
  { label: 'Suspension System', value: 87 },
  { label: 'Fuel System', value: 87 },
  { label: 'Refrigeration System', value: 80 },
];

onMounted(async () => {
  try {
    const res = await reportService.getAll();
    reports.value = res.data.map(r => ({ ...r, solved: false }));
  } catch (e) {
    console.error(e);
  }
});

function toggleSolved(report) {
  report.solved = !report.solved;
}

function generateReport() {
  console.log('generate report');
}
</script>

<template>
  <div class="flex flex-col md:flex-row gap-6 p-4">
    <div class="md:w-1/2 space-y-4">
      <div class="bg-white p-4 flex justify-center">
        <img src="/toyota-rush-car.png" alt="Toyota Rush" class="max-w-full" />
      </div>
      <h2 class="text-center font-semibold mb-4">Principles Systems</h2>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="(sys, index) in systems" :key="index" class="flex items-center gap-2">
          <span class="flex-1">{{ sys.label }}</span>
          <svg viewBox="0 0 36 36" class="w-4 h-4">
            <path class="text-gray-300" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-width="3.8"/>
            <path class="text-gray-600" :stroke-dasharray="sys.value + ', 100'" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-width="3.8" stroke-linecap="round"/>
            <text x="18" y="20.35" class="text-xs" text-anchor="middle">{{ sys.value }}</text>
          </svg>
        </div>
      </div>
    </div>

    <div class="md:w-1/2 space-y-4">
      <h2 class="text-xl font-semibold">Audit of failures</h2>
      <div v-for="report in reports" :key="report.id" class="bg-gray-100 p-4 shadow relative rounded">
        <div class="absolute top-2 right-2 flex items-center">
          <input type="checkbox" v-model="report.solved" @change="toggleSolved(report)" class="mr-1">
          <span v-if="report.solved" class="text-green-600 text-xs">solved</span>
        </div>
        <h3 class="font-bold">{{ report.title }}</h3>
        <p class="mt-1">{{ report.description }}</p>
        <p class="mt-1"><strong>Suggested solution:</strong> {{ report.suggestedSolution }}</p>
        <div v-if="report.solved" class="mt-2">
          <input v-model="report.comment" class="border p-1 w-full" placeholder="Comment" />
        </div>
      </div>
      <button class="bg-black text-white px-4 py-2" @click="generateReport">Generate report</button>
    </div>
  </div>
</template>

<style scoped>
path { stroke: currentColor; }
</style>
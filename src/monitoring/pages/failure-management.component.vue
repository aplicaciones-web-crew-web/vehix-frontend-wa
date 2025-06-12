<template>
  <div>
    <h2>Gestión de Fallas</h2>
    <button @click="generateFailure">Generar Falla</button>

    <div v-if="failure" class="falla-card">
      <h3>{{ failure.simpleName }} {{ failure.emoji }}</h3>
      <p><strong>Código:</strong> {{ failure.technicalCode }}</p>
      <p><strong>Descripción:</strong> {{ failure.description }}</p>
      <p><strong>Severidad:</strong> {{ failure.severityLevel }}</p>
      <p><strong>Mala Práctica:</strong> {{ failure.badPractice }}</p>
      <p><strong>Solución:</strong> {{ failure.suggestSolution }}</p>
    </div>

    <div v-if="errorMessage" class="error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { generateRandomCarFailure } from '../services/fault-generator.service.js';

const failure = ref(null);
const errorMessage = ref('');

const generateFailure = async () => {
  try {
    errorMessage.value = '';
    failure.value = await generateRandomCarFailure();
  } catch (error) {
    errorMessage.value = error.message;
  }
};
</script>

<style scoped>
.falla-card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-top: 1rem;
  background-color: #f5f5f5;
}
.error {
  color: red;
  margin-top: 1rem;
}
</style>

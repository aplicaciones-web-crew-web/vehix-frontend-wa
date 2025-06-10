<script setup>
defineProps({
  failure: Object
});
</script>

<template>
  <div class="failure-card">
    <h3>{{ failure.simpleName }} ({{ failure.technicalCode }})</h3>
    <p>{{ failure.description }}</p>
    <p>Gravedad: {{ failure.severityLevel }} {{ failure.emoji }}</p>
    <p><strong>Mala práctica:</strong> {{ failure.badPractice }}</p>
    <p><strong>Solución sugerida:</strong> {{ failure.suggestSolution }}</p>
  </div>
</template>

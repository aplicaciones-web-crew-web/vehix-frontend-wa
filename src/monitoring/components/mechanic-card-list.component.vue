<script setup>
import MechanicCard from './mechanic-card.component.vue'
defineProps(['mechanics'])
</script>

<template>
  <div class="mechanic-list">
    <mechanic-card
        v-for="(mechanic, index) in mechanics"
        :key="index"
        :name="mechanic.name"
        :address="mechanic.vicinity"
        :distance="mechanic.distance"
        :phone="mechanic.phone"
    />
  </div>
</template>

<style scoped>
.mechanic-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 88vh; /* Limita la altura al tamaño de la pantalla */
  overflow-y: auto; /* Habilita el desplazamiento vertical */
  padding-right: 8px;
}
</style>
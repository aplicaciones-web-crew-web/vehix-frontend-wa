<script setup>
import { ref } from 'vue'


import MechanicMap from '../components/mechanic-map.component.vue'
import MechanicCardList from '../components/mechanic-card-list.component.vue'

const mechanics = ref([])
const updateMechanics = (newMechanics) => {
  mechanics.value = newMechanics.map((mechanic) => ({
    name: mechanic.name,
    vicinity: mechanic.vicinity,
    distance: mechanic.distance || 0,
    phone: mechanic.phone || 'No disponible',
  }))
}
</script>

<template>
  <div class="app">
    <h1 style="text-align: left"></h1>
    <div class="left-column">
      <div class="overlay-text">
        {{ $t('title') }}
      </div>
      <mechanic-map @update-mechanics="updateMechanics" />
    </div>
    <div class="right-column">
      <mechanic-card-list :mechanics="mechanics" />
      <button class="repair-button">{{ $t('button') }}</button>
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  width: 98vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.left-column {
  position: relative;
  width: 100%;
  width: 50vw;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.overlay-text {
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 8px;
  border-radius: 4px;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 22px;
  text-align: left;
  z-index: 1;
}
.right-column {
  flex: 1;
  min-width: 300px;
}
.repair-button {
  margin-top: 16px;
  padding: 12px 16px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 22px;
  text-align: center;
  width: 100%;
}
.repair-button:hover {
  background-color: #000000;
}

@media (min-width: 768px) {
  .left-column {
    width: 50%;
  }
  .right-column {
    width: 50%;
  }
}


@media (max-width: 480px) {
  .overlay-text {
    font-size: 18px;
  }
  .repair-button {
    font-size: 18px;
  }
  .app {
    flex-direction: column;
  }
  .left-column,
  .right-column {
    width: 100%;
  }
}
</style>
<script>

import {Button as PvButton} from "primevue";

export default {
  name: "devices-list",
  components: {PvButton},
  props: {
    vehicles: {
      type: Array,
      required: true

    }
  },
  methods:{
    carSelected(vehicle) {
      this.$emit('carSelected', vehicle);
    },
    newCarSelected(){
      this.$emit('newCarSelected');
    }
  }
}
</script>

<template>
  <div v-for="vehicle in vehicles" :key="vehicle.id" class="device-item">
    <pv-button @click="carSelected(vehicle)">{{ vehicle.name }} Scanner</pv-button>
  </div>
  <div>
    <pv-button @click="newCarSelected">New Vehicle Found</pv-button>
  </div>
</template>

<style>

</style>
<script>

import {Toolbar as PvToolbar} from "primevue";

export default {
  name: "toolbar-payment",
  components: {PvToolbar},
  props: {
    selectedPlan: {
      type: String,
      required: true
    },
  },
}
</script>

<template>
<pv-toolbar class="toolbar-container">
  <template #center>
    <h1>VEHIX</h1>
    <h3 v-if="selectedPlan==='Plan Standard'">{{$t('planStandard.phrase')}}</h3>
    <h3 v-else-if="selectedPlan==='Plan Pro'">{{$t('planPro.phrase')}}</h3>
  </template>
</pv-toolbar>
</template>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.toolbar-container {
  width: 100%;
}
</style>
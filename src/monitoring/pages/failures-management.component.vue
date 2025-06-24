<script>
import Analysis from "../components/analysis.component.vue";
import Scan from "../components/scan.component.vue";

export default {
  name: "failures-management",
  components: {Analysis, Scan},
  data() {
    return {
      vehicleId: null,
      vehicleImage: '',
      vehicleService: null,
      badPracticeService: null,
      odbErrorService: null,
      failureService: null
    };
  },

}
</script>

<template>

</template>

<style>

</style>
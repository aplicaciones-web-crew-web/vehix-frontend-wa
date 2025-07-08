<script>

export default {
  name: "vehicle-state",
  props: {
    vehicleFailures: {
      type: Array,
      required: true
    }
  },

  methods: {
    getVehicleState() {
      if (this.vehicleFailures.length === 0) {
        return 100;
      }

      console.log(this.vehicleFailures);
      const totalFailures = this.vehicleFailures.length;
      const criticalFailures = this.vehicleFailures.filter(vehicleFailure => vehicleFailure.status === 'Pending').length;
      const warningFailures = this.vehicleFailures.filter(vehicleFailure => vehicleFailure.status === 'Fixed').length;

      // Calculate the percentage of critical and warning failures
      const criticalPercentage = (criticalFailures / totalFailures) * 100;
      const warningPercentage = (warningFailures / totalFailures) * 100;

      // Calculate random the vehicle state as a percentage
      return criticalPercentage * 0.5 + warningPercentage * 0.3 + (100 - (criticalPercentage + warningPercentage)) * 0.2;
    }
  }
}
</script>

<template>
  <pv-knob
      :model-value="getVehicleState()"
      class="non-interactive-knob"
      :min="0"
      :max="100"
      :step="1"
      :size="150"
      value-color="black"
      range-color="#e0e0e0"
      text-color="black"
  />
</template>

<style>
.non-interactive-knob {
  pointer-events: none;
}
</style>
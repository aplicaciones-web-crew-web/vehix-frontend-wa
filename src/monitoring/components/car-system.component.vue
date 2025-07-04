<script>

export default {
  name: "car-system",
  props: {
    systemChecks: {
      type: Array,
      required: true
    }
  },
}
</script>

<template>
  <div class="car-system-container">
    <h3 class="title-car-system">Car System</h3>
    <div v-if="systemChecks.length === 0">
      No system checks available.
    </div>

    <div v-for="check in systemChecks" :key="check.id" class="system-check-item">
      <div class="car-engine">
        <div class="car-engine-title">
          <h3 class="title-car-system">{{ check.engine }}%</h3>
        </div>
        <div class="car-engine-graphic">
          <pv-knob :model-value="check.engine" class="non-interactive-knob-car" :min="0" :max="100" :step="1" :size="60"
                   value-color="black" range-color="#e0e0e0" text-color="black"/>
        </div>
      </div>
      <div class="car-engine">
        <div class="car-engine-title">
          <h3 class="title-car-system">{{ check.transmission }}%</h3>
        </div>
        <div class="car-engine-graphic">
          <pv-knob :model-value="check.transmission" class="non-interactive-knob-car" :min="0" :max="100" :step="1"
                   :size="60"
                   value-color="black" range-color="#e0e0e0" text-color="black"/>
        </div>
      </div>
      <div class="car-engine">
        <div class="car-engine-title">

          <h3 class="title-car-system">{{ check.brake }}%</h3>
        </div>
        <div class="car-engine-graphic">
          <pv-knob :model-value="check.brake" class="non-interactive-knob-car" :min="0" :max="100" :step="1" :size="60"
                   value-color="black" range-color="#e0e0e0" text-color="black"/>
        </div>
      </div>
      <div class="car-engine">
        <div class="car-engine-title">

          <h3 class="title-car-system">{{ check.electrical }}%</h3>
        </div>
        <div class="car-engine-graphic">
          <pv-knob :model-value="check.electrical" class="non-interactive-knob-car" :min="0" :max="100" :step="1"
                   :size="60"
                   value-color="black" range-color="#e0e0e0" text-color="black"/>
        </div>
      </div>
      <div class="car-engine">
        <div class="car-engine-title">

          <h3 class="title-car-system">{{ check.steering }}%</h3>
        </div>
        <div class="car-engine-graphic">
          <pv-knob :model-value="check.steering" class="non-interactive-knob-car" :min="0" :max="100" :step="1"
                   :size="60"
                   value-color="black" range-color="#e0e0e0" text-color="black"/>
        </div>
      </div>
      <div class="car-engine">
        <div class="car-engine-title">

          <h3 class="title-car-system">{{ check.suspension }}%</h3>
        </div>
        <div class="car-engine-graphic">
          <pv-knob :model-value="check.suspension" class="non-interactive-knob-car" :min="0" :max="100" :step="1"
                   :size="60"
                   value-color="black" range-color="#e0e0e0" text-color="black"/>
        </div>
      </div>
      <div class="car-engine">
        <div class="car-engine-title">

          <h3 class="title-car-system">{{ check.fuel }}%</h3>
        </div>
        <div class="car-engine-graphic">
          <pv-knob :model-value="check.fuel" class="non-interactive-knob-car" :min="0" :max="100" :step="1" :size="60"
                   value-color="black" range-color="#e0e0e0" text-color="black"/>
        </div>
      </div>

      <div class="car-engine">
        <div class="car-engine-title">
          <h3 class="title-car-system">{{ check.refrigeration }}%</h3>
        </div>
        <div class="car-engine-graphic">
          <pv-knob :model-value="check.refrigeration" class="non-interactive-knob-car" :min="0" :max="100" :step="1"
                   :size="60"
                   value-color="black" range-color="#e0e0e0" text-color="black"/>
        </div>

      </div>

    </div>
  </div>
</template>

<style>
.car-system-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  color: white;
  gap:1rem
}

.car-engine {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 1rem;

}

.system-check-item {
  color: white;
  width: 100%;
}

.non-interactive-knob-car {
  display: flex;
  width: 100%;
}

.title-car-system {
  color: white;
}
</style>
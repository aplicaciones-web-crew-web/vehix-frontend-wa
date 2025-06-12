<script setup>
defineProps({
  systemName: {
    type: String,
    default: ''
  },
  percentage: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <div class="status-item">
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#e0e0e0"
          stroke-width="10"
          fill="none"
      />
      <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#000"
          stroke-width="10"
          fill="none"
          stroke-dasharray="282.6"
          :stroke-dashoffset="dashOffset"
          transform="rotate(-90 50 50)"
          stroke-linecap="round"
      />
      <text
          x="50"
          y="50"
          text-anchor="middle"
          dominant-baseline="middle"
          font-size="14"
          font-weight="bold"
      >
        {{ percentage }}
      </text>
    </svg>
    <p class="system-name">{{ systemName }}</p>
  </div>
</template>


<script>
const radius = 45
const circumference = 2 * Math.PI * radius

export default {
  computed: {
    dashOffset() {
      return circumference - (circumference * this.percentage) / 100
    }
  }
}
</script>

<style scoped>
.status-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
}

.system-name {
  margin-top: 5px;
  font-size: 14px;
  text-align: center;
}

</style>


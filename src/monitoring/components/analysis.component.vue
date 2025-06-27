<script>

export default {
  name: "analysis",
  data() {
    return {
      diagnosticOptions: [
        {title: 'Problem Forecasting', label: 'diagnostic-problem-forecasting', route: '/diagnostic/forecasting'},
        {title: 'Car Useful Life', label: 'diagnostic-car-useful-life', route: '/diagnostic/useful_life'},
        {title: 'Rapid Diagnostic', label: 'diagnostic-rapid-diagnostic', route: '/diagnostic/rapid_diagnostic'},
        {title: 'Recent Repairs', label: 'diagnostic-recent-repairs', route: '/diagnostic/recents-repairs'},
        {title: 'Last Scan', label: 'diagnostic-last-scan', route: '/diagnostic/audit-page'},
        {title: 'About Your Vehicle', label: 'diagnostic-about-vehicle', route: '/diagnostic/about-your-vehicle'}
      ],
      hoveredItem: null

    }
  },
  methods: {
    getLabelClass(label) {
      if (!label) return '';
      return "card-" + label;
    },
    isItemClickable(item) {
      return item.route === '/diagnostic/rapid_diagnostic' || item.route === '/diagnostic/recents-repairs';
    },
    handleCardClick(item) {
      if (this.isItemClickable(item)) {
        this.$router.push(item.route);
      }
    }
  }
}
</script>

<template>
  <div class="analysis-container"
       v-for="item in diagnosticOptions"
       :key="item.label"
  >
    <div :class="getLabelClass(item.label)"
         @click="handleCardClick(item)"
         @mouseenter="hoveredItem = item.label"   @mouseleave="hoveredItem = null"         :style="{ cursor: isItemClickable(item) ? 'pointer' : 'default' }"
    >
      {{ $t(item.title) }}
      <span v-if="hoveredItem === item.label && !isItemClickable(item)" class="hover-text">
        Functionality under development
      </span>
    </div>
  </div>
</template>

<style>
.hover-text{
  font-size: 0.8rem;
  color: rgba(255, 0, 0, 0.71);
  margin-left: 0.5rem;
}
.analysis-container{
  display: flex;
  flex-direction: column;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.card-diagnostic-problem-forecasting {

  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  font-family: 'Roboto', sans-serif;
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: bold;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 1rem;

}

.card-diagnostic-car-useful-life {
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  font-family: 'Roboto', sans-serif;
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: bold;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 1rem;
}

.card-diagnostic-rapid-diagnostic {
  background-color: rgb(0, 0, 0);
  color: white;
  font-family: 'Roboto', sans-serif;
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: bold;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 1rem;

}

.card-diagnostic-recent-repairs {
  background-color: rgb(0, 0, 0);
  color: white;
  font-family: 'Roboto', sans-serif;
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: bold;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 1rem;

}

.card-diagnostic-last-scan {
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  font-family: 'Roboto', sans-serif;
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: bold;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 1rem;

}

.card-diagnostic-about-vehicle {
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  font-family: 'Roboto', sans-serif;
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: bold;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 1rem;
}

</style>
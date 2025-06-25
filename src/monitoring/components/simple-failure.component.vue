<script >

export default {
  name: "simple-failure",
  props: {
    failures: {
      type: Array,
      required: true
    },
    emptyMessage: {
      type: String,
      default: "No failures pendings"
    }
  },
  methods: {
    getUrgencyClass(urgency) {
      switch (urgency) {
        case "Critical":
          return "critical";
        case "Moderate":
          return "moderate";
        case "Low":
          return "low";
        default:
          return "";
      }
    }
  }
}
</script>

<template>
  <div class="issues-box">
    <h3>Simple Issues</h3>

    <div v-if="failures.length === 0">{{ emptyMessage }}</div>

    <ul v-else>
      <li v-for="failure in failures" :key="failure.id" class="issue-item">
        <span class="icon">⚠️</span>
        <span class="text">{{ failure.suggestSolution }}</span>
        <span class="urgency-dot" :class="getUrgencyClass(failure.urgency)"></span>
      </li>
    </ul>
  </div>
</template>

<style >
.issues-box {
  background: #eeeeee;
  color: black;
  border-radius: 20px;
  padding: 35px;
  width: 420px;
  font-family: 'Montserrat', sans-serif;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.25);
}

.issues-box h3 {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
}

.issue-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 16px;
}

.icon {
  font-size: 20px;
  margin-right: 8px;
  width: 24px;
}

.text {
  flex-grow: 1;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.urgency-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-left: 8px;
}

.dot-red { background-color: red; }
.dot-yellow { background-color: gold; }
.dot-green { background-color: limegreen; }
</style>
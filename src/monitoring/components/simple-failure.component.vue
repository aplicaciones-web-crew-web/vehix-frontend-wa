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
          return "Critical";
        case "Moderate":
          return "Moderate";
        case "Mild":
          return "Mild";
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
        <span class="text">{{ failure.title }}</span>
        <span class="urgency-dot" :class="getUrgencyClass(failure.urgency)"></span>
      </li>
    </ul>
  </div>
</template>

<style >
.issues-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #EEEEEE;
  border-radius: 50px;
  padding: 3rem;
}

.urgency-dot {
  width: 60px;
  height: 20px;
  border-radius: 100%;
  margin-left: 1rem;
}

.urgency-dot.Critical {
  background-color: red;
}
.urgency-dot.Moderate {
  background-color: gold;
}
.urgency-dot.Mild {
  background-color: limegreen;
}
</style>
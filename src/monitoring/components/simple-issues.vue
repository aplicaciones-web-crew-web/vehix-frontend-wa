<script>
import { SimpleIssues } from '../model/simple-issues.entity.js';
import { BadPracticeService } from '../services/simple-issues.service.js';

export default {
  name: 'SimpleIssues',
  data() {
    return {
      issues: []
    };
  },
  async mounted() {
    const vehicleId = 1;
    const service = new BadPracticeService();
    const data = await service.getSimpleIssues(vehicleId);
    this.issues = data.map(item => new SimpleIssues(item));
    console.log('Simple issues cargadas:', this.issues); // para debug
  },
  methods: {
    getUrgencyClass(level) {
      switch (level.toLowerCase()) {
        case 'critical': return 'dot-red';
        case 'moderate': return 'dot-yellow';
        case 'mild': return 'dot-green';
        default: return '';
      }
    },
    getIssueIcon(desc) {
      const text = desc.toLowerCase();
      if (text.includes('tire')) return '🛞';
      if (text.includes('battery')) return '🔋';
      if (text.includes('oil')) return '🛢️';
      if (text.includes('coolant')) return '🧊';
      if (text.includes('air filter')) return '🌬️';
      if (text.includes('washer')) return '💧';
      return '❓';
    }
  }
};
</script>

<template>
  <div class="issues-box">
    <h3>Simple Issues</h3>
    <ul>
      <li
          v-for="issue in issues"
          :key="issue.id"
          class="issue-item"
      >
        <span class="icon">{{ getIssueIcon(issue.description) }}</span>
        <span class="text">{{ issue.description }}</span>
        <span class="urgency-dot" :class="getUrgencyClass(issue.urgency)"></span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
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

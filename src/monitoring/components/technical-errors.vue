<script>
import { TechnicalErrors } from '../model/technical-errors.entity.js';
import { OdbErrorService } from '../services/technical-error.service.js';

export default {
  name: 'TechnicalErrors',
  data() {
    return {
      errors: []
    };
  },
  async mounted() {
    const vehicleId = 1;
    const service = new OdbErrorService();
    const data = await service.getTechnicalErrors(vehicleId);
    this.errors = data.map(e => new TechnicalErrors(e));
    console.log('Errores técnicos cargados:', this.errors);
  },
  methods: {
    getUrgencyClass(level) {
      switch (level.toLowerCase()) {
        case 'critical': return 'critical';
        case 'moderate': return 'moderate';
        case 'mild': return 'mild';
        default: return '';
      }
    },
    openMechanicPage() {
      this.$router.push({ name: 'mechanic' });
    }

  }
};
</script>
<template>
  <div class="technical-errors-box">
    <h3>Technical Errors</h3>
    <ul class="error-list">
      <li
          v-for="error in errors"
          :key="error.id"
          class="error-item"
          :class="getUrgencyClass(error.urgency)"
      >
        <span class="dot"></span>
        <strong>{{ error.code }} – {{ error.description }}</strong>
        <span>
          <br />
          🔧 Suggested solution: <br />
          {{ error.suggestion }}
        </span>
      </li>
    </ul>

    <div class="seek-help-btn-container">
      <button @click="openMechanicPage" class="seek-help-btn">Seek help</button>
    </div>
  </div>
</template>


<style scoped>
.technical-errors-box {
  background: #eeeeee;
  color: black;
  border-radius: 20px;
  padding: 35px;
  width: 430px;
  font-family: 'Montserrat', sans-serif;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.25);
  height: 47rem;
}

.error-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.error-item {
  margin-bottom: 2rem;
  padding-left: 1.5rem;
  position: relative;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  line-height: 1.5;
}

.error-item .dot {
  position: absolute;
  left: 0;
  top: 8px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.critical .dot { background-color: red; }
.moderate .dot { background-color: gold; }
.mild .dot { background-color: limegreen; }

.seek-help-btn-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.seek-help-btn {
  background-color: black;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.8rem 5rem;
  border-radius: 12px;
}

</style>

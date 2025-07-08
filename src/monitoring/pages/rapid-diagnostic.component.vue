<script>
import {VehicleSessionService} from "../../shared/services/vehicle-session.service.js";
import {VehicleFailureService} from "../services/vehicle-failure.service.js";
import {FailureService} from "../services/failure.service.js";
import {VehicleFailureAssembler} from "../services/vehicle-failure.assembler.js";
import {FailureAssembler} from "../services/failure.assembler.js";

export default {
  name: "rapid-diagnostic",
  data() {
    return {
      vehicleId: null,
      vehicleFailureService: null,
      failureService: null,
      diagnostics: []
    };
  },
  async created() {
    this.vehicleId = VehicleSessionService.getVehicleId();
    this.vehicleFailureService = new VehicleFailureService();
    this.failureService = new FailureService();
    await this.loadDiagnostics();
  },
  methods: {
    async loadDiagnostics() {
      try {
        const [vehicleFailuresRes, failuresRes] = await Promise.all([
          this.vehicleFailureService.getByVehicleId(this.vehicleId, 'Pending'),
          this.failureService.getAll()
        ]);
        const vehicleFailures = VehicleFailureAssembler.toEntitiesFromResponse(vehicleFailuresRes);
        const failures = FailureAssembler.toEntitiesFromResponse(failuresRes);
        this.diagnostics = vehicleFailures.map(vf => {
          const failure = failures.find(f => f.id === vf.failureId) || {};
          return {
            id: vf.id,
            title: failure.title || 'Unknown issue',
            description: `This issue has ${failure.urgency || 'unknown'} urgency.`,
            suggestSolution: failure.suggestSolution || '',
            solved: vf.status === 'Solved'
          };
        });
      } catch (error) {
        console.error('Error loading diagnostics:', error);
      }
    },
    toggleSolved(item) {
      item.solved = !item.solved;
    }
  }
};
</script>

<template>
  <div class="rapid-diagnostic-container">
    <div class="card-grid">
      <div v-for="diag in diagnostics" :key="diag.id" class="diagnostic-card">
        <div class="card-header">
          <span class="problem-title">{{ diag.title }}</span>
          <div class="check-box" @click="toggleSolved(diag)">
            <span class="state-label">solved</span>
            <span v-if="diag.solved" class="check-icon">✔</span>
          </div>
        </div>
        <div class="problem-description">{{ diag.description }}</div>
        <div class="suggested-solution"><strong>Suggested solution:</strong> {{ diag.suggestSolution }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rapid-diagnostic-container {
  display: flex;
  justify-content: center;
  padding: 1rem;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  width: 100%;
}
.diagnostic-card {
  background-color: #f5f5f5;
  padding: 1rem;
  position: relative;
  font-family: "Roboto", sans-serif;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: .5rem;
}
.problem-title {
  font-weight: bold;
  font-size: 1.2rem;
}
.check-box {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #fff;
}
.state-label {
  position: absolute;
  top: -1.2rem;
  right: 0;
  font-size: 0.75rem;
  color: grey;
}
.check-icon {
  color: grey;
}
.problem-description {
  margin-bottom: .5rem;
}
</style>
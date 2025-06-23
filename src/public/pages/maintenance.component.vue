<script>
import Scan from "../../monitoring/components/scan.component.vue";
import ScanManagement from "../../monitoring/pages/scan-management.vue";

export default {
  name: 'DiagnosticPage',
  components: {ScanManagement, Scan},
  data() {
    return {
      diagnosticOptions: [
        { label: 'diagnostic.problemForecasting', route: '/diagnostic/forecasting' },
        { label: 'diagnostic.carUsefulLife', route: '/diagnostic/useful_life' },
        { label: 'diagnostic.rapidDiagnostic', route: '/diagnostic/rapid_diagnostic' },
        { label: 'diagnostic.recentRepairs', route: '/diagnostic/recents-repairs' },
        { label: 'diagnostic.lastScan', route: '/diagnostic/audit-page' },
        { label: 'diagnostic.aboutVehicle', route: '/diagnostic/about-your-vehicle' }
      ]
    }
  }
}
</script>

<template>
<!--
  <div class="diagnostic-wrapper">
    <div class="type-diagnostics">
      <router-link
          v-for="item in diagnosticOptions"
          :key="item.label"
          :to="item.route"
          class="card-link"
      >
        <div class="item">
          {{ $t(item.label) }}
        </div>
      </router-link>
    </div>

    <div class="tap-scan-container">
      <div class="outer-circle">
        <router-link to="/diagnostic/tap-scan" class="inner-circle">
          {{ $t('diagnostic.tapToScan') }}
        </router-link>
      </div>
    </div>
  </div>-->
  <scan-management></scan-management>


</template>



<style scoped>
.diagnostic-wrapper {
  position: relative;
  width: 100%;
}

.type-diagnostics {
  width: 80%;
  max-width: 450px;
  padding: 7px;
  margin-left: 0;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: 'Montserrat', sans-serif;
}

.card-link {
  text-decoration: none;
}

.item {
  width: 100%;
  padding: 10px;
  height: 100px;
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: black;
  color: white;
  font-size: 32px;
}

.car-image {
  position: fixed;
  top: 520px;
  right: 10rem;
  width: 35rem;
}

.tap-scan-container {
  position: absolute;
  top: 35%;
  left: 57%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.outer-circle {
  width: 270px;
  height: 270px;
  border: 8px solid black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.inner-circle {
  width: 250px;
  height: 250px;
  background-color: black;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.outer-circle:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
}

.outer-circle:hover .inner-circle {
  background-color: white;
  color: black;
}
</style>

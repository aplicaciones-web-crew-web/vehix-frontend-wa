<script>
import Scan from "../../monitoring/components/scan.component.vue";
import MaintenanceManagement from "../../monitoring/pages/maintenance-management.vue";

export default {
  name: 'DiagnosticPage',
  components: {MaintenanceManagement, Scan},
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
  <maintenance-management></maintenance-management>


</template>



<style >
</style>

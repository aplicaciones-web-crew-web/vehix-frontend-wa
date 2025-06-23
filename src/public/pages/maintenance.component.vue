<script>
import Scan from "../../monitoring/components/scan.component.vue";
import MaintenanceManagement from "../../monitoring/pages/maintenance-management.vue";

export default {
  name: 'DiagnosticPage',
  components: {MaintenanceManagement, Scan},
}
</script>

<template>

  <!--
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


<style>
</style>

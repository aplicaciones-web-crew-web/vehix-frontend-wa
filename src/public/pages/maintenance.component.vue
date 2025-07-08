<script>
import Scan from "../../monitoring/components/scan.component.vue";
import MaintenanceManagement from "../../monitoring/pages/maintenance-management.component.vue";

export default {
  name: 'DiagnosticPage',
  components: {MaintenanceManagement, Scan},
}
</script>

<template>
  <maintenance-management></maintenance-management>

</template>


<style>
* {
  box-sizing: border-box;
}
</style>

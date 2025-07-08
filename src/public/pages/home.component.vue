<script>


import {UserSessionService} from "../../shared/services/user-session.service.js";
import {VehicleService} from "../../ASM/services/vehicle.service.js";
import {VehicleAssembler} from "../../ASM/services/vehicle.assembler.js";
import DashboardManagement from "../../monitoring/pages/dashboard-management.component.vue";

export default {
  name: "home",
  components: {DashboardManagement},
}
</script>

<template>
  <dashboard-management></dashboard-management>
</template>

<style>

</style>
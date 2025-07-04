<script>

import {UserSessionService} from "../../shared/services/user-session.service.js";
import {VehicleService} from "../../ASM/services/vehicle.service.js";
import {VehicleAssembler} from "../../ASM/services/vehicle.assembler.js";
import {SubscriptionPlanService} from "../../subscriptions/services/subscription-plan.service.js";
import {UserService} from "../../IAM/services/user.service.js";

export default {
  name: "dashboard-management",
  data() {
    return {
      userId: 0,
      vehicleId: 0,
      subscriptionImage: '',

      vehiclesService: null,
      subscriptionService: null,
      vehicles: []
    }
  },

  created() {
    if (this.vehicleId === 0 || this.userId === 0) return;

    this.subscriptionService = new SubscriptionPlanService();
    this.userService = new UserService();

    this.userId = UserSessionService.getUserId();
    console.log(this.userId);
    this.vehiclesService = new VehicleService();
    this.vehiclesService.getByUserId(this.userId).then(response => {
      this.vehicles = VehicleAssembler.toEntitiesFromResponse(response);
      console.log(this.vehicles);
    }).catch(error => {
      console.error("Error loading vehicles: ", error);
    });
  },

  methods: {
    goToRegistre() {
      this.$router.push('/vehicle-registry');
    }
  }

}
</script>

<template>
  <div class="w-full" style="display: flex; flex-direction: row; justify-content: center;">
    <div class="column-1" style="display: flex; flex-direction: column; width: 30vw;height: calc(100vh - 65px);">
      <div class="row-1" style="display: flex; flex-direction: column; height: 60%;  padding: 1rem">
        <div class="content-row-1" style="background: #f5f5f5 ; height: 100% ;padding: 1rem">
          <h2 v-if="vehicles">{{ $t('dashboard.scanHistory') }}</h2>
          <p v-if="!vehicles">{{ $t('dashboard.scanHistoryContent') }}</p>
        </div>
      </div>
      <div class="row-2" style="display: flex; flex-direction: column; height: 40%; padding: 1rem">
        <div class="content-row-2" style="background: #d9d9d9 ; height: 100% ;padding: 1rem">
          <h2 v-if="vehicles">{{ $t('dashboard.subscription') }}</h2>
          <img :src="subscriptionImage">
        </div>
      </div>
    </div>

    <div class="column-2" style="display: flex; flex-direction: column;width: 40vw; padding: 1rem">
      <div class="main-row"
           style="display: flex; flex-direction: column; background: #696969; height: 100%; padding: 1rem; text-align: center">
        <h2 style="color: white">{{ $t('dashboard.vehicleStateSummary') }}</h2>
        <p v-if="!vehicles" style="color: white">{{ $t('dashboard.vehicleStateSummaryContent') }}</p>
      </div>
    </div>

    <div class="column-3" style="display: flex; flex-direction: column;width: 30vw;">
      <div class="row-1" style="display: flex; flex-direction: column; height: 50%;  padding: 1rem">
        <div class="content-row-1" style="background: #f5f5f5 ; height: 100% ;padding: 1rem">
          <h2>{{ $t('dashboard.recentAlerts') }}</h2>
          <p v-if="!vehicles">{{ $t('dashboard.recentAlertsContent') }}</p>
          <button @click="goToRegistre"></button>
        </div>
      </div>
      <div class="row-2" style="display: flex; flex-direction: column; height: 50%; padding: 1rem">
        <div class="content-row-2" style="background: #d9d9d9 ; height: 100% ;padding: 1rem">
          <h2>{{ $t('dashboard.vehicleStateAnalysis') }}</h2>
          <p>{{ $t('dashboard.vehicleStateAnalysisContent') }}</p>

        </div>
      </div>
    </div>
  </div>
  <!--Para ver la gestión de fallas, navega a la sección de <router-link to="/car-failures">Fallas de Auto</router-link>.-->


</template>

<style scoped>

</style>
<script>

import {UserSessionService} from "../../shared/services/user-session.service.js";
import {VehicleService} from "../../ASM/services/vehicle.service.js";
import {SubscriptionPlanService} from "../../subscriptions/services/subscription-plan.service.js";
import {UserService} from "../../IAM/services/user.service.js";
import {VehicleSessionService} from "../../shared/services/vehicle-session.service.js";
import VehicleCard from "../components/vehicle-card.component.vue";
import Vehicle from "../components/vehicle.component.vue";
import VehicleState from "../components/vehicle-state.component.vue";
import {VehicleFailureService} from "../services/vehicle-failure.service.js";
import {SystemCheckService} from "../services/system-check.service.js";
import {SystemCheckAssembler} from "../services/system-check.assembler.js";

export default {
  name: "dashboard-management",
  components: {VehicleState, Vehicle, VehicleCard},
  data() {
    return {
      userId: 0,
      vehicleId: 0,
      planId: 0,

      subscriptionImage: '',
      vehicleImage: '',
      vehicleModel: '',
      vehicleName: '',
      vehicleBrand: '',


      activateEmptyMessage: false,

      vehicleService: null,
      subscriptionService: null,
      userService: null,
      vehicleFailureService: null,
      systemCheckService: null,

      vehiclesDto: [],
      usersDto: [],
      subscriptionsDto: [],
      vehicleFailures: [],
      systemChecks: [],
    }
  },

  async created() {
    this.activateEmptyMessage = false;
    this.userId = UserSessionService.getUserId();
    this.vehicleId = VehicleSessionService.getVehicleId();


    this.userService = new UserService();
    this.vehicleService = new VehicleService();
    this.subscriptionService = new SubscriptionPlanService();
    this.vehicleFailureService = new VehicleFailureService();
    this.systemCheckService = new SystemCheckService();


    console.log(this.vehicleId);
    console.log(this.activateEmptyMessage)

    if (!this.vehicleId) {
      this.activateEmptyMessage = true;
    }
    await this.getPlanId();
    await this.getSubscriptionImage();
    await this.getVehicleDto();
    await this.getVehicleFailures();
    await this.getSystemCheck();


  },

  methods: {
    async getVehicleFailures() {
      try {
        const response = await this.vehicleFailureService.getByVehicleId(this.vehicleId, 'Pending');
        this.vehicleFailures = response.data;
      } catch (error) {
        console.error("Error: Vehicle Failures", error);
      }
    },
    async getVehicleDto() {
      try {
        const response = await this.vehicleService.getById(this.vehicleId);
        this.vehicleModel = response.data.model;
        this.vehicleBrand = response.data.brand;
        this.vehicleImage = response.data.image;
        this.vehicleName = response.data.name;
      } catch (error) {
        console.error("Error: Vehicles Plans", error);
      }
    },
    async getPlanId() {
      try {
        const response = await this.userService.getById(this.userId);
        this.planId = response.data.planId;
      } catch (error) {
        console.error("Error: Loaded Plans", error);
      }
    },
    async getSubscriptionImage() {
      try {
        const response = await this.subscriptionService.getById(this.planId);
        this.subscriptionImage = response.data.imageUrl;
      } catch (error) {
        console.error("Error: Loaded Plans", error);
      }
    },

    async getSystemCheck() {
      try {
        const response = await this.systemCheckService.getAllByVehicleId(this.vehicleId);
        if (response.data.length > 0) {
          this.systemChecks = SystemCheckAssembler.toEntitiesFromResponse(response);
          this.activateEmptyMessage = false;
        } else {
          this.activateEmptyMessage = true;
        }
      } catch (error) {
        console.error("Error: System Check", error);
      }
    }
  }

}
</script>

<template>
  <div class="dashboard-main-container" style="display: flex; justify-content: center;">
    <div class="column-1" style="display: flex; flex-direction: column; width: 30%;height: calc(100vh - 65px);">
      <div class="row-1" style="display: flex; flex-direction: column; height: 60%;  padding: 1rem">
        <div class="content-row-1" style="background: #f5f5f5 ; height: 100% ;padding: 1rem">
          <h2>{{ $t('dashboard.scanHistory') }}</h2>
          <p v-if="activateEmptyMessage">{{ $t('dashboard.scanHistoryContent') }}</p>
        </div>
      </div>
      <div class="row-2" style="display: flex; flex-direction: column; height: 40%; padding: 1rem">
        <div class="content-row-2" style="background: #d9d9d9 ; height: 100% ;padding: 1rem">
          <h2>{{ $t('dashboard.subscription') }}</h2>
          <img class="plan-image-container" :src="subscriptionImage" alt="">
        </div>
      </div>
    </div>

    <div class="column-2" style="display: flex; flex-direction: column;width: 40%; padding: 1rem">
      <div class="main-row"
           style="display: flex; flex-direction: column; background: #696969; height: 100%; padding: 1rem; text-align: center">
        <h2 style="color: white">{{ $t('dashboard.vehicleStateSummary') }}</h2>
        <p v-if="activateEmptyMessage" style="color: white">{{ $t('dashboard.vehicleStateSummaryContent') }}</p>
        <vehicle v-if="!activateEmptyMessage" :name="vehicleName" :model="vehicleModel" :brand="vehicleBrand"
                 :url-image="vehicleImage"></vehicle>

      </div>
    </div>

    <div class="column-3" style="display: flex; flex-direction: column;width: 30%;">
      <div class="row-1" style="display: flex; flex-direction: column; height: 50%;  padding: 1rem">
        <div class="content-row-1" style="background: #f5f5f5 ; height: 100% ;padding: 1rem">
          <h2>{{ $t('dashboard.recentAlerts') }}</h2>
          <p v-if="activateEmptyMessage">{{ $t('dashboard.recentAlertsContent') }}</p>
        </div>
      </div>
      <div class="row-2" style="display: flex; flex-direction: column; height: 50%; padding: 1rem">
        <div class="content-row-2" style="background: #d9d9d9 ; height: 100% ;padding: 1rem">
          <h2>{{ $t('dashboard.vehicleStateAnalysis') }}</h2>
          <p v-if="activateEmptyMessage">{{ $t('dashboard.vehicleStateAnalysisContent') }}</p>
          <vehicle-state :vehicle-failures=" vehicleFailures" v-if="!activateEmptyMessage"></vehicle-state>

        </div>
      </div>
    </div>
  </div>


</template>

<style>
h2 {
  text-align: center;
  font-size: clamp(1.5rem, 1.5vw, 2rem);
  margin-bottom: 1rem;
}

.content-row-2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.plan-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;

}

.column-1 {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 65px);
}

.column-3 {
  display: flex;
  height: calc(100vh - 65px);
}

.column-2 {
  display: flex;
  flex-direction: column;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
}

.main-row {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: white;
}

.dashboard-main-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 65px);
}

@media only screen and (max-width: 1000px) {
  .dashboard-main-container {
    flex-flow: column wrap;
  }

  .main-row {
    flex-flow: column wrap;
  }

  .column-1, .column-2, .column-3 {
    display: flex;
    flex-direction: column;

  }
}
</style>
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
import CarSystem from "../components/car-system.component.vue";

export default {
  name: "dashboard-management",
  components: {CarSystem, VehicleState, Vehicle, VehicleCard},
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
    this.systemCheckService = new SystemCheckService();

    this.userService = new UserService();
    this.vehicleService = new VehicleService();
    this.subscriptionService = new SubscriptionPlanService();
    this.vehicleFailureService = new VehicleFailureService();

    console.log("🚗 vehicleId:", this.vehicleId);

    try {
      await this.getPlanId();
      await this.getSubscriptionImage();

      if (!this.vehicleId || this.vehicleId === 0) {
        this.activateEmptyMessage = true;
        return;
      }

      await this.getVehicleDto();
      await this.getVehicleFailures();
      await this.getSystemCheck();

      if (!this.vehicleModel && this.systemChecks.length === 0) {
        this.activateEmptyMessage = true;
      }

    } catch (error) {
      console.error("Error loading dashboard:", error);
      this.activateEmptyMessage = true;
    }
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
        const response = await this.systemCheckService.getByVehicleId(this.vehicleId);
        if (response.data.length > 0) {
          this.systemChecks = SystemCheckAssembler.toEntitiesFromResponse(response);
          this.activateEmptyMessage = false;
        } else {
        }
      } catch (error) {
        console.error("Error: System Check", error);
      }
    }
  }

}
</script>

<template>
  <div class="dashboard-container">
    <div class="left-column">
      <div class="scan-history">
        <h2 class="section-title">{{ $t('dashboard.scanHistory') }}</h2>
        <p v-if="activateEmptyMessage">{{ $t('dashboard.scanHistoryContent') }}</p>
        <div class="vehicle-state-container" v-if="!activateEmptyMessage">
          <vehicle-state :vehicle-failures="vehicleFailures"></vehicle-state>
        </div>
      </div>

      <div class="subscription">
        <h2 class="section-title">{{ $t('dashboard.subscription') }}</h2>
        <img v-if="vehicleId" :src="subscriptionImage" alt="Subscription Plan" class="subscription-image">
      </div>
    </div>

    <div class="center-column">
      <h2 class="section-title white">{{ $t('dashboard.vehicleStateSummary') }}</h2>
      <p v-if="activateEmptyMessage" class="white">{{ $t('dashboard.vehicleStateSummaryContent') }}</p>
      <div class="vehicle-container" v-if="!activateEmptyMessage">
        <vehicle
            :name="vehicleName"
            :model="vehicleModel"
            :brand="vehicleBrand"
            :url-image="vehicleImage">
        </vehicle>
      </div>
    </div>

    <div class="right-column">
      <h2 class="section-title white">{{ $t('dashboard.vehicleStateSummary') }}</h2>
      <p v-if="activateEmptyMessage" class="white">{{ $t('dashboard.vehicleStateSummaryContent') }}</p>
      <div class="car-system-container" v-if="!activateEmptyMessage">
        <car-system :systemChecks="systemChecks"></car-system>
      </div>
    </div>
  </div>
</template>

<style>
.dashboard-container {
  display: flex;
  height: calc(100vh - 65px);
  gap: 16px;
  padding: 16px;
  box-sizing: border-box;
  width: 100%;
}

.left-column {
  flex: 0 0 30%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.center-column {
  flex: 0 0 40%;
  background: #696969;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.right-column {
  flex: 0 0 30%;
  background: #696969;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.scan-history {
  flex: 1;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.subscription {
  flex: 1;
  background: #d9d9d9;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.vehicle-state-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.vehicle-container, .car-system-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.section-title {
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(1.5rem, 1.5vw, 2rem);
  margin-bottom: 1rem;
}

.white {
  color: white;
}

.subscription-image {
  width: 40%;
  max-width: 200px;
  height: auto;
  object-fit: contain;
}

@media only screen and (max-width: 1000px) {
  .dashboard-container {
    flex-direction: column;
    height: auto;
  }

  .left-column, .center-column, .right-column {
    flex: 1 0 auto;
    width: 100%;
    min-height: 300px;
  }

  .scan-history, .subscription {
    min-height: 250px;
  }
}
</style>
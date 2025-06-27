<script>

import {VehicleSessionService} from "../../shared/services/vehicle-session.service.js";
import {VehicleFailureService} from "../services/vehicle-failure.service.js";
import {FailureService} from "../services/failure.service.js";
import {VehicleAssembler} from "../../assets-and-resources-management/services/vehicle.assembler.js";
import {FailureAssembler} from "../services/failure.assembler.js";
import {Button as PvButton} from "primevue";
import {VehicleFailureAssembler} from "../services/vehicle-failure.assembler.js";
import {Vehicle} from "../../assets-and-resources-management/model/vehicle.entity.js";
import {VehicleFailure} from "../model/vehicle-failure.entity.js";
import SimpleFailureComponent from "../components/simple-failure.component.vue";
import SimpleFailure from "../components/simple-failure.component.vue";
import {BadPracticeAssembler} from "../services/bad-practice.assembler.js";
import BadPractice from "../components/bad-practice.component.vue";
import {BadPracticeService} from "../services/bad-practice.service.js";
import {OdbErrorService} from "../services/odb-error.service.js";
import TechnicalError from "../components/technical-error.component.vue";
import {OdbErrorAssembler} from "../services/odb-error.assembler.js";
import VehicleCard from "../components/vehicle-card.component.vue";

export default {
  name: "failures-management",
  components: {VehicleCard, TechnicalError, BadPractice, SimpleFailure, Failure: SimpleFailureComponent, PvButton},
  data() {
    return {
      vehicleId: null,

      failureService: null,
      vehicleFailureService: null,
      badPracticeService: null,
      odbErrorService: null,

      vehicleFailures: [],
      badPractices: [],
      failures: [],
      odbErrors: [],

      failuresId: [],
      vehicleFailuresIds: [],
      pendingFailuresToShow: [],
      emptyMessage: "The vehicle be in good condition.",
    };
  },
  async created() {
    this.vehicleId = VehicleSessionService.getVehicleId();
    if (!this.vehicleId) this.$router.push("/login");

    this.failureService = new FailureService();
    this.vehicleFailureService = new VehicleFailureService();
    this.badPracticeService = new BadPracticeService();
    this.odbErrorService = new OdbErrorService();

    await this.loadFailures();
    await this.loadVehicleFailuresInPendingId();
    await this.generateRandomQuantityOfVehicleFailure();
    await this.loadBadPractices();
    await this.loadOdbErrors();
  },
  methods: {
    async loadVehicleFailuresInPendingId() {
      try {
        const response = await this.vehicleFailureService.getByVehicleId(this.vehicleId, 'Pending');
        this.vehicleFailures = VehicleFailureAssembler.toEntitiesFromResponse(response);
        this.vehicleFailuresIds = this.vehicleFailures.map(vf => vf.failureId);

        if (this.vehicleFailures.length === 0) {
          this.pendingFailuresToShow = [];
        } else {
          this.pendingFailuresToShow = this.vehicleFailures.map(vf => {
            return this.failures.find(failure => failure.id === vf.failureId);
          }).filter(Boolean);
        }
        console.log("Vehicle failures pending to show", this.pendingFailuresToShow);
      } catch (error) {
        console.error("Error loading vehicle failures in pending status:", error);
      }
    },
    async generateRandomQuantityOfVehicleFailure() {
      try {
        const availableFailures = this.failures.filter(
            failure => !this.vehicleFailuresIds.includes(failure.id)
        );

        const maxAssignable = Math.min(5, availableFailures.length);
        const randomQuantity = Math.floor(Math.random() * (maxAssignable + 1));

        const shuffled = availableFailures.sort(() => 0.5 - Math.random());
        const selectedFailures = shuffled.slice(0, randomQuantity);

        for (const failure of selectedFailures) {
          const newVehicleFailure = {
            vehicleId: parseInt(this.vehicleId),
            failureId: failure.id,
            date: new Date().toISOString(),
            status: "Pending"
          };
          await this.vehicleFailureService.create(newVehicleFailure);
        }

        await this.loadVehicleFailuresInPendingId();

      } catch (error) {
        console.error("Error generating random vehicle failures:", error);
      }
    },
    async loadVehiclesFailures() {
      try {
        const response = await this.vehicleFailureService.getAll();
        this.vehicleFailures = VehicleFailureAssembler.toEntitiesFromResponse(response);
      } catch (error) {
        console.error("Error: Loaded VehicleFailure", error);
      }
    },
    async loadFailures() {
      try {
        const response = await this.failureService.getAll();
        this.failures = FailureAssembler.toEntitiesFromResponse(response);
        await this.loadVehiclesFailures();
        await this.loadVehicleFailuresInPendingId();
      } catch (error) {
        console.error("Error loading failures:", error);
      }
    },
    async loadBadPractices() {
      try {
        const response = await this.badPracticeService.getAll();
        this.badPractices = BadPracticeAssembler.toEntitiesFromResponse(response);
      } catch (error) {
        console.error("Error loading bad practices:", error);
      }
    },
    async loadOdbErrors() {
      try {
        const response = await this.odbErrorService.getAll();
        this.odbErrors = OdbErrorAssembler.toEntitiesFromResponse(response);
      } catch (error) {
        console.error("Error loading ODB errors:", error);
      }
    },
    openMechanicPage() {
      this.$router.push({name: 'mechanic'});
    }
  },
}
</script>

<template>

  <div class="main-container">
    <div class="column-1">
      <vehicle-card></vehicle-card>
    </div>

    <div class="column-bad-and-simple-failures">
      <div class="column-2">
        <pv-panel style="width: 100% ;height: 100%">
          <simple-failure
              :failures="pendingFailuresToShow"
              :empty-message="emptyMessage"
          ></simple-failure>
        </pv-panel>
      </div>

      <div class="column-3">
        <pv-panel style="width: 100%;height: 100%">
          <bad-practice
              :failures="pendingFailuresToShow"
              :bad-practices="badPractices"
          ></bad-practice>
        </pv-panel>
      </div>
    </div>

    <div class="column-4">
      <div class="odb-errors-panel">
        <pv-panel style="width: 100% ;height: 100%">

          <technical-error
              :failures="pendingFailuresToShow"
              :odb-errors="odbErrors">
          </technical-error>
        </pv-panel>
      </div>

      <div class="seek-help-btn-container">
        <button @click="openMechanicPage" class="seek-help-btn">Seek help</button>
      </div>

    </div>
  </div>

</template>

<style>
.main-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 65px);
}

.column-1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  border: 1px solid blue;
}

.column-2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50%;

  border: 1px solid blue;

}

.column-3 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50%;
  border: 1px solid blue;
}

.column-4 {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 30%;
  justify-content: center;
  height: 100%;
  border: 1px solid red;
}

.seek-help-btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.87);
  color: white;
  width: 80%;
  height: 9%;
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
}

.column-bad-and-simple-failures {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
  width: 30%;
  height: 100%;
  border: 1px solid blue;
}

button {
  all: unset;
}

</style>
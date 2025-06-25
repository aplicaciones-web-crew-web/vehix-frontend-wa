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

export default {
  name: "failures-management",
  components: {SimpleFailure, Failure: SimpleFailureComponent, PvButton},
  data() {
    return {
      vehicleId: null,
      vehicleImage: '',

      failureService: null,

      vehicleFailureService: null,

      vehicleFailures: [],
      failures: [],
      failuresId: [],
      vehicleFailuresIds: [],
      pendingFailuresToShow: [],
      emptyMessage: "El vehículo está en óptimas condiciones."
    };
  },
  async created() {
    this.vehicleId = VehicleSessionService.getVehicleId();
    if (!this.vehicleId) this.$router.push("/login");

    this.failureService = new FailureService();
    this.vehicleFailureService = new VehicleFailureService();

    await this.loadFailures();
    await this.loadVehicleFailuresInPendingId();  // importante cargar fallas pendientes primero

    await this.generateRandomQuantityOfVehicleFailure();
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
        console.log("Vehicle failures pendientes para mostrar:", this.pendingFailuresToShow);
      } catch (error) {
        console.error("Error cargando fallas pendientes:", error);
      }
    },
    async generateRandomQuantityOfVehicleFailure() {
      try {
        // Ya tienes las fallas pendientes cargadas en this.vehicleFailures
        const pendingFailuresForVehicle = this.vehicleFailures
            .filter(vf => vf.vehicleId === this.vehicleId && vf.status === 'Pending')
            .map(vf => vf.failureId);

        const availableFailures = this.failures.filter(failure => !pendingFailuresForVehicle.includes(failure.id));

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

        // Vuelve a cargar las fallas pendientes para actualizar la vista
        await this.loadVehicleFailuresInPendingId();

      } catch (error) {
        console.error("Error generando fallas aleatorias:", error);
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
    }
  },

}
</script>

<template>

  <div>

    <simple-failure
        :failures="pendingFailuresToShow"
        :empty-message="emptyMessage"
    />
  </div>
</template>

<style>

</style>
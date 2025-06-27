<script>

import {VehicleService} from "../services/vehicle.service.js";
import {VehicleAssembler} from "../services/vehicle.assembler.js";
import {UserSessionService as UserService} from "../../shared/services/user-session.service.js";
import DevicesList from "../components/devices-list.component.vue";
import {VehicleSessionService} from "../../shared/services/vehicle-session.service.js";

export default {
  name: "available-devices-management",
  components: {DevicesList},
  data() {
    return {
      availableDevices: [],
      vehicleService: null,
      vehiclesUser: [],
      userId: 0,
      devicesActivator: false,
    };
  },
  created() {
    this.userId = UserService.getUserId();
    //this.userId=1;
    console.log(this.userId);
    this.vehicleService = new VehicleService();
    this.vehicleService.getByUserId(this.userId).then(response => {
      this.vehiclesUser = VehicleAssembler.toEntitiesFromResponse(response);
      console.log("Vehicles loaded: ", this.vehiclesUser);
    }).catch(error => {
      console.error("Error loading vehicles: ", error);
    })
  },
  methods: {
    showDevicesAvailables(){
      this.devicesActivator= !this.devicesActivator;
    },
    currentVehicle(vehicle){
      VehicleSessionService.setVehicleId(vehicle.id);
      console.log("Current vehicle: ", vehicle);
    },
    newCarSelected() {
      this.$router.push("/vehicle-registration-management");
    }
  }
}
</script>

<template>
  <div class="available-devices-management" style="display: flex; flex-direction: row; justify-content: center;">
    <div class="column-1" style="display: flex; flex-direction: column; width: 30vw;height: 100%; padding: 1rem; ">
      <div class="content-row-1" style="background: rgb(239,239,239); height: 100% ;padding: 2rem">
        <h1 style="font-size: clamp(1rem, 2vw, 2rem)">{{ $t('connectionGuide.title') }}</h1>
        <h2 style="font-size: clamp(1rem, 2vw, 2rem)">{{ $t('connectionGuide.subtitle') }}</h2>
        <ul style="list-style: none;">
          <li style="font-size: clamp(1rem, 2vw, 2rem);font-weight: 500; margin-top: 2rem">
            {{ $t('connectionGuide.step1') }}
          </li>
          <li style="font-size: clamp(1rem, 2vw, 2rem);font-weight: 500; margin-top: 2rem">
            {{ $t('connectionGuide.step2') }}
          </li>
          <li style="font-size: clamp(1rem, 2vw, 2rem);font-weight: 500; margin-top: 2rem">
            {{ $t('connectionGuide.step3') }}
          </li>
          <li style="font-size: clamp(1rem, 2vw, 2rem);font-weight: 500; margin-top: 2rem">
            {{ $t('connectionGuide.step4') }}
          </li>
          <li style="font-size: clamp(1rem, 2vw, 2rem);font-weight: 500; margin-top: 2rem">
            {{ $t('connectionGuide.step5') }}
          </li>
        </ul>
        <div class="img-container" style="width: 100%; text-align: center ">
          <img style="width: clamp(10px, 10vw, 250px); margin-top: 2.5rem; "
               src="https://preview.redd.it/vehixscanner-v0-1h251yt57b8f1.png?width=640&crop=smart&auto=webp&s=2115a0c87faa1bbc800169792888e1448662639e">
        </div>
      </div>
    </div>

    <div class="column-2"
         style="display: flex; flex-direction: column; width: 40vw;height: calc(100vh - 65px); padding: 1rem">
      <div class="content-row-1" style="background: #f5f5f5 ; height: 100% ;padding: 1rem">
        <button @click="showDevicesAvailables()">Tap to activate the sync</button>
      </div>
      <div class="content-row-2" style="background: white ; height: 100% ;padding: 1rem">
        <h2>{{ $t('connectionGuide.availableDevices') }}</h2>
        <devices-list class="list-availables-devices"
                      :vehicles="vehiclesUser"
                      @car-selected="currentVehicle"
                      @new-car-selected="newCarSelected"
                      v-if="devicesActivator">
          {{ $t('dashboard.scanHistoryContent') }}
        </devices-list>
      </div>
    </div>

    <div class="column-3"
         style="display: flex; flex-direction: column; width: 30vw;height: calc(100vh - 65px); padding: 1rem">
      <div class="content-row-1" style="background: #f5f5f5 ; height: 100% ;padding: 1rem">
        <h2>{{ $t('dashboard.scanHistory') }}</h2>
          <p>{{ $t('dashboard.scanHistoryContent') }}</p>

      </div>
    </div>


  </div>

</template>

<style>

</style>
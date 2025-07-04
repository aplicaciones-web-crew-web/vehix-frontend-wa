<script>
import LogInCard from "../components/log-in-card.component.vue";
import RegistryCard from "../components/registry-card.component.vue";

export default {
  name: "log-in-management",
  components: {RegistryCard, LogInCard},
  data() {
    return {
      currentMode: "login",
    }
  },
  methods: {
    /**
     * Toggles between login and registration modes.
     * If the current mode is "login", it switches to "registration" and vice versa.
     * @author U202318274 Julca Minaya Sergio Gino
     */
    toggleMode() {
      this.currentMode = this.currentMode === "login" ? "registration" : "login";
    },
  }
}
</script>

<template>
  <div class="log-in-management-container">
    <log-in-card v-if="currentMode==='login'" @toggle-mode="toggleMode()"></log-in-card>
    <registry-card v-else-if="currentMode === 'registration'" @toggle-mode="toggleMode"></registry-card>
  </div>
</template>


<style>
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
</style>
<script>
import LogInCard from "../components/log-in-card.component.vue";
import RegistryCard from "../components/registry-card.component.vue";
import { useAuthenticationStore } from "../services/authentication.store.js";
import { SignInRequest } from "../model/sign-in.request.js";

export default {
  name: "log-in-management",
  components: {RegistryCard, LogInCard},
  data() {
    return {
      currentMode: "login",
      dni: "",
      password: "",
    }
  },
  methods: {
    toggleMode() {
      this.currentMode = this.currentMode === "login" ? "registration" : "login";
    },
    onSignIn() {
      const authenticationStore = useAuthenticationStore();
      const signInRequest = new SignInRequest(this.dni, this.password);
      authenticationStore.signIn(signInRequest, this.$router);
    }
  }
}
</script>

<template>
  <div class="log-in-management-container">
    <log-in-card
      v-if="currentMode==='login'"
      :dni="dni"
      :password="password"
      @update:dni="dni = $event"
      @update:password="password = $event"
      @sign-in="onSignIn"
      @toggle-mode="toggleMode"
    ></log-in-card>
    <registry-card
      v-else-if="currentMode === 'registration'"
      @toggle-mode="toggleMode"
    ></registry-card>
  </div>
</template>

<style>
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
</style>

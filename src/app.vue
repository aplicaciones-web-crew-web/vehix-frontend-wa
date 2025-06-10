<script>
import LanguageSwitcher from "./public/components/language-switcher.component.vue";

export default {
  name: 'App',
  components: {LanguageSwitcher},
  data() {
    return {
      drawer: false,
      items: [
        {label: 'option.home',       to: '/home', icon: 'pi pi-home'},
        {label: 'option.library',      to: '/library', icon: 'pi pi-book'}, // Corregido a /library
        {label: 'option.maintenance', to: '/maintenance', icon: 'pi pi-cog'},
        {label: 'option.sync', to: '/sync', icon: 'pi pi-sync'},
        {label: 'option.profile', to: '/profile', icon: 'pi pi-user'},
      ],
      showNavBar: true
    }
  },

  methods: {
    /**
     * Toggles the visibility of the drawer.
     * This method is called when the menu button is clicked.
     * @author U202318274 Julca Minaya Sergio Gino
     */
    toggleDrawer() {
      this.drawer = !this.drawer
    },

    /**
     * Determines if the navigation bar should be shown based on the current route.
     * @returns {boolean} True if the navigation bar should be shown, false otherwise.
     * @author U202318274 Julca Minaya Sergio Gino
     */
    shouldShowNavBar() {
      const hiddenRoutes = ['/login','/subscriptions','/payment-management', '/subscription-plan-management'];
      return !hiddenRoutes.includes(this.$route.path);
    }
  },

  /**
   * Watches for changes in the route and updates the visibility of the navigation bar.
   * This is necessary to ensure that the navigation bar is hidden on specific routes.
   * @author U202318274 Julca Minaya Sergio Gino
   */
  watch: {
    '$route'(to, from) {
      this.showNavBar = this.shouldShowNavBar();
    }
  },

  /**
   * Lifecycle hook that runs when the component is mounted.
   * It checks if the navigation bar should be shown based on the current route.
   * @author U202318274 Julca Minaya Sergio Gino
   */
  mounted() {
    this.showNavBar = this.shouldShowNavBar();
  }
}

</script>

<template>
  <!--Montserrat-->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet">

  <pv-toast/>
  <header v-if="showNavBar">
    <pv-toolbar class="bg-white">
      <template #start>
        <pv-button class="p-button-text" icon="pi pi-bars" @click="toggleDrawer"/>
        <h1>VEHIX</h1>
      </template>
      <template #center>
        <div class="flex-column">
          <pv-button v-for="item in items" :key="item.label" as-child v-slot="slotProps" class="bg-white">
            <router-link :to="item.to" :class="slotProps['class']">
              <i :class="'pi pi-'+ item.icon"></i>
              {{ $t(item.label) }}
            </router-link>
          </pv-button>
        </div>
      </template>
      <template #end>
        <language-switcher/>
      </template>
    </pv-toolbar>
    <pv-drawer v-model:visible="drawer"/>
  </header>
  <main>
    <router-view/>
  </main>

</template>
<style scoped>
header {
  font-family: 'Montserrat', sans-serif;
}

h1 {
  letter-spacing: 20px;
  color: black;
}

main {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>

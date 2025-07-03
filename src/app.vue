<script>
import LanguageSwitcher from "./public/components/language-switcher.component.vue";

export default {
  name: 'App',
  components: {LanguageSwitcher},
  data() {
    return {
      items: [
        {label: 'option.home', to: '/home', icon: 'pi pi-home'},
        {label: 'option.library', to: '/library', icon: 'pi pi-book'},
        {label: 'option.maintenance', to: '/maintenance', icon: 'pi pi-cog'},
        {label: 'option.sync', to: '/sync', icon: 'pi pi-sync'},
        {label: 'option.profile', to: '/profile', icon: 'pi pi-user'},
      ],
      showNavBar: true
    }
  },

  methods: {


    /**
     * Determines if the navigation bar should be shown based on the current route.
     * @returns {boolean} True if the navigation bar should be shown, false otherwise.
     * @author U202318274 Julca Minaya Sergio Gino
     */
    shouldShowNavBar() {
      const hiddenRoutes = ['/login', '/subscriptions', '/payment-management', '/subscription-plan-management'];
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
    <pv-toolbar class="menu-toolbar-container">
      <template #start>
        <div class="logo-container">
          <h1>VEHIX</h1>
        </div>
      </template>
      <template #center>
        <div class="menu-components-container">
          <pv-button v-for="item in items" :key="item.label" as-child v-slot="slotProps" class="menu-button-container">
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
  </header>
  <main>
    <router-view/>
  </main>

</template>
<style scoped>
header {
  font-family: 'Montserrat', sans-serif;

  flex: 0 0 auto;

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

.menu-toolbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 4rem;
  padding-right: 4rem;
}

.menu-components-container {
  display: flex;
  flex-flow: row wrap;
  gap: 1rem
}

@media only screen and (max-width: 1100px) {
  .menu-toolbar-container {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    gap: 1rem;
  }
}

@media only screen and (max-width: 600px) {
  .menu-toolbar-container {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    gap: 1rem;
  }

  .menu-components-container {
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

  }

  .menu-button-container {
    width: 100%;
    text-align: center;
    gap: 1rem;
  }


}
</style>

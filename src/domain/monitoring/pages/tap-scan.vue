<script>
import BadPractices from "../components/bad-practices.vue";
import SimpleIssues from "../components/simple-issues.vue";
import TechnicalErrors from "../components/technical-errors.vue";
import CarPresentation from "../components/car-presentation.vue";

export default {
  name: "tap-scan",
  components: {CarPresentation, TechnicalErrors, SimpleIssues, BadPractices}
}
</script>

<template>
  <div class="diagnostic-wrapper">

    <div class="left-column">
      <car-presentation></car-presentation>
    </div>

    <div class="center-column">
      <simple-issues></simple-issues>
      <bad-practices></bad-practices>
    </div>

    <div class="right-column">
      <technical-errors></technical-errors>
    </div>

  </div>
</template>

<style scoped>
.diagnostic-wrapper {
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
  padding-right: 2rem;
}

.left-column {
  position: absolute;
  left: 10rem;
  top: 15rem;
}

.center-column {
  margin-right: 3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-top: 2rem;
}

.right-column {
  margin-top: 2rem;
  margin-right: 5rem;
}
</style>

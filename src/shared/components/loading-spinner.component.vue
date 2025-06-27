<script>
export default {
  name: "loading-spinner",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<template>
  <div v-if="visible" class="loader-container">
    <pv-loading style="width: 100px; height: 100px" strokeWidth="6" fill="transparent"
                aria-label="Loading Progress Spinner" >
    </pv-loading>
  </div>
</template>

<style>
.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
</style>
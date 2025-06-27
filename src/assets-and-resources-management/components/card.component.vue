<template>
  <div :class="['resource-card', variantClass]" @click="goToRoute">
    <i :class="['pi', icon, 'card-icon']"></i>
    <h3>{{ $t(titleKey) }}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'resource-card',
  props: {
    titleKey: { type: String, required: true },
    icon: { type: String, required: true },
    route: { type: String, required: true },
    variant: { type: String, default: 'side' }
  },
  computed: {
    variantClass() {
      return this.variant === 'center' ? 'resource-card-center' : 'resource-card-side';
    }
  },
  methods: {
    goToRoute() {
      this.$router.push({ name: this.route });
    }
  }
});
</script>

<style scoped>
.resource-card {
  background: #18191a;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(255,255,255,0.08);
  color: #fff;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-end;
  padding: 24px;
  cursor: pointer;
  transition: box-shadow 0.2s;
  border: 6px solid #B2B2B3;
}
.resource-card-side {
  min-height: 240px;
  height: 240px;
  align-self: flex-start;
}
.resource-card-center {
  min-height: 280px;
  height: 280px;
  align-self: stretch;
}
.resource-card:hover {
  box-shadow: 0 0 16px 0 rgba(255,255,255,0.18);
}
.card-icon {
  font-size: 2.5rem;
  margin-bottom: 0;
  margin-left: 16px;
  color: #b3b3b3;
}
h3 {
  font-family: 'Segoe UI', Arial, sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0;
  color: #E0E0E1;
}
@media (max-width: 900px) {
  .resource-card-side {
    min-height: 120px;
    height: 120px;
  }
  .resource-card-center {
    min-height: 180px;
    height: 180px;
  }
  .card-icon {
    font-size: 1.5rem;
    margin-left: 8px;
  }
  h3 {
    font-size: 1.3rem;
  }
}
@media (max-width: 600px) {
  .resource-card {
    padding: 12px;
    border-width: 3px;
  }
  .resource-card-side,
  .resource-card-center {
    min-height: 80px;
    height: 80px;
  }
  .card-icon {
    font-size: 1rem;
    margin-left: 4px;
  }
  h3 {
    font-size: 1rem;
  }
}
</style>
<script lang="ts">
import { defineComponent } from 'vue';
import ResourceCard from './card.component.vue';
import ResourceCardService from '../services/card-service';

export default defineComponent({
  name: 'resource-card-list',
  components: { ResourceCard },
  data() {
    return {
      cards: []
    }
  },
  created() {
    this.cards = ResourceCardService.getCards();
  }
});
</script>

<template>
  <div class="resource-card-list">
    <resource-card
        v-for="card in cards"
        :key="card.id"
        :titleKey="card.titleKey"
        :icon="card.icon"
        :route="card.route"
    />
  </div>
</template>

<style scoped>
.resource-card-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 24px;
  padding: 32px;
}
</style>
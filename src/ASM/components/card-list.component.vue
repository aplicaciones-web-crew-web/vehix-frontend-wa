<script lang="ts">
import {defineComponent} from 'vue';
import ResourceCard from './card.component.vue';
import ResourceCardService from '../services/card-service';

export default defineComponent({
  name: 'resource-card-list',
  components: {ResourceCard},
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
    <resource-card class="resource-card"
        v-for="card in cards"
        :key="card.id"
        :titleKey="card.titleKey"
        :icon="card.icon"
        :route="card.route"
    />
  </div>
</template>

<style>
*{
  text-align: center;
}
.resource-card-list {
  display: flex;
  flex-flow: row wrap;
  margin: 1.5rem;
  justify-content: center;
  align-items: center;
  height: 80%;
  gap: 1rem;
  text-align: center;
}

.resource-card {
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

}

@media only screen and (max-width: 700px) {
  .resource-card {
    width: 100%;
  }
}
</style>
/**
* Imports required modules and components for the resource view.
* Defines props, components, and translation logic.
* @author Piero Hugo Elescano Leon U202313354
*/
<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import ResourceCardList from '../components/card-list.component.vue';
import VideosComponent from '../pages/videos.component.vue';
import ArticlesComponent from '../pages/articles.component.vue';
import SectorAdvancesComponent from '../pages/sector-advances.component.vue';
import ManualsComponent from '../pages/manuals.component.vue';
import RecommendationComponent from '../pages/recommendation.component.vue';
import NewsComponent from '../pages/news.component.vue';

export default defineComponent({
  name: 'ResourceView',
  components: { ResourceCardList, VideosComponent, ArticlesComponent, SectorAdvancesComponent, ManualsComponent, RecommendationComponent, NewsComponent },
  props: {
    titleKey: {
      type: String,
      default: 'resources.title'
    }
  },
  setup(props) {
    const { t } = useI18n();
    return { t, ...props };
  }
});
</script>
<!--
/**
 * Main resource view that displays different components based on the title key.
 * Renders the translated title and an external link if applicable.
 * @author Piero Hugo Elescano Leon U202313354
 */
-->
<template>
  <div class="resource-view">
    <h1>{{ t(titleKey) }}</h1>
    <a
        v-if="titleKey !== 'resources.title'"
        class="more-link"
        href="https://www.automotive-technology.com/"
        target="_blank"
        rel="noopener"
    >
      {{ t('more.link') }}
    </a>
    <resource-card-list class="card-resources-container" v-if="titleKey === 'resources.title'" />
    <videos-component class="card-videos-container" v-else-if="titleKey === 'card.videos'" />
    <articles-component class="card-articles-container" v-else-if="titleKey === 'card.technical'" />
    <sector-advances-component class="card-sector-advances-container" v-else-if="titleKey === 'card.advances'" />
    <recommendation-component class="card-recommendation-container" v-else-if="titleKey === 'card.recommendations'" />
    <news-component class="card-news-container" v-else-if="titleKey === 'card.news'" />
  </div>
</template>


/*
* Styles for the resource view and its responsive elements.
* Includes styles for the container, title, and external link.
* @author Piero Hugo Elescano Leon U202313354
*/
<style>

h1 {
  font-size: 2rem;
  text-transform: uppercase;
}
.more-link {
  position: fixed;
  right: 24px;
  bottom: 24px;
  color: #000;
  background: transparent;
  padding: 10px 18px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  box-shadow: none;
  transition: color 0.2s;
  z-index: 1000;
}
.more-link:hover {
  text-decoration: underline;
  background: transparent;
  color: #1976d2;
}
.resource-view{
  height: clamp( 100vh, 100%, 100vh);
}
@media (max-width: 900px) {
  .resource-view {
    padding: 24px;
  }
  h1 {
    font-size: 1.3rem;
  }
}
@media (max-width: 600px) {
  .resource-view {
    padding: 8px;
  }
  h1 {
    font-size: 1rem;
  }
}
</style>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'RecommendationsComponent',
  setup() {
    const { messages, locale } = useI18n();
    const recommendationsText = computed(() => {
      const recommendations = messages.value[locale.value]?.recommendations;
      if (recommendations && typeof recommendations === 'object' && 'text' in recommendations) {
        const arr = (recommendations as Record<string, unknown>).text;
        return Array.isArray(arr) ? (arr as string[]).join('<br><br>') : '';
      }
      return '';
    });
    return { recommendationsText };
  }
});
</script>

<template>
  <div class="recommendations-view">
    <img src="/img-recommendations.png" alt="Recomendaciones" class="recommendations-image" />
    <p class="recommendations-text" v-html="recommendationsText"></p>
  </div>
</template>

<style scoped>
.recommendations-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
}
.recommendations-image {
  width: 100%;
  max-width: 700px;
  border-radius: 12px;
  margin-bottom: 24px;
}
.recommendations-text {
  font-size: 1.2rem;
  text-align: justify;
  max-width: 700px;
  white-space: pre-line;
}
</style>
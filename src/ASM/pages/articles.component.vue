<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'ArticlesComponent',
  setup() {
    const { messages, locale } = useI18n();
    const articleText = computed(() => {
      const articles = messages.value[locale.value]?.articles;
      if (articles && typeof articles === 'object' && 'text' in articles) {
        const arr = (articles as Record<string, unknown>).text;
        return Array.isArray(arr) ? (arr as string[]).join('<br><br>') : '';
      }
      return '';
    });
    return { articleText };
  }
});
</script>

<template>
  <div class="article-view">
    <img src="/img-technical.png" alt="Artículo" class="article-image" />
    <p class="article-text" v-html="articleText"></p>
  </div>
</template>

<style scoped>
.article-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
}
.article-image {
  width: 100%;
  max-width: 700px;
  border-radius: 12px;
  margin-bottom: 24px;
}
.article-text {
  font-size: 1.2rem;
  text-align: justify;
  max-width: 700px;
  white-space: pre-line;
}
</style>
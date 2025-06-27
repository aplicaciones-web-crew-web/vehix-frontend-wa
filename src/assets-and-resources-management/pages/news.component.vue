<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { NewsService } from '../services/new-api';

export default defineComponent({
  name: 'NewsComponent',
  setup() {
    const news = ref([]);
    const loading = ref(true);
    const error = ref('');
    const newsService = new NewsService();

    onMounted(async () => {
      try {
        const data = await newsService.getNews();
        if (data.results) {
          news.value = data.results;
        } else {
          error.value = 'News not found.';
        }
      } catch (e) {
        error.value = 'Failed to load news';
      } finally {
        loading.value = false;
      }
    });

    return { news, loading, error };
  }
});
</script>

<template>
  <div class="news-view">
    <div v-if="loading">Loading news...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="news-grid">
      <div v-for="item in news" :key="item.link" class="news-card">
        <h3>
          <a :href="item.link" target="_blank" rel="noopener">{{ item.title }}</a>
        </h3>
        <p>{{ item.description }}</p>
        <small>{{ item.pubDate }}</small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-view {
  padding: 32px;
  max-width: 900px;
  margin: 0 auto;
}
.news-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.news-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 18px;
  background: #fafbfc;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.news-card h3 {
  margin: 0 0 8px 0;
  font-size: 1.1rem;
  color: #000;
}
.news-card h3 a {
  color: #000;
  text-decoration: none;
}
.news-card h3 a:hover {
  color: #1976d2;
  text-decoration: underline;
}
.news-card p {
  margin: 0 0 8px 0;
  color: #333;
}
.news-card small {
  color: #888;
}
@media (max-width: 700px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
}
</style>
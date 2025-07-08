<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

const videos = [
  { id: 'U94wDbctu1U', titleKey: 'videos.list.0' },
  { id: 'jp9d-HhblD0', titleKey: 'videos.list.1' },
  { id: 'OhupKU3v8Xs', titleKey: 'videos.list.2' },
  { id: 'aqa7gtqCIUY', titleKey: 'videos.list.3' },
  { id: 's6o8QKzZYMI', titleKey: 'videos.list.4' },
  { id: 'RgKAFK5djSk', titleKey: 'videos.list.5' }
];

export default defineComponent({
  name: 'videos.component.vue',
  setup() {
    const { t } = useI18n();
    return { t, videos };
  }
});
</script>

<template>
  <div class="videos-grid">
    <div v-for="(video, idx) in videos" :key="video.id" class="video-card">
      <iframe
          :src="`https://www.youtube.com/embed/${video.id}`"
          frameborder="0"
          allowfullscreen
      ></iframe>
      <h3>{{ t(video.titleKey) }}</h3>
    </div>
  </div>
</template>

<style scoped>
.videos-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  padding: 24px;
}
.video-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}
iframe {
  width: 100%;
  min-width: 280px;
  max-width: 400px;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  margin-bottom: 12px;
}
h3 {
  font-size: 1rem;
  text-align: center;
}
@media (max-width: 900px) {
  .videos-grid {
    grid-template-columns: 1fr;
  }
}
</style>
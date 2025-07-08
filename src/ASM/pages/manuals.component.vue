<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'ManualsComponent',
  setup() {
    const { messages, locale } = useI18n();
    const manualText = computed(() => {
      const manual = messages.value[locale.value]?.manual;
      if (manual && typeof manual === 'object' && 'text' in manual) {
        const arr = (manual as Record<string, unknown>).text;
        return Array.isArray(arr) ? (arr as string[]).join('<br><br>') : '';
      }
      return '';
    });
    return { manualText };
  }
});
</script>

<template>
  <div class="manual-view">
    <img src="/img-manual-technical.png" alt="Manual" class="manual-image" />
    <p class="manual-text" v-html="manualText"></p>
  </div>
</template>

<style scoped>
.manual-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
}
.manual-image {
  width: 100%;
  max-width: 700px;
  border-radius: 12px;
  margin-bottom: 24px;
}
.manual-text {
  font-size: 1.2rem;
  text-align: justify;
  max-width: 700px;
  white-space: pre-line;
}
</style>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'SectorAdvancesComponent',
  setup() {
    const { messages, locale } = useI18n();
    const advancesText = computed(() => {
      const advances = messages.value[locale.value]?.sectorAdvances;
      if (advances && typeof advances === 'object' && 'text' in advances) {
        const arr = (advances as Record<string, unknown>).text;
        return Array.isArray(arr) ? (arr as string[]).join('<br><br>') : '';
      }
      return '';
    });
    return { advancesText };
  }
});
</script>

<template>
  <div class="advances-view">
    <img src="/img-adavance-automotive.png" alt="Avances del sector" class="advances-image" />
    <p class="advances-text" v-html="advancesText"></p>
  </div>
</template>

<style scoped>
.advances-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
}
.advances-image {
  width: 100%;
  max-width: 700px;
  border-radius: 12px;
  margin-bottom: 24px;
}
.advances-text {
  font-size: 1.2rem;
  text-align: justify;
  max-width: 700px;
  white-space: pre-line;
}
</style>
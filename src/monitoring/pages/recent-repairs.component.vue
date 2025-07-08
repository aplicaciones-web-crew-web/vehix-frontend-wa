<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  name: 'recent-repairs',
  setup() {
    const { locale, t } = useI18n();

    const repairsData = {
      en: [
        {
          id: 1,
          title: 'Low system voltage',
          description: 'The system detected low voltage levels.',
          suggestSolution: 'Check battery terminals and charging system.',
          solved: true
        },
        {
          id: 2,
          title: 'Fuel sensor out of range',
          description: 'The fuel sensor sent inconsistent values.',
          suggestSolution: 'Inspect wiring and replace sensor if necessary.',
          solved: true
        },
        {
          id: 3,
          title: 'Oil pressure low',
          description: 'Recorded oil pressure below expected value.',
          suggestSolution: 'Verify oil level and inspect for leaks.',
          solved: true
        },
        {
          id: 4,
          title: 'Cooling system alert',
          description: 'High temperature detected during last trip.',
          suggestSolution: 'Check coolant level and radiator fan.',
          solved: true
        }
      ],
      es: [
        {
          id: 1,
          title: 'Bajo voltaje del sistema',
          description: 'El sistema detectó niveles bajos de voltaje.',
          suggestSolution: 'Verifica los terminales de la batería y el sistema de carga.',
          solved: true
        },
        {
          id: 2,
          title: 'Sensor de combustible fuera de rango',
          description: 'El sensor de combustible envió valores inconsistentes.',
          suggestSolution: 'Inspecciona el cableado y reemplaza el sensor si es necesario.',
          solved: true
        },
        {
          id: 3,
          title: 'Presión de aceite baja',
          description: 'Se registró una presión de aceite inferior a la esperada.',
          suggestSolution: 'Verifica el nivel de aceite y busca fugas.',
          solved: true
        },
        {
          id: 4,
          title: 'Alerta del sistema de enfriamiento',
          description: 'Se detectó alta temperatura durante el último recorrido.',
          suggestSolution: 'Revisa el nivel de refrigerante y el ventilador del radiador.',
          solved: true
        }
      ]
    };

    const repairs = computed(() => repairsData[locale.value] || repairsData.en);

    return { repairs, t };
  }
};
</script>

<template>
  <div class="recent-repairs-container">
    <ul class="repairs-list">
      <li v-for="rep in repairs" :key="rep.id" class="repair-item">
        <div class="item-header">
          <span class="problem-title">{{ rep.title }}</span>
          <span class="state-label">{{ t('diagnostic.solved') }}</span>
          <span class="check-icon">✔</span>
        </div>
        <div class="problem-description">{{ rep.description }}</div>
        <div class="suggested-solution"><strong>{{ t('diagnostic.suggestedSolution') }}</strong> {{ rep.suggestSolution }}</div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.recent-repairs-container {
  display: flex;
  justify-content: center;
  padding: 1rem;
}
.repairs-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  font-family: "Roboto", sans-serif;
}
.repair-item {
  background-color: #f5f5f5;
  padding: 1rem;
  margin-bottom: .5rem;
  position: relative;
}
.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: .5rem;
}
.problem-title {
  font-weight: bold;
  font-size: 1.2rem;
}
.state-label {
  color: grey;
  margin-right: .25rem;
}
.check-icon {
  color: grey;
}
.problem-description {
  margin-bottom: .5rem;
}
</style>
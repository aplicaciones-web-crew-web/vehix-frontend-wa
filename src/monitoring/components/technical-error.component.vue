<script>

export default {
  name: "technical-error",
  props: {
    failures: {
      type: Array,
      required: true
    },
    odbErrors: {
      type: Array,
      required: true
    },
    emptyMessage: {
      type: String,
    },
  },
  created() {
    console.log("OdbErrors:", this.badPractices);
    console.log("Failures:", this.pendingFailuresToShow);
  },
  computed: {
    odbErrorsToShow() {
      if (!this.failures || !this.odbErrors) return [];

      return this.failures.map(failure => {
        const odb = this.odbErrors.find(odb => odb.id === failure.odbErrorId);
        if (odb) {
          return {
            failureId: failure.id,
            errorCode: odb.errorCode,
            errorTitle: odb.errorTitle,
            suggestSolution: failure.suggestSolution

          };
        }
        return null;
      }).filter(Boolean);
    }
  }
}

</script>

<template>
  <div class="odb-errors-box">
    <h3>Odb Errors</h3>

    <div v-if="odbErrors.length === 0">
      {{ emptyMessage }}
    </div>

    <ul v-else>
      <li v-for="odb in odbErrorsToShow" :key="odb.failureId" class="odb-error-item">
        <div class="comments">
          <div class="title">
            <span class="icon">❌</span>
            <span class="text">{{ odb.errorCode }}-{{ odb.errorTitle }}</span>
          </div>
          <div class="solution">
            <span class="title">Suggest Solution: 🛠️{{ odb.suggestSolution }}</span>
          </div>
        </div>

      </li>
    </ul>
  </div>
</template>

<style scoped>
.odb-errors-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #EEEEEE;
  border-radius: 50px;
  padding: 3rem;
}

.odb-error-item {
  display: flex;
  list-style: none;
}
</style>
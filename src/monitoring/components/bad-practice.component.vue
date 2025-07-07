<script>

export default {
  name: "bad-practice",
  props: {
    failures: {
      type: Array,
      required: true
    },
    badPractices: {
      type: Array,
      required: true
    },
    emptyMessage: {
      type: String,
      default: "The vehicle is in good condition."
    }
  },
  computed: {
    badPracticesToShow() {
      if (!this.failures || !this.badPractices) return [];

      return this.failures
          .map(failure => {
            const bp = this.badPractices.find(b => b.id === failure.badPracticeId);
            if (bp) {
              return {
                failureId: failure.id,
                description: bp.descriptionBadPractice
              };
            }
            return null;
          })
          .filter(Boolean);
    }
  }
}
</script>

<template>
  <div class="bad-practices-box">
    <h3>Bad Practices</h3>

    <div v-if="badPracticesToShow.length === 0">
      {{ emptyMessage }}
    </div>

    <ul v-else>
      <li v-for="bp in badPracticesToShow" :key="bp.failureId" class="bad-practice-item">
        <span class="icon">-</span>
        <span class="text">{{ bp.description }}</span>
      </li>
    </ul>
  </div>
</template>

<style>
.bad-practices-box h3{
  color: #111;
}

.bad-practices-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  padding: 3rem;
  background-color: #EEEEEE;
  width: 100%;
  height: auto;
}

.bad-practice-item {
  list-style: none;
}

</style>
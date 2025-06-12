<script setup>
defineProps({
  title: String,
  description: String,
  solution: String,
  isSolved: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="failure-card">
    <div class="card-header">
      <h3 class="card-title">{{ title }}</h3>
    </div>

    <div class="card-content">
      <p>{{ description }}</p>
      <p><strong>Suggested solution:</strong> {{ solution }}</p>

      <label class="checkbox-wrapper">
        <input type="checkbox" :checked="isSolved" disabled />
        <span class="black">{{ isSolved ? 'Solved' : 'Pending' }}</span>
      </label>
    </div>
  </div>
</template>

<style scoped>
.failure-card {
  width: 300px;
  margin: 10px;
  padding: 10px;
  border-left: 5px solid #3f51b5;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  font-family: 'Montserrat', sans-serif;
}

.card-title {
  font-weight: bold;
  margin: 0;
}

.card-content p {
  margin: 8px 0;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.black {
  color: black;
}
</style>
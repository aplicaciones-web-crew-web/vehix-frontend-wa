<script setup>
defineProps(['name', 'address', 'distance', 'phone'])
</script>

<template>
  <div class="card">
    <h3>{{ name }}</h3>
    <p><strong>Teléfono:</strong> {{ phone }}</p>
    <p><strong>Dirección:</strong> {{ address }}</p>
    <p><strong>Distancia:</strong> {{ distance }} metros</p>
  </div>
</template>

<style scoped>
.card {
  background-color: #DBDBDB;
  border-radius: 20px;
  padding: 8px 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card h3 {
  font-family: 'Montserrat', sans-serif;
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 8px;
}

.card p {
  font-size: 22px;
  margin: 4px 0;
  text-align: left;
}

.card p strong {
  font-family: 'Roboto', sans-serif;
  font-weight: 400; /* Regular */
}

.card p:not(strong) {
  font-family: 'Roboto', sans-serif;
  font-weight: 300; /* Light */
}
</style>

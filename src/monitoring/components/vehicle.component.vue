<script>

export default {
  name: "vehicle",
  props: {
    urlImage: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    }
  },
  methods: {
    getRandomLifeSpanInDecimal() {
      const min = 1;
      const max = 10;
      return (Math.random() * (max - min) + min).toFixed(2);
    },

  },
  created() {
    console.log("nAME DEL L VEHICLS", this.name);
  }
}
</script>

<template>
  <div class="vehicle-card-container">
    <div class="vehicle-image-container">
      <img :src="urlImage" alt="">
    </div>
    <div class="vehicle-brand">
      <h2>{{ $t('vehicleCard.brand') }}</h2>
      <h3>{{ brand }}</h3>
    </div>
    <div class="vehicle-model">
      <h2>{{ $t('vehicleCard.model') }}</h2>
      <h3>{{ model }}</h3>
    </div>

    <div class="vehicle-life-span">
      <h2>{{ $t('vehicleCard.lifeSpan') }}</h2>
      <h3>{{ getRandomLifeSpanInDecimal() }}</h3>
    </div>

    <div class="vehicle-name">
      <h2>{{ $t('vehicleCard.name') }}</h2>
      <h3>{{ name }}</h3>
    </div>

  </div>
</template>

<style>

img {
  width: clamp( 200px, 90%, 100%);
}
.vehicle-card-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: white;
}

.vehicle-brand{
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: white;
}

.vehicle-model{


  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: white;

}

.vehicle-life-span{
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: white;

}
.vehicle-name{
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: white;

}
h3{
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-family: 'Montserrat', sans-serif;
  color: white;

}
h1{
  font-size: clamp(1.5rem, 2vw, 2rem);
  color: white;

}
</style>
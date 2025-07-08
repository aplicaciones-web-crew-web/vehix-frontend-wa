<script>
export default {
  name: 'alert-card',
  props: {
    title: {type: String, required: true},
    message: {type: String, required: true},
    isVisible: {type: Boolean, default: false},
    type: {type: String, default: 'error', validator: (value) => ['info', 'warn', 'error', 'success'].includes(value)},
  },
  data() {
    return {
      visible: true
    };
  },
  methods: {
    hideMessage(action) {
      this.visible = false;
      this.$emit('closed', action);
    },
  }
}
</script>

<template>
  <div>
    <div v-if="visible" class="modal-overlay"></div>
    <div v-if="visible" :class="['alert-message-container', `alert-${type}`]">
      <!--<div class="alert-header">
        <h3 class="alert-title">{{ title }}</h3>
        <pv-button @click="hideMessage('x-button')" class="alert-close-btn">&times;</pv-button>
      </div>
      <p class="alert-text">{{ message }}</p>-->
      <div class="alert-message-container-modal">
        <div class="alert-texts">
          <div class="alert-title">
          <h3>{{ title }}</h3></div>
          <div class="alert-message">
          <p class="alert-text">{{ message }}</p></div>
        </div>
        <div class="button-container">
          <pv-button @click="hideMessage('x-button')" class="alert-close-btn">&times;</pv-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
h3{
  font-size: 32px;
  color: black;
}
.alert-message p{
  font-size: 17px;
  color: rgba(0, 0, 0, 0.75);
}
.alert-message-container-modal{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

}
.alert-texts{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  gap: 0.2rem;

}
.alert-message-container {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;

  background-color: var(--p-surface-0, #ffffff);
  color: var(--p-text-color, #333333);
  box-shadow: var(--p-shadow-3, 0 8px 16px rgba(0, 0, 0, 0.2));
  border: 1px solid transparent;
  padding: 1.5rem 2rem;
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  text-align: center;
}

.button-container{
  display: flex;
  justify-content: start;
  align-items: start;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
.alert-close-btn:hover {
  color: var(--p-text-color, white);
  text-align: center;
}

</style>
<script>
import {BadPractices} from "../model/bad-practices.entity.js";
import { IssuesService } from "../services/bad-practices.service.js"
export default {
  name: 'BadPractices',
  data() {
    return {
      badPractices: []
    }
  },

}
</script>

<template>
  <div class="bad-practices-box">
    <h3>Bad Practices</h3>
    <ul>
      <li v-for="practice in badPractices" :key="practice.id">
        {{ practice.description }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.bad-practices-box {
  background: #eeeeee;
  color: #1a1a1a;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.25);
  padding: 35px;
  height: 18rem;
  width: 420px;
  font-family: 'Montserrat', sans-serif;
}

.bad-practices-box h3 {
  font-size: 22px;
  margin-bottom: 20px;
  color: #111;
  font-weight: 700;
}

.bad-practices-box ul {
  list-style-type: disc;
  padding-left: 20px;
}

.bad-practices-box li {
  font-size: 16px;
  padding: 6px 0;
  font-weight: 500;
}

</style>

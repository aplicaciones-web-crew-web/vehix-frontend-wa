<script>
import {UserSessionService} from "../../shared/services/user-session.service.js";
import {ProfileApiService} from "../services/profile-api.service.js";

export default {
  name: "profile-management",
  data() {
    return {
      profileService: null,
      user: {
        name: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        planId: 0,
      },
      plan: { name: 'Plan Pro' },
    }
  },
  created() {
    this.profileService = new ProfileApiService();
    const userId = UserSessionService.getUserId();
    if (userId) {
      this.profileService.getUserById(userId).then(res => {
        this.user = res.data;
        if (this.user.planId) {
          this.profileService.getPlanById(this.user.planId).then(r => {
            this.plan = r.data;
          }).catch(() => {});
        }
      }).catch(() => {});
    }
  },
  methods:{
    logOut(){
      UserSessionService.clearSession();
      this.$router.push('/login');
    }
  }
}
</script>

<template>
  <div class="profile-management-container">
    <section class="personal-section">
      <h1>Personal Information</h1>
      <div class="personal-content">
        <div class="info-fields">
          <pv-input-text :modelValue="user.name" disabled></pv-input-text>
          <pv-input-text :modelValue="user.lastName" disabled></pv-input-text>
          <pv-input-text :modelValue="user.email" disabled></pv-input-text>
          <pv-input-text type="password" :modelValue="user.password" disabled></pv-input-text>
          <pv-input-text :modelValue="user.phoneNumber" disabled></pv-input-text>
        </div>
        <div class="profile-image">
          <div class="plan-badge">
            <small>PLAN</small>
            <strong>{{ plan.name.split(' ')[1] || 'PRO' }}</strong>
          </div>
          <div class="avatar">
            <i class="pi pi-user user-icon"></i>
          </div>
          <div class="buttons">
            <pv-button label="Log out" @click="logOut"/>
          </div>
        </div>
      </div>
    </section>

    <section class="membership-section">
      <h1>Membresy</h1>
      <h3>Contact information</h3>
      <pv-input-text :modelValue="user.email" disabled></pv-input-text>
      <div class="payment">
        <h3>Payment method</h3>
        <small>All transactions are secure and encrypted</small>
        <div class="pay-fields">
          <pv-input-text :modelValue="'4557 7214 2137 3123'" disabled></pv-input-text>
          <pv-input-text :modelValue="'05/29'" disabled></pv-input-text>
          <pv-input-text :modelValue="'999'" disabled></pv-input-text>
          <div class="pay-icons">
            <i class="pi pi-credit-card"></i>
          </div>
        </div>
      </div>
      <div class="next-payment">
        <h3>Next payment</h3>
        <p>May 27, 2025</p>
      </div>
      <div class="circle-plan">
        <span>plan</span>
        <strong>PRO</strong>
      </div>
    </section>
  </div>
</template>

<style scoped>
.profile-management-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.personal-section {
  background: white;
  padding: 2rem;
}
.personal-content {
  display: flex;
  gap: 2rem;
}
.info-fields {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  max-width: 300px;
}
.profile-image {
  position: relative;
  background: #ccc;
  border-radius: 0.5rem;
  width: 200px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-icon {
  font-size: 4rem;
  color: #bbb;
}
.plan-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: black;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 50%;
  text-align: center;
  box-shadow: 0 0 6px rgba(0,0,0,0.5);
  font-size: 0.75rem;
}
.buttons {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.membership-section {
  background: #111;
  color: #fff;
  padding: 2rem;
  border-radius: 1rem;
  margin-top: 2rem;
  position: relative;
}

.membership-section h1,
.membership-section h3,
.membership-section p,
.membership-section small {
  color: #fff;
}

.payment {
  margin-bottom: 2rem;
}

.pay-fields {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
}

.pay-icons {
  margin-left: 0.5rem;
  color: #fff;
}

.circle-plan {
  position: absolute;
  top: 2.5rem;
  right: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 90px;
  background: #222;
  border-radius: 50%;
  border: 2px solid #fff;
  color: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.4);
  font-size: 1.1rem;
  text-transform: uppercase;
  z-index: 2;
}

.circle-plan span {
  font-size: 0.8rem;
  opacity: 0.7;
}

.circle-plan strong {
  font-size: 1.3rem;
  letter-spacing: 1px;
}
@media (max-width: 900px) {
  .personal-section,
  .membership-section {
    padding: 1.5rem 1rem;
    max-width: 98vw;
  }
  .personal-content {
    gap: 1.2rem;
    font-size: 1rem;
  }
  .info-fields {
    max-width: 100%;
    gap: 0.7rem;
  }
  .profile-image {
    width: 150px;
    height: 180px;
  }
  .avatar {
    width: 80px;
    height: 80px;
  }
  .user-icon {
    font-size: 2.5rem;
  }
  .circle-plan {
    width: 65px;
    height: 65px;
    font-size: 0.9rem;
    top: 1.2rem;
    right: 1.2rem;
  }
}

@media (max-width: 600px) {
  .personal-content {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  .personal-section,
  .membership-section {
    padding: 1rem 0.5rem;
    border-radius: 0.7rem;
  }
  .profile-image {
    width: 100px;
    height: 120px;
  }
  .avatar {
    width: 55px;
    height: 55px;
  }
  .user-icon {
    font-size: 1.5rem;
  }
  .info-fields {
    max-width: 100%;
    gap: 0.4rem;
  }
  .circle-plan {
    width: 45px;
    height: 45px;
    font-size: 0.7rem;
    top: 0.7rem;
    right: 0.7rem;
  }
}
</style>
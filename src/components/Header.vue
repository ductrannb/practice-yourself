<template>
  <ModalChangePassword :dialog="changePasswordDialog" @onHidden="changePasswordDialog = false"></ModalChangePassword>
  <header class="header-wrapper">
    <div class="header-container container">
      <router-link :to="{name: 'home'}">
        <div class="logo-box">
          <img src="/logo-full.svg" alt="Logo">
        </div>
      </router-link>

      <nav class="header-nav">
        <ul class="header-nav-list">
          <li>
            <router-link
                :class="{'header-nav-item': true, 'float-animation': true, 'link-active': $route.name === 'home'}"
                :to="{name: 'home'}"
            >
              Trang chủ
            </router-link>
          </li>
          <li>
            <router-link
                :class="{'header-nav-item': true, 'float-animation': true, 'link-active': $route.name === 'courses'}"
                :to="{name: 'courses'}"
            >
              Các khóa học
            </router-link>
          </li>
          <li>
            <router-link
                :class="{'header-nav-item': true, 'float-animation': true, 'link-active': $route.name === 'exams'}"
                :to="{name: 'exams'}"
            >
              Thi thử
            </router-link>
          </li>
        </ul>
        <div class="user-menu-box" v-if="auth">
          <v-menu>
            <template v-slot:activator="{ props }">
              <div class="header-avatar-box" v-bind="props">
                <img class="header-avatar" :src="auth.avatar || '/images/icons/avatar-default.svg'">
              </div>
            </template>

            <v-list>
              <v-list-item
                  :prepend-avatar="auth.avatar || '/images/icons/avatar-default.svg'"
                  :subtitle="`Số dư: ${$filter.formatNumberChart(auth.balance) || 0} VNĐ`"
                  :title="auth.name"
              >
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item @click="$router.push({name: 'user.dashboard'})">
                <v-list-item-title>Thống kê</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Nạp tiền</v-list-item-title>
              </v-list-item>
              <v-list-item v-if="!auth.is_google_account" @click="changePasswordDialog = true">
                <v-list-item-title>Đổi mật khẩu</v-list-item-title>
              </v-list-item>
              <v-list-item @click="logout()">
                <v-list-item-title>Đăng xuất</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div class="group-btn-box" v-else>
          <router-link class="login-btn-box" :to="{name: 'login'}">
            <span class="custom-btn float-animation">Đăng nhập</span>
          </router-link>
          <router-link class="login-btn-box" :to="{name: 'register'}">
            <span class="custom-btn float-animation">Đăng ký</span>
          </router-link>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import ModalChangePassword from "@/components/ModalChangePassword.vue";

export default {
  name: "Header",
  components: {ModalChangePassword},
  created() {
    this.checkAuth()
  },
  computed: {
    ...mapGetters(['auth'])
  },
  data() {
    return {
      changePasswordDialog: false
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.header-wrapper {
  position: fixed;
  top:0;
  width: 100%;
  height: 7.5rem;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0 6px 12px 0 rgba(0,0,0,.078);
  z-index: 99;
}
.header-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.logo-box {
  height: 100%;
  display: flex;
  align-items: center;
}
.header-nav {
  display: flex;
}
.header-nav-list {
  display: flex;
  font-weight: 600;
  margin-right: 2.5rem;
}
.header-nav-list li{
  display: flex;
  align-items: center;
}
.header-nav-item {
  padding: 15px;
}
.header-nav-item:hover {
  transform: translateY(-.5rem);
  color: var(--color-main);
}
.group-btn-box {
  display: flex;
  column-gap: .5rem;
}
.login-btn-box {
  display: flex;
  align-items: center;
  font-weight: 600;
}
.login-btn-box span:hover{
  transform: translateY(-.5rem);
}
.header-avatar-box {
  width: 40px;
  height: 40px;
  cursor: pointer;
}
.header-avatar-box img {
  width: 100%;
  height: 100%;
  border: 1px solid #eeeeee;
  border-radius: 50%;
}
.user-menu-box {
  display: flex;
  align-items: center;
  padding: 12px 12px 20px;
}
</style>
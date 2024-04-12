<template>
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
            <router-link class="header-nav-item float-animation" to="">Đề thi thử THPT</router-link>
          </li>
        </ul>

        <router-link class="login-btn-box" :to="{name: 'login'}">
          <span class="custom-btn float-animation">Đăng nhập</span>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script>
import router from "@/router/index.js";

export default {
  name: "Header",
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
.login-btn-box {
  display: flex;
  align-items: center;
  font-weight: 600;
}
.login-btn-box span:hover{
  transform: translateY(-.5rem);
}
</style>
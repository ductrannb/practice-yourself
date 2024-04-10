<template>
  <div class="container">
    <router-link :to="{name: 'home'}">
      <div class="logo-box">
        <img src="/logo-full.svg" alt="Logo">
      </div>
    </router-link>

    <nav class="header-nav">
      <ul class="header-nav-list">
        <li class="header-nav-item">
          <router-link :to="{name: 'home'}">Trang chủ</router-link>
        </li>
        <li class="header-nav-item">
          <router-link to="">Các khóa học</router-link>
        </li>
        <li class="header-nav-item">
          <router-link to="">Thi thử THPT</router-link>
        </li>
      </ul>

      <router-link :to="{name: 'login'}">Đăng nhập</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>

</style>
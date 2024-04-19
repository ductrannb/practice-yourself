<template>
  <div class="admin-layout">
    <div class="navbar-wrapper">
      <div class="navbar-logo-box">
        <img src="/logo-full-light.svg" alt="logo">
      </div>
      <div class="navbar-menu-box">
        <router-link :class="{'navbar-menu-item': true}" :to="{name: 'dashboard'}">
          <v-icon icon="mdi-chart-line"/>
          Dashboard
        </router-link>
        <router-link :class="{'navbar-menu-item': true}" :to="{name: 'dashboard'}">
          <v-icon icon="mdi-account-school"/>
          Người dùng
        </router-link>
        <router-link :class="{'navbar-menu-item': true}" :to="{name: 'dashboard'}">
          <v-icon icon="mdi-account-group"/>
          Giáo viên
        </router-link>
        <router-link :class="{'navbar-menu-item': true}" :to="{name: 'dashboard'}">
          <v-icon icon="mdi-book-open-variant-outline"/>
          Khóa học
        </router-link>
      </div>
      <div class="navbar-footer-box">
        <v-icon icon="mdi-chevron-double-left"/>
      </div>
    </div>
    <div class="body-wrapper">
      <div class="header-wrapper">
        <div class="header-container">
          <div class="header-left">
            <v-icon icon="mdi-menu"/>
          </div>
          <div class="header-right">
            <div class="header-notification-box">
              <v-badge color="red" content="10">
                <v-icon icon="mdi-bell"/>
              </v-badge>
            </div>
            <v-menu>
              <template v-slot:activator="{ props }">
                <div class="header-avatar-box" v-bind="props">
                  <img class="header-avatar" src="/images/icons/avatar-default.svg">
                </div>
              </template>

              <v-list>
                <v-list-item
                    v-for="(item, i) in ['Profile', 'Logout']"
                    :key="i"
                >
                  <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
      </div>
      <main class="main-content-wrapper">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "Admin"
}
</script>

<style scoped>
.admin-layout {
  display: flex;
}
.navbar-wrapper {
  height: 100vh;
  width: 230px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  border-right: 1px solid #212631 ;
  background-color: #212631;
}
.body-wrapper {
  flex: 1;
}
.navbar-footer-box {
  margin-top: auto;
  display: flex;
  justify-content: end;
  padding: .5rem;
  color: #FFFFFF;
  border-top: 1px solid #323a49;
}
.header-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: 100%;
  border-bottom: 1px solid #eeeeee;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
}
.header-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.header-right {
  display: flex;
  column-gap: 1.5rem;
}
.header-avatar-box {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 1px solid #000;
}
.navbar-logo-box {
  border-bottom: 1px solid #323a49;
  padding: 0 .5rem;
}
.navbar-menu-box {
  display: flex;
  flex-direction: column;
}
.navbar-menu-item {
  padding: .75rem .5rem;
  border-bottom: 1px solid #323a49;
  color: #FFFFFF;
}
.main-content-wrapper {
  height: calc(100vh - 60px);
  overflow: auto;
}

</style>
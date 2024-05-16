<template>
  <div class="admin-layout">
    <div class="navbar-wrapper">
      <div class="navbar-logo-box">
        <img src="/logo-full-light.svg" alt="logo">
      </div>
      <div class="navbar-menu-box">
        <router-link
          :class="{
            'navbar-menu-item': true,
            'navbar-menu-item--active': ['admin.dashboard', 'teacher.dashboard'].includes($route.name)
          }"
          :to="{name: replaceRouteName('dashboard')}"
        >
          <v-icon icon="mdi-chart-line"/>
          Dashboard
        </router-link>
        <router-link
          v-if="isAdmin"
          :class="{
            'navbar-menu-item': true,
            'navbar-menu-item--active': routesUser.includes($route.name)
          }"
          :to="{name: 'admin.users'}"
        >
          <v-icon icon="mdi-account-school"/>
          Người dùng
        </router-link>
        <router-link
          v-if="isAdmin"
          :class="{
            'navbar-menu-item': true,
            'navbar-menu-item--active': routesTeacher.includes($route.name)
          }"
          :to="{name: 'admin.teachers'}"
        >
          <v-icon icon="mdi-book-open-variant-outline"/>
          Giáo viên
        </router-link>
        <router-link
          :class="{
            'navbar-menu-item': true,
            'navbar-menu-item--active': routesCourse.includes($route.name)
          }"
          :to="{name: replaceRouteName('courses')}"
        >
          <v-icon icon="mdi-account-group"/>
          Khóa học
        </router-link>
        <router-link
          :class="{
            'navbar-menu-item': true,
            'navbar-menu-item--active': routesExam.includes($route.name)
          }"
          :to="{name: 'teacher.exams'}"
        >
          <v-icon icon="mdi-book-open-outline"/>
          Đề thi thử
        </router-link>
      </div>

      <ModalChangePassword :dialog="changePasswordDialog" @onHidden="changePasswordDialog = false"></ModalChangePassword>
      <div class="navbar-footer-box">
        <v-icon icon="mdi-chevron-double-left"/>
      </div>
    </div>
    <div class="body-wrapper" ref="bodyWrapper">
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
                  <img class="header-avatar" :src="auth.avatar || '/images/icons/avatar-default.svg'">
                </div>
              </template>

              <v-list>
                <v-list-item v-if="!auth.is_google_account" @click="changePasswordDialog = true">
                  <v-list-item-title>Đổi mật khẩu</v-list-item-title>
                </v-list-item>
                <v-list-item class="cursor-pointer" @click="logout()">
                  <v-list-item-title>Đăng xuất</v-list-item-title>
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

import {mapGetters} from "vuex";
import ModalChangePassword from "@/components/ModalChangePassword.vue";

export default {
  name: "Admin",
  components: {ModalChangePassword},
  computed: {
    ...mapGetters(['auth']),
    routesUser() {
      return ['admin.users', 'admin.users.create', 'admin.users.update', 'admin.users.detail']
    },
    routesTeacher() {
      return ['admin.teachers', 'admin.teachers.create', 'admin.teachers.update', 'admin.teachers.detail']
    },
    routesCourse() {
      return [
        'admin.courses', 'admin.courses.create', 'admin.courses.update',
        'admin.courses.lessons', 'admin.courses.lessons.create', 'admin.courses.lessons.update',
        'admin.courses.lessons.questions', 'admin.courses.lessons.questions.create',
        'admin.courses.lessons.questions.update', 'admin.courses.lessons.questions.detail',
        'teacher.courses',
        'teacher.courses.lessons', 'teacher.courses.create', 'teacher.courses.update'
      ]
    },
    routesExam() {
      return [
        'teacher.exams', 'teacher.exams.create', 'teacher.exams.update', 'teacher.exams.detail',
        'admin.exams', 'admin.exams.create', 'admin.exams.update', 'admin.exams.detail'
      ]
    },
  },
  data() {
    return {
      changePasswordDialog: false
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
.admin-layout {
  display: flex;
  font-family: 'Roboto', sans-serif;
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
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: calc(100% - 230px);
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
  cursor: pointer;
}
.header-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #eeeeee;
  object-fit: cover;
}
.navbar-logo-box {
  border-bottom: 1px solid #323a49;
  padding: 1rem;
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
.navbar-menu-item:hover {
  background-color: #323a49;
}
.main-content-wrapper {
  overflow: auto;
  flex: 1;
  padding: 1rem;
}
.navbar-menu-item--active {
  background-color: #323a49;
}
</style>
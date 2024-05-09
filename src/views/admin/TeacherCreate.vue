<template>
  <div class="admin-user-wrapper">
    <div class="admin-container">
      <breadcrumb class="admin-breadcrumb-wrapper" :items="breadcrumbs"/>
      <div class="user-form-container">
        <UserForm @onSubmit="onSubmit"></UserForm>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import UserForm from "@/components/UserForm.vue";
import constants from "@/Utils/constants.js";

export default {
  name: "TeacherCreate",
  components: {UserForm, Breadcrumb},
  computed: {
    breadcrumbs() {
      return [
        {
          id: 1,
          title: 'Dashboard',
          route: {name: this.replaceRouteName('dashboard')}
        }, {
          id: 2,
          title: 'Giáo viên',
          route: {name: this.replaceRouteName('teachers')}
        }, {
          id: 3,
          title: 'Thêm mới'
        },
      ]
    }
  },
  data() {
    return {
    }
  },
  methods: {
    async onSubmit(form) {
      form.role_id = constants.ROLE.TEACHER
      await this.$axios.post('/users', form)
      this.$router.push({name: this.replaceRouteName('teachers')})
    }
  }
}
</script>

<style scoped>
</style>
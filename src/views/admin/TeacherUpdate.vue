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
          route: {name: 'admin.dashboard'}
        }, {
          id: 2,
          title: 'Giáo viên',
          route: {name: 'admin.teachers'}
        }, {
          id: 3,
          title: 'Cập nhật'
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
      await this.$axios.put(`/users/${this.$route.params.id}`, form)
      this.$router.push({name: 'admin.teachers'})
    }
  }
}
</script>

<style scoped>
</style>
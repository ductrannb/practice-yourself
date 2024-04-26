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
  name: "UserUpdate",
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
          title: 'Người dùng',
          route: {name: 'admin.users'}
        }, {
          id: 3,
          title: 'Cập nhật'
        },
      ]
    }
  },
  methods: {
    onSubmit(form) {
      form.role_id = constants.ROLE.USER
      this.$axios.put(`users/${this.$route.params.id}`, form)
          .then(response => {
            this.$router.push({name: 'admin.users'})
          })
          .catch(error => {
            console.log(error)
          })
    }
  }
}
</script>

<style scoped>
</style>
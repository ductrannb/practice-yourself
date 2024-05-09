<template>
  <div class="admin-user-wrapper">
    <div class="admin-container">
      <breadcrumb class="admin-breadcrumb-wrapper" :items="breadcrumbs"/>
      <div class="user-form-container">
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import UserForm from "@/components/UserForm.vue";

export default {
  name: "UserCreate",
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
          title: this.user.name
        },
      ]
    }
  },
  data() {
    return {
      user: {}
    }
  },
  created() {
    this.fetchUser()
  },
  methods: {
    fetchUser() {
      this.$axios.get(`users/${this.$route.params.id}`)
          .then(response => {
            this.user = response.data.data
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
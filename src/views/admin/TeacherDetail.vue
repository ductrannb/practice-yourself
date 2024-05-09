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
          route: {name: this.replaceRouteName('dashboard')}
        }, {
          id: 2,
          title: 'Giáo viên',
          route: {name: this.replaceRouteName('teachers')}
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
    async fetchUser() {
      const res = await this.$axios.get(`users/${this.$route.params.id}`)
      this.user = res.data.data
    }
  }
}
</script>

<style scoped>
</style>
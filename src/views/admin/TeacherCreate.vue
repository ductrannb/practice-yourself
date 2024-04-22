<template>
  <div class="admin-user-wrapper">
    <div class="admin-container">
      <breadcrumb class="admin-breadcrumb-wrapper" :items="breadcrumbs"/>
      <div class="user-form-container">
        <UserForm></UserForm>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import UserForm from "@/components/UserForm.vue";

export default {
  name: "TeacherCreate",
  components: {UserForm, Breadcrumb},
  data() {
    return {
      breadcrumbs: [
        {
          id: 1,
          title: 'Dashboard',
          route: {name: 'admin.dashboard'}
        },
        {
          id: 2,
          title: 'Giáo viên',
          route: {name: 'admin.teachers'}
        },
        {
          id: 3,
          title: 'Thêm mới'
        },
      ],
    }
  }
}
</script>

<style scoped>
</style>
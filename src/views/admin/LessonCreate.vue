<template>
  <div class="admin-user-wrapper">
    <div class="admin-container">
      <breadcrumb class="admin-breadcrumb-wrapper" :items="breadcrumbs"/>
      <div class="user-form-container">
        <LessonForm @onSubmit="onSubmit"></LessonForm>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import CourseForm from "@/components/CourseForm.vue";
import LessonForm from "@/components/LessonForm.vue";

export default {
  name: "LessonCreate",
  components: {LessonForm, CourseForm, Breadcrumb},
  computed: {
    breadcrumbs() {
      return [
        {
          id: 1,
          title: 'Dashboard',
          route: {name: 'admin.dashboard'}
        }, {
          id: 2,
          title: 'Khóa học',
          route: {name: 'admin.courses'}
        }, {
          id: 3,
          title: 'Tên khóa học'
        }, {
          id: 4,
          title: 'Danh sách bài học',
          route: {name: "admin.courses.lessons", params: {id: 1}}
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
      const res = await this.$axios.post('/lessons', form)
      this.$router.push({name: 'admin.courses.lessons'})
    }
  }
}
</script>

<style scoped>
</style>
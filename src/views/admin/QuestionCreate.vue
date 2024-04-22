<template>
  <div class="admin-user-wrapper">
    <div class="admin-container">
      <breadcrumb class="admin-breadcrumb-wrapper" :items="breadcrumbs"/>
      <div class="user-form-container">
        <QuestionForm @onSubmit="onSubmit"></QuestionForm>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import CourseForm from "@/components/CourseForm.vue";
import LessonForm from "@/components/LessonForm.vue";
import QuestionForm from "@/components/QuestionForm.vue";

export default {
  name: "QuestionCreate",
  components: {QuestionForm, LessonForm, CourseForm, Breadcrumb},
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
          title: 'Khóa học',
          route: {name: 'admin.courses'}
        },
        {
          id: 3,
          title: 'Tên khóa học'
        },
        {
          id: 4,
          title: 'Danh sách bài học',
          route: {name: "admin.courses.lessons", params: {id: 1}}
        },
        {
          id: 5,
          title: 'Tên bài học'
        },
        {
          id: 6,
          title: 'Thêm mới'
        }
      ],
    }
  },
  methods: {
    onSubmit(form) {
      console.log(form)
      this.deleteConfirm()
    }
  }
}
</script>

<style scoped>
</style>
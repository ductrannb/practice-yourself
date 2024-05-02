<template>
  <div class="admin-user-wrapper">
    <div class="admin-container">
      <breadcrumb class="admin-breadcrumb-wrapper" :items="breadcrumbs"/>
      <div class="admin-user-container">
        <div class="course-teacher-box">
          Danh sách giáo viên:
          <span>{{ getLabelListTeachers }}</span>
        </div>
        <LessonList :lessons="course.lessons"></LessonList>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue"
import LessonList from "@/components/LessonList.vue"

export default {
  name: "Courses",
  components: {LessonList, Breadcrumb},
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
          title: 'Tên khóa học',
        }, {
          id: 2,
          title: 'Danh sách bài học',
        }
      ]
    },
    getLabelListTeachers() {
      return this.course.teachers.map(teacher => teacher.name).join(', ')
    }
  },
  data() {
    return {
      course: {
        name: null,
        teachers: [],
        lessons: []
      }
    }
  },
  created() {
    this.fetchCourse()
  },
  methods: {
    async fetchCourse() {
      const res = await this.$axios.get(`courses/${this.$route.params.id}`)
      this.course = res.data.data
    }
  }
}
</script>

<style scoped>
.course-teacher-box {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-primary);
}
.course-teacher-box span {
  font-weight: 500;
  font-style: italic;
}
</style>
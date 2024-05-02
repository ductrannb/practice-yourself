<template>
  <div class="admin-user-wrapper">
    <div class="admin-container">
      <breadcrumb class="admin-breadcrumb-wrapper" :items="breadcrumbs"/>
      <div class="admin-user-container">
        <QuestionList :questions="lesson.questions"></QuestionList>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue"
import LessonList from "@/components/LessonList.vue"
import Question from "@/components/Question.vue";
import QuestionList from "@/components/QuestionList.vue";

export default {
  name: "Questions",
  components: {QuestionList, Question, LessonList, Breadcrumb},
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
          title: this.name.course_name,
          route: {name: "admin.courses.lessons", params: {id: this.$route.params.id}}
        }, {
          id: 4,
          title: this.name.lesson_name,
        }, {
          id: 5,
          title: 'Danh sách câu hỏi'
        },
      ]
    }
  },
  data() {
    return {
      name: {
        course_name: null,
        lesson_name: null
      },
      lesson: {
        name: null,
        teachers: [],
        questions: []
      },
    }
  },
  created() {
    this.fetchName()
  },
  methods: {
    async fetchName() {
      const res = await this.$axios.get(`lessons/get-name/${this.$route.params.lessonId}`)
      this.name = res.data.data
    }
  }
}
</script>

<style scoped>
.page-heading {
  text-align: center;
}
.course-teacher-box {
  margin-bottom: 1rem;
}
.course-teacher-box span {
  font-weight: 500;
  font-style: italic;
}
</style>
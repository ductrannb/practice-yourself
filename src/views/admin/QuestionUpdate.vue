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
import QuestionForm from "@/components/QuestionForm.vue";
import constants from "@/Utils/constants.js";

export default {
  name: "QuestionUpdate",
  components: {QuestionForm, Breadcrumb},
  computed: {
    isExamQuestion() {
      return this.$route.query.type == constants.QUESTION_TYPE.EXAM
    },
    breadcrumbs() {
      if (this.isExamQuestion) {
        return [
          {
            title: 'Dashboard',
            route: {name: this.replaceRouteName('dashboard')}
          }, {
            title: 'Danh sách đề thi thử',
            route: {name: this.replaceRouteName('exams')}
          }, {
            title: this.name.exam_name,
            route: { name: this.replaceRouteName('exams.detail'), params: { id: this.$route.params.id }}
          }, {
            title: 'Sửa câu hỏi'
          }
        ]
      }

      return [
        {
          id: 1,
          title: 'Dashboard',
          route: {name: this.replaceRouteName('dashboard')}
        }, {
          id: 2,
          title: 'Danh sách khóa học',
          route: {name: this.replaceRouteName('courses')}
        }, {
          id: 3,
          title: this.name.course_name,
          route: { name: this.replaceRouteName('courses.lessons'), params: { id: this.$route.params.id }}
        }, {
          id: 4,
          title: this.name.lesson_name,
          route: {
            name: this.replaceRouteName('courses.lessons.questions'),
            params: { id: this.$route.params.id, lessonId: this.$route.params.lessonId }
          }
        }, {
          id: 5,
          title: 'Cập nhật'
        }
      ]
    }
  },
  data() {
    return {
      name: {
        course_name: null,
        lesson_name: null,
        exam_name: null
      }
    }
  },
  created() {
    this.fetchName()
  },
  methods: {
    async onSubmit(form) {
      const res = await this.$axios.put(`questions/${this.$route.params.questionId}`, form)
      if (this.isExamQuestion) {
        this.$router.push({name: this.replaceRouteName('exams.detail'), params: {id: this.$route.params.id}})
        return
      }
      this.$router.push({
        name: this.replaceRouteName('courses.lessons.questions'),
        params: {
          id: this.$route.params.id,
          lessonId: this.$route.params.lessonId
        }
      })
    },
    async fetchName() {
      if (this.isExamQuestion) {
        const res = await this.$axios.get(`exams/get-name/${this.$route.params.id}`)
        this.name = res.data.data
        return
      }

      const res = await this.$axios.get(`/lessons/get-name/${this.$route.params.lessonId}`)
      this.name = res.data.data
    }
  }
}
</script>

<style scoped>
</style>
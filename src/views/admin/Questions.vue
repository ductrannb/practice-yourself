<template>
  <div class="admin-user-wrapper">
    <div class="admin-container">
      <breadcrumb class="admin-breadcrumb-wrapper" :items="breadcrumbs"/>
      <div class="admin-user-container">
        <QuestionList @fetchList="fetchQuestions" :questions="questions" :paginate="paginate"/>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue"
import QuestionList from "@/components/QuestionList.vue";
import {debounce} from "lodash";
import constants from "@/Utils/constants.js";

export default {
  name: "Questions",
  components: {QuestionList, Breadcrumb},
  computed: {
    breadcrumbs() {
      return [
        {
          id: 1,
          title: 'Dashboard',
          route: {name: this.replaceRouteName('dashboard')}
        }, {
          id: 2,
          title: 'Khóa học',
          route: {name: this.replaceRouteName('courses')}
        }, {
          id: 3,
          title: this.name.course_name,
          route: {name: this.replaceRouteName('courses.lessons'), params: {id: this.$route.params.id}}
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
      questions: [],
      paginate: {
        current_page: 1,
        last_page: 1,
        total: 1
      },
    }
  },
  created() {
    this.fetchName()
    this.fetchQuestions()
  },
  methods: {
    async fetchName() {
      const res = await this.$axios.get(`lessons/get-name/${this.$route.params.lessonId}`)
      this.name = res.data.data
    },
    async fetchQuestions(form) {
      if (!form) {
        form = {keyword: null, page: 1, assignable_id: this.$route.params.lessonId, assignable_type: constants.QUESTION_TYPE.LESSON}
      }
      const res = await this.$axios.get(`questions`, {params: form})
      this.questions = res.data.data
      this.paginate = {current_page: res.data.current_page, last_page: res.data.last_page, total: res.data.total}
    },
    search: debounce(
        function(form) {
          console.log(form)
          this.form.page = 1
          this.fetchQuestions()
        },
        1000
    ),
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
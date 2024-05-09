<template>
  <div class="admin-user-wrapper">
    <div class="admin-container">
      <breadcrumb class="admin-breadcrumb-wrapper" :items="breadcrumbs"/>
      <div class="author" v-if="question.author">
        <Author :author="question.author"/>
      </div>
      <div class="question-box">
        <div class="question-heading-box">
          <div class="question-content" v-html="question.content"/>
          <LevelBadge :level="question.level"/>
        </div>
        <div class="question-choice-list">
          <div
              :class="{
            'question-choice-item': true,
            'question-choice-item--correct': choice.id === question.correct_choice.id
          }"
              v-for="(choice, index) in question.choices"
              :key="index">
            <span class="question-choice-code">{{getChoiceCode(index)}}.</span>
            <p class="question-choice-item--content" v-html="choice.content"></p>
          </div>
        </div>
        <div class="question-content question--solution" v-html="question.solution"/>
      </div>
      <div class="admin-form-footer">
        <router-link
            :to="{name: replaceRouteName('courses.lessons.questions'), params: { id: this.$route.params.id, lessonId: this.$route.params.lessonId }}"
            class="admin-form-footer-btn admin-form-footer-btn--cancel"
        >
          Trở lại
        </router-link>
        <router-link
            :to="{name: replaceRouteName('courses.lessons.questions.update')}"
            class="admin-form-footer-btn admin-form-footer-btn--submit"
        >
          Sửa
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import constants from "@/Utils/constants.js";
import Author from "@/components/Author.vue";
import LevelBadge from "@/components/LevelBadge.vue";

export default {
  name: "QuestionDetail",
  components: {LevelBadge, Author, Breadcrumb},
  computed: {
    constants() {
      return constants
    },
    breadcrumbs() {
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
          title: 'Chi tiết'
        }
      ]
    }
  },
  data() {
    return {
      question: {},
      name: {
        course_name: null,
        lesson_name: null
      }
    }
  },
  created() {
    this.fetchName()
    this.fetchQuestion()
  },
  methods: {
    async fetchQuestion() {
      const res = await this.$axios.get(`questions/${this.$route.params.questionId}`)
      this.question = res.data.data
    },
    async fetchName() {
      const res = await this.$axios.get(`/lessons/get-name/${this.$route.params.lessonId}`)
      this.name = res.data.data
    },
  }
}
</script>

<style scoped>
.author {
  padding: 8px 0;
}
</style>
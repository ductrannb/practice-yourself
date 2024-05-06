<template>
  <div class="admin-user-wrapper">
    <div class="admin-container">
      <breadcrumb class="admin-breadcrumb-wrapper" :items="breadcrumbs"/>
      <div class="heading-box">
        <div class="author" v-if="exam.author">
          <Author :author="exam.author"/>
        </div>
        <div class="admin-form-footer">
          <router-link
              :to="{name: replaceRouteName('exams')}"
              class="admin-form-footer-btn admin-form-footer-btn--cancel"
          >
            Trở lại
          </router-link>
          <router-link
              :to="{
                name: replaceRouteName('exams.questions.create'),
                params: {id: $route.params.id},
                query: {type: constants.QUESTION_TYPE.EXAM}
              }"
              class="admin-form-footer-btn admin-form-footer-btn--submit"
          >
            Thêm câu hỏi
          </router-link>
        </div>
      </div>
      <div class="question-list-empty" v-if="!exam.questions || !exam.questions.length">
        <span>Chưa có câu hỏi nào.</span>
      </div>
      <div v-else class="question-box" v-for="(question, index) in exam.questions">
        <div class="question-heading-box">
          <span class="question-index">{{index + 1}}.</span>
          <div class="question-content" v-html="question.content"/>
          <LevelBadge :level="question.level"/>
          <div class="group-button-box">
            <v-tooltip text="Sửa">
              <template v-slot:activator="{ props }">
                <v-icon
                    v-bind="props"
                    icon="mdi-pencil"
                    @click="$router.push({
                      name: replaceRouteName('exams.questions.update'),
                      params: {id: $route.params.id, questionId: question.id},
                      query: {type: constants.QUESTION_TYPE.EXAM}
                    })"
                />
              </template>
            </v-tooltip>
            <v-tooltip text="Xóa">
              <template v-slot:activator="{ props }">
                <v-icon
                  v-bind="props"
                  icon="mdi-delete"
                  color="red"
                  @click="() => {
                    questionIdSelected = question.id
                    destroy('questions', question.id, removeQuestion)
                  }"
                />
              </template>
            </v-tooltip>
          </div>
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
        <div class="question--solution-box">
          <span>Lời giải:</span>
          <div class="question-content question--solution" v-html="question.solution"/>
        </div>
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
          title: 'Dashboard',
          route: {name: this.replaceRouteName('dashboard')}
        }, {
          title: 'Danh sách đề thi thử',
          route: {name: this.replaceRouteName('exams')}
        }, {
          title: 'Chi tiết'
        }
      ]
    }
  },
  data() {
    return {
      exam: {
        questions: []
      },
      questionIdSelected: null
    }
  },
  created() {
    this.fetchExam()
  },
  methods: {
    async fetchExam() {
      const res = await this.$axios.get(`exams/${this.$route.params.id}`)
      this.exam = res.data.data
    },
    removeQuestion() {
      const vm = this
      this.exam.questions = this.exam.questions.filter(item => item.id != vm.questionIdSelected)
    }
  }
}
</script>

<style scoped>
.heading-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: -1rem;
  margin: 0 -1rem 1rem;
  background: #FFFFFF;
  padding: .5rem 1rem;
  border: 1px solid #eeeeee;
}
.author {
  padding: 8px 0;
}
.question-level {
  margin-left: 1rem;
}
.group-button-box {
  margin-left: 1rem;
  display: flex;
  column-gap: .5rem;
}
.admin-form-footer .admin-form-footer-btn {
  height: fit-content;
}
.question--solution-box {
  padding-left: .5rem;
}
.question--solution {
  padding-left: 1rem;
}
</style>
<template>
  <div class="lesson-detail-wrapper">
    <div class="container">
      <breadcrumb class="breadcrumb-wrapper" :items="breadcrumbs"/>
      <div class="lesson-container">
        <div class="lesson-box">
          <p class="lesson-title">{{ lesson.name }}</p>
          <div class="lesson-question-list-box">
            <question
                class="lesson-question-item"
                v-for="(question, index) in lesson.questions"
                :key="question.id"
                :index="index"
                :question="question"
                :selected="getSelected(question.id)"
                @select-choice="selectChoice"
            />
          </div>
        </div>
        <div class="question-console-wrapper">
          <div class="question-console-box box-shadow-beautiful">
            <p class="question-console-title">Bảng câu hỏi</p>
            <p class="overview-answer overview-answer--correct"><span>{{ `${countCorrect}/${lesson.total_questions}` }}</span> Câu đúng</p>
            <p class="overview-answer overview-answer--wrong"><span>{{ `${countWrong}/${lesson.total_questions}` }}</span> Câu sai</p>
            <div class="question-console-list">
            <span
                :class="{
                  'question-console-item': true,
                  'question-console-item--correct': isCorrect(question.id) == true,
                  'question-console-item--wrong': isCorrect(question.id) == false
                }"
                v-for="(question, index) in lesson.questions"
                :key="index"
                @click="scrollToQuestion(index)"
            >
              {{ index + 1 }}
            </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <popup-chat-gemini chat-id="5a62827f-02d8-46c9-9ec7-748252751b66"/>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import Question from "@/components/Question.vue";
import PopupChatGemini from "@/components/PopupChatGemini.vue";

export default {
  name: "LessonDetail",
  components: {PopupChatGemini, Question, Breadcrumb},
  computed: {
    breadcrumbs() {
      return [
        {
          title: 'Trang chủ',
          route: {name: 'home'}
        }, {
          title: 'Các khóa học',
          route: {name: 'courses'}
        }, {
          title: this.lesson.course_name,
          route: {name: 'courses.detail', params: {id: this.lesson.course_id}},
        }, {
          title: this.lesson.name
        }
      ]
    },
    countCorrect() {
      return this.lesson.selected.filter(question => question.is_correct).length
    },
    countWrong() {
      return this.lesson.selected.filter(question => !question.is_correct).length
    },
  },
  data() {
    return {
      lesson: {
        name: null,
        course_id: null,
        course_name: null,
        total_questions: 0,
        questions: [],
        selected: []
      },
    };
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const res = await this.$axios.get(`home/lessons/${this.$route.params.id}`)
      this.lesson = res.data.data
    },
    isCorrect(questionId) {
      const selected = this.lesson.selected.find(selected => selected.question_id === questionId)
      if (!selected) {
        return null
      }
      return selected.is_correct
    },
    getSelected(questionId) {
      return this.lesson.selected.find(selected => selected.question_id === questionId)
    },
    async selectChoice(form) {
      const res = await this.$axios.post('home/lessons/select', form)
      this.lesson.selected = this.lesson.selected.concat(res.data.data)
      this.lesson.questions.forEach(question => {
        if (question.id === form.question_id) {
          question.is_selected = true
        }
      })
    }
  }
}
</script>

<style scoped>
.lesson-container {
  display: flex;
  margin-bottom: 4rem;
}
.lesson-box {
  width: 77%;
  padding: 0 2rem 0 1rem;
}
.lesson-title {
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
}
.question-console-wrapper {
  width: 23%;
  padding: 1rem 0;
}
.question-console-box {
  padding: 1rem;
  border-radius: 8px;
  position: sticky;
  top: 136px;
}
.question-console-title {
  font-weight: 600;
  margin-bottom: .6rem;
}
.question-console-list {
  display: flex;
  flex-wrap: wrap;
  gap: .25rem;
  margin-top: 1rem;
}
.question-console-item {
  display: flex;
  width: 28px;
  height: 28px;
  justify-content: center;
  align-items: center;
  color: #777777;
  background-color: #F2F3F7;
  border-radius: 4px;
  font-size: .8rem;
  font-weight: 600;
  cursor: pointer;
}
.question-console-item:hover {
  color: #faf7f7;
  background-color: #8d8e90;
}
.question-console-item--correct {
  color: #FFFFFF;
  background-color: #4CAF50;
}
.question-console-item--wrong {
  color: #FFFFFF;
  background-color: #F44336;
}
.overview-answer {
  font-size: .9rem;
}
.overview-answer::before {
  display: inline-block;
  content: '';
  width: .5rem;
  height: .5rem;
  margin-bottom: .1rem;
  margin-right: .5rem;
}
.overview-answer--correct::before {
  background-color: #4CAF50;
}
.overview-answer--wrong::before {
  background-color: #F44336;
}
</style>
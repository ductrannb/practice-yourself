<template>
  <div class="exam-detail-wrapper">
    <div class="container">
      <breadcrumb class="breadcrumb-wrapper" :items="breadcrumbs"/>
      <div class="exam-container">
        <div class="exam-box">
          <p class="exam-title">{{ exam_review.name }}</p>
          <div class="exam-question-list-box">
            <question
                class="exam-question-item"
                v-for="(question, index) in exam_review.questions"
                :key="question.id"
                :index="index"
                :question="question"
                :selected="getSelected(question.id)"
            />
          </div>
        </div>
        <div class="question-console-wrapper">
          <div class="question-console-box box-shadow-beautiful">
            <p class="question-console-title">Bảng câu hỏi</p>
            <p><span>Tổng: {{ exam_review.total_question }} câu hỏi</span> <span class="text-small text-danger fw-bold">({{ exam_review.score }}/10 điểm)</span></p>
            <p class="overview-answer overview-answer--correct"><span>{{ countCorrectQuestion }}</span> Câu đúng</p>
            <p class="overview-answer overview-answer--wrong"><span>{{ countWrongQuestion }}</span> Câu sai</p>
            <p class="overview-answer overview-answer--incomplete"><span>{{ countIncompleteQuestion }}</span> Câu chưa làm</p>
            <div class="question-console-list">
            <span
                :class="{
                  'question-console-item': true,
                  'question-console-item--correct': getSelected(question.id)?.is_correct,
                  'question-console-item--wrong': getSelected(question.id) && !getSelected(question.id).is_correct
                }"
                v-for="(question, index) in exam_review.questions"
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
  name: "ExamReview",
  components: {PopupChatGemini, Question, Breadcrumb},
  computed: {
    breadcrumbs() {
      return [
        {
          title: 'Trang chủ',
          route: {name: 'home'}
        }, {
          title: 'Thi thử',
          route: {name: 'exams'}
        }, {
          title: this.exam_review.name,
          route: {name: 'exams.overview', params: {id: this.exam_review.exam_id}},
        }
      ]
    },
    countCorrectQuestion() {
      return this.exam_review.selected.filter(selected => selected.is_correct).length
    },
    countWrongQuestion() {
      return this.exam_review.selected.filter(selected => !selected.is_correct).length
    },
    countIncompleteQuestion() {
      return this.exam_review.questions.filter(question => !this.getSelected(question.id)).length
    }
  },
  data() {
    return {
      exam_review: {
        id: null,
        exam_id: null,
        name: null,
        questions: [],
        selected: []
      },
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const reviewId = this.$route.params.id
      const res = await this.$axios.get(`home/exams/review/${reviewId}`)
      this.exam_review = res.data.data
    },
    getSelected(questionId) {
      return this.exam_review.selected.find(selected => selected.question_id === questionId)
    }
  }
}
</script>

<style scoped>
.exam-container {
  display: flex;
  margin-bottom: 4rem;
}
.exam-box {
  width: 77%;
  padding: 0 2rem 0 1rem;
}
.exam-title {
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
.overview-answer--incomplete::before {
  background-color: #d9dadd;
}
</style>
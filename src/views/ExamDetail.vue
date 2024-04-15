<template>
  <div class="exam-detail-wrapper">
    <div class="container">
      <breadcrumb class="breadcrumb-wrapper" :items="breadcrumbs"/>
      <p class="exam-title">{{ exam.name }}</p>
      <div class="exam-container">
        <div class="exam-box">
          <div class="exam-question-list-box">
            <question
              class="exam-question-item"
              v-for="(question, index) in exam.questions"
              :key="question.id"
              :index="index + 1"
              :question="question"
            />
          </div>
        </div>
        <div class="question-console-wrapper">
          <div class="question-console-box box-shadow-beautiful">
            <p class="question-console-title">Bảng câu hỏi</p>
            <vue-countdown :time="exam.time_limit * 60 * 1000" v-slot="{ days, hours, minutes, seconds }">
              <div class="question-console--countdown">
                <img src="/images/icons/timer.svg">
                <span>
                  <span v-if="exam.time_limit >= 60">{{ ('0' + hours).slice(-2) }} : </span>
                  <span>{{ ('0' + minutes).slice(-2) }}</span>
                  :
                  <span>{{ ('0' + seconds).slice(-2) }}</span>
                </span>
              </div>
            </vue-countdown>
            <div class="question-console-list">
              <span
                :class="{
                  'question-console-item': true,
                  'question-console-item--select': question.id === 2,
                }"
                v-for="(question, index) in exam.questions"
                :key="index"
              >
                {{ index + 1 }}
              </span>
            </div>
            <button class="question-console--btn-submit">Nộp bài</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import Question from "@/components/Question.vue";
import PopupChatGemini from "@/components/PopupChatGemini.vue";

export default {
  name: "ExamDetail",
  components: {PopupChatGemini, Question, Breadcrumb},
  data() {
    return {
      breadcrumbs: [
        {
          id: 1,
          title: 'Trang chủ',
          route: {name: 'home'}
        },
        {
          id: 2,
          title: 'Thi thử',
          route: {name: 'exams'}
        },
        {
          id: 3,
          title: 'Đề thi thử quốc gia 2024 môn Toán trường THPT chuyên ĐH Vinh',
        }
      ],
      exam: {
        name: 'Đề thi thử quốc gia 2024 môn Toán trường THPT chuyên ĐH Vinh',
        questions: [
          {
            id: 1,
            level: 1,
            content: '<p>Cho hàm số f(x) có đạo hàm f\'(x) = x<sup>2</sup>(x + 2). Mệnh đề nào sau đây đúng?</p>',
            choice_selected: null,
            choices: [
              {
                id: 1,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: true
              },
              {
                id: 2,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
              {
                id: 3,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
              {
                id: 4,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
            ]
          },
          {
            id: 2,
            level: 2,
            content: '<p>Cho hàm số f(x) có đạo hàm f\'(x) = x<sup>2</sup>(x + 2). Mệnh đề nào sau đây đúng?</p>',
            choice_selected: null,
            choices: [
              {
                id: 1,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: true
              },
              {
                id: 2,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
              {
                id: 3,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
              {
                id: 4,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
            ]
          },
          {
            id: 3,
            level: 1,
            content: '<p>Cho hàm số f(x) có đạo hàm f\'(x) = x<sup>2</sup>(x + 2). Mệnh đề nào sau đây đúng?</p>',
            choice_selected: null,
            choices: [
              {
                id: 1,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: true
              },
              {
                id: 2,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
              {
                id: 3,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
              {
                id: 4,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
            ]
          },
          {
            id: 4,
            level: 1,
            content: '<p>Cho hàm số f(x) có đạo hàm f\'(x) = x<sup>2</sup>(x + 2). Mệnh đề nào sau đây đúng?</p>',
            choice_selected: null,
            choices: [
              {
                id: 1,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: true
              },
              {
                id: 2,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
              {
                id: 3,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
              {
                id: 4,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
            ]
          },
          {
            id: 5,
            level: 3,
            content: '<p>Cho hàm số f(x) có đạo hàm f\'(x) = x<sup>2</sup>(x + 2). Mệnh đề nào sau đây đúng?</p>',
            choice_selected: null,
            choices: [
              {
                id: 1,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: true
              },
              {
                id: 2,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
              {
                id: 3,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
              {
                id: 4,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
            ]
          },
          {
            id: 6,
            level: 1,
            content: '<p>Cho hàm số f(x) có đạo hàm f\'(x) = x<sup>2</sup>(x + 2). Mệnh đề nào sau đây đúng?</p>',
            choice_selected: null,
            choices: [
              {
                id: 1,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: true
              },
              {
                id: 2,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
              {
                id: 3,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
              {
                id: 4,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
            ]
          },
          {
            id: 7,
            level: 1,
            content: '<p>Cho hàm số f(x) có đạo hàm f\'(x) = x<sup>2</sup>(x + 2). Mệnh đề nào sau đây đúng?</p>',
            choice_selected: null,
            choices: [
              {
                id: 1,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: true
              },
              {
                id: 2,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
              {
                id: 3,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
              {
                id: 4,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
            ]
          },
          {
            id: 8,
            level: 1,
            content: '<p>Cho hàm số f(x) có đạo hàm f\'(x) = x<sup>2</sup>(x + 2). Mệnh đề nào sau đây đúng?</p>',
            choice_selected: null,
            choices: [
              {
                id: 1,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: true
              },
              {
                id: 2,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
              {
                id: 3,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
              {
                id: 4,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
            ]
          },
          {
            id: 9,
            level: 1,
            content: '<p>Cho hàm số f(x) có đạo hàm f\'(x) = x<sup>2</sup>(x + 2). Mệnh đề nào sau đây đúng?</p>',
            choice_selected: null,
            choices: [
              {
                id: 1,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: true
              },
              {
                id: 2,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
              {
                id: 3,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
              {
                id: 4,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
            ]
          },
          {
            id: 10,
            level: 1,
            content: '<p>Cho hàm số f(x) có đạo hàm f\'(x) = x<sup>2</sup>(x + 2). Mệnh đề nào sau đây đúng?</p>',
            choice_selected: null,
            choices: [
              {
                id: 1,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: true
              },
              {
                id: 2,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
              {
                id: 3,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
              {
                id: 4,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
                is_correct: false
              },
            ]
          },
        ],
        time_limit: 90
      },
    };
  },
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
  margin-bottom: 2rem;
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
.question-console-item--select {
  background-color: var(--color-primary);
  color: #FFFFFF;
}
.question-console--btn-submit {
  width: 100%;
  background-color: var(--color-primary);
  margin-top: 1rem;
  padding: .5rem;
  color: #FFFFFF;
  font-weight: 600;
  border-radius: 4px;
}
.question-console--btn-submit:hover {
  background-color: #1d6b97;
}
.question-console--countdown {
  display: flex;
  align-items: center;
}
.question-console--countdown > p {
  display: flex;
  align-items: center;
}
.question-console--countdown > p > span {
  padding: .25rem;
  background-color: #FFFFFF;
}
.question-console--countdown img {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: .5rem;
}
</style>
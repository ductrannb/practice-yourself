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
            />
          </div>
        </div>
        <div class="question-console-wrapper">
          <div class="question-console-box box-shadow-beautiful">
            <p class="question-console-title">Bảng câu hỏi</p>
            <p class="overview-answer overview-answer--correct"><span>{{'1/20'}}</span> Câu đúng</p>
            <p class="overview-answer overview-answer--wrong"><span>{{'1/20'}}</span> Câu sai</p>
            <div class="question-console-list">
            <span
                :class="{
                  'question-console-item': true,
                  'question-console-item--correct': index === 0,
                  'question-console-item--wrong': index === 1
                }"
                v-for="(question, index) in lesson.questions"
                :key="index"
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
          title: 'Các khóa học',
          route: {name: 'courses'}
        },
        {
          id: 3,
          title: 'Ứng dụng của đạo hàm để khảo sát - vẽ đồ thị hàm số',
          route: {name: 'course-detail', params: {id: 1}},
        },
        {
          id: 4,
          title: 'Xét tính đơn điệu của hàm số'
        }
      ],
      lesson: {
        name: 'Xét tính đơn điệu của hàm số',
        questions: [
          {
            id: 1,
            level: 1,
            content: '<p>Cho hàm số f(x) có đạo hàm f\'(x) = x<sup>2</sup>(x + 2). Mệnh đề nào sau đây đúng?</p>',
            choice_selected: 1,
            choice_correct: {
              id: 1,
              content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
            },
            choices: [
              {
                id: 1,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 2,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 3,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 4,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
            ]
          },
          {
            id: 2,
            level: 2,
            content: '<p>Cho hàm số f(x) có đạo hàm f\'(x) = x<sup>2</sup>(x + 2). Mệnh đề nào sau đây đúng?</p>',
            choice_selected: 1,
            choice_correct: {
              id: 1,
              content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
            },
            choices: [
              {
                id: 1,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 2,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 3,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 4,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
            ]
          },
          {
            id: 3,
            level: 1,
            content: '<p>Cho hàm số f(x) có đạo hàm f\'(x) = x<sup>2</sup>(x + 2). Mệnh đề nào sau đây đúng?</p>',
            choice_selected: 2,
            choice_correct: {
              id: 1,
              content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
            },
            choices: [
              {
                id: 1,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 2,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 3,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 4,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
            ]
          },
          {
            id: 4,
            level: 1,
            content: '<p>Cho hàm số f(x) có đạo hàm f\'(x) = x<sup>2</sup>(x + 2). Mệnh đề nào sau đây đúng?</p>',
            choice_selected: 2,
            choice_correct: {
              id: 1,
              content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
            },
            choices: [
              {
                id: 1,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 2,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 3,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 4,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
            ]
          },
          {
            id: 5,
            level: 3,
            content: '<p>Cho hàm số f(x) có đạo hàm f\'(x) = x<sup>2</sup>(x + 2). Mệnh đề nào sau đây đúng?</p>',
            choice_selected: 3,
            choice_correct: {
              id: 1,
              content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
            },
            choices: [
              {
                id: 1,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 2,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 3,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 4,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
            ]
          },
          {
            id: 6,
            level: 1,
            content: '<p>Cho hàm số f(x) có đạo hàm f\'(x) = x<sup>2</sup>(x + 2). Mệnh đề nào sau đây đúng?</p>',
            choice_selected: 1,
            choice_correct: {
              id: 1,
              content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
            },
            choices: [
              {
                id: 1,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 2,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 3,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 4,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
            ]
          },
          {
            id: 7,
            level: 1,
            content: '<p>Cho hàm số f(x) có đạo hàm f\'(x) = x<sup>2</sup>(x + 2). Mệnh đề nào sau đây đúng?</p>',
            choice_selected: 1,
            choice_correct: {
              id: 1,
              content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
            },
            choices: [
              {
                id: 1,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 2,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 3,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 4,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
            ]
          },
          {
            id: 8,
            level: 1,
            content: '<p>Cho hàm số f(x) có đạo hàm f\'(x) = x<sup>2</sup>(x + 2). Mệnh đề nào sau đây đúng?</p>',
            choice_selected: 1,
            choice_correct: {
              id: 1,
              content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
            },
            choices: [
              {
                id: 1,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 2,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 3,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 4,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
            ]
          },
          {
            id: 9,
            level: 1,
            content: '<p>Cho hàm số f(x) có đạo hàm f\'(x) = x<sup>2</sup>(x + 2). Mệnh đề nào sau đây đúng?</p>',
            choice_selected: 2,
            choice_correct: {
              id: 1,
              content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
            },
            choices: [
              {
                id: 1,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 2,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 3,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 4,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
            ]
          },
          {
            id: 10,
            level: 1,
            content: '<p>Cho hàm số f(x) có đạo hàm f\'(x) = x<sup>2</sup>(x + 2). Mệnh đề nào sau đây đúng?</p>',
            choice_selected: 2,
            choice_correct: {
              id: 1,
              content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
            },
            choices: [
              {
                id: 1,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 2,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 3,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
              {
                id: 4,
                content: '<p>f(x) đồng biến trên khoảng (-∞, -2)</p>',
              },
            ]
          },
        ]
      },
    };
  },
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
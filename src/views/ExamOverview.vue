<template>
  <div class="exam-detail-wrapper">
    <div class="container">
      <breadcrumb class="breadcrumb-wrapper" :items="breadcrumbs"/>
      <div class="exam-detail-box">
        <p class="page-heading">{{ exam.name }}</p>
        <list-question-overview
          :percentage_easy="exam.percentage_easy"
          :percentage_medium="exam.percentage_medium"
          :percentage_hard="exam.percentage_hard"
        >
          <template v-slot:overview-item>
            <p>
              Tổng:
              <span class="exam-overview--total-question">{{ $filter.formatNumber(exam.count_question) }}</span>
              câu hỏi
            </p>
          </template>
          <template v-slot:overview-last-item>
            <div class="overview-item--last-item">
              <router-link class="custom-btn" :to="{name: 'exams.detail', params: {id: exam.id}}">
                Làm ngay
              </router-link>
            </div>
          </template>
        </list-question-overview>
        <div class="exam-lesson-list-box">
          <p>Lịch sử làm bài</p>
          <div class="exam-lesson-list">
            <router-link
                class="exam-lesson-item"
                v-for="(history, index) in exam.histories"
                :key="index"
                :to="{name: 'exams.review', params: {id: history.id}}"
            >
              <div class="exam-lesson-item--index"><span>{{index + 1}}</span></div>
              <div class="exam-lesson-item--info">
                <div class="exam-lesson-item--meta">
                  <p>{{ history.name }}</p>
                  <span>Số câu đúng: {{ history.count_question_correct }}/{{ exam.count_question }}</span>
                  <span>
                    <v-icon icon="mdi-clock"/>
                    {{ $filter.formatDatetime(history.created_at) }}
                  </span>
                </div>
                <div class="exam-lesson-item--completion">
                  <span>{{ history.score }}/{{ exam.max_score }}</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import ListQuestionOverview from "@/components/ListQuestionOverview.vue";

export default {
  name: "ExamOverview",
  components: {ListQuestionOverview, Breadcrumb},
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
          title: 'Đề thi thử quốc gia 2024 môn Toán trường THPT chuyên ĐH Vinh'
        }
      ],
      exam: {
        id: 1,
        name: 'Đề thi thử quốc gia 2024 môn Toán trường THPT chuyên ĐH Vinh',
        histories: [
          {id: 1, name: 'Xét tính đơn điệu của hàm số', score: 3, count_question_correct: 6, created_at: '2024-12-10 08:30:00'},
          {id: 2, name: 'Xét tính đơn điệu của hàm số', score: 4, count_question_correct: 8, created_at: '2024-12-10 08:30:00'},
          {id: 3, name: 'Xét tính đơn điệu của hàm số', score: 5, count_question_correct: 10, created_at: '2024-12-10 08:30:00'},
          {id: 4, name: 'Xét tính đơn điệu của hàm số', score: 6, count_question_correct: 12, created_at: '2024-12-10 08:30:00'},
          {id: 5, name: 'Xét tính đơn điệu của hàm số', score: 7, count_question_correct: 14, created_at: '2024-12-10 08:30:00'},
          {id: 6, name: 'Xét tính đơn điệu của hàm số', score: 8, count_question_correct: 16, created_at: '2024-12-10 08:30:00'},
          {id: 7, name: 'Xét tính đơn điệu của hàm số', score: 8, count_question_correct: 16, created_at: '2024-12-10 08:30:00'},
          {id: 8, name: 'Xét tính đơn điệu của hàm số', score: 9, count_question_correct: 18, created_at: '2024-12-10 08:30:00'},
        ],
        count_question: 20,
        max_score: 10,
        percentage_easy: 67,
        percentage_medium: 24,
        percentage_hard: 9
      }
    }
  }
}
</script>

<style scoped>
.page-heading {
  font-size: 1.5rem;
  font-weight: 800;
  text-align: center;
  padding-bottom: .5rem;
}
.exam-lesson-list {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-bottom: 3rem;
  border-radius: 4px;
}
.exam-lesson-item {
  display: flex;
  border: 1px solid #eeeeee;
  transition: all .3s;
}
.exam-lesson-item:first-child {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.exam-lesson-item:last-child {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.exam-lesson-item:hover {
  position: relative;
  box-shadow: rgba(255, 121, 47, 0.7) 0px 3px 8px;
  z-index: 2;
  cursor: pointer;
}
.exam-lesson-item:hover .exam-lesson-item--meta p {
  color: var(--color-main);
}
.exam-lesson-item:not(:last-child) {
  border-bottom: unset;
}
.exam-lesson-item--index {
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.exam-lesson-item--index > span {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-main);
  color: #ffffff;
  border-radius: 50%;
  border: 1px solid var(--color-main);
  font-weight: 800;
}
.exam-lesson-item--info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 80px);
  padding: 1rem 2rem 1rem 1rem;
}
.exam-lesson-item--complete {
  background: #f0f9eb;
}
.exam-lesson-item--complete .exam-lesson-item--completion span {
  color: var(--color-main);
}
.exam-lesson-item--meta p {
  font-weight: 600;
}
.exam-lesson-item--meta span {
  font-size: .8rem;
  color: #949ba3;
}
.exam-overview--total-question {
  font-weight: 600;
  color: var(--color-main);
}
.overview-item--last-item {
  width: 100%;
  text-align: center;
}
.exam-lesson-list-box > p:first-child {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
.exam-lesson-item--meta span {
  padding-right: 1rem;
}
</style>
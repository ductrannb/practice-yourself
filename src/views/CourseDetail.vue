<template>
  <div class="course-detail-wrapper">
    <div class="container">
      <breadcrumb class="breadcrumb-wrapper" :items="breadcrumbs"/>
      <div class="course-detail-box">
        <p class="page-heading">{{ course.name }}</p>
        <list-question-overview percentage_easy="25" percentage_medium="50" percentage_hard="25">
          <template v-slot:overview-item>
            <p>
              Tổng:
              <span class="course-overview--total-question">{{ $filter.formatNumber(course.lessons?.length) }}</span>
              bài tập gồm
              <span class="course-overview--total-question">{{ $filter.formatNumber(course.total_question) }}</span>
              câu hỏi
            </p>
          </template>
        </list-question-overview>
        <div class="course-lesson-list-box">
          <div class="course-lesson-list">
            <router-link
              :class="{
                'course-lesson-item': true,
                'course-lesson-item--complete': lesson.completion === lesson.count_question
              }"
              v-for="(lesson, index) in course.lessons"
              :key="index"
              :to="{name: 'lesson-detail', params: {id: lesson.id}}"
            >
              <div class="course-lesson-item--index"><span>{{index + 1}}</span></div>
              <div class="course-lesson-item--info">
                <div class="course-lesson-item--meta">
                  <p>{{ lesson.name }}</p>
                  <span>{{ lesson.count_question }} câu hỏi</span>
                </div>
                <div class="course-lesson-item--completion">
                  <span v-if="lesson.completion === lesson.count_question">Hoàn thành</span>
                  <span v-else>{{ lesson.completion }}/{{lesson.count_question}}</span>
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
  name: "CourseDetail",
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
          title: 'Các khóa học',
          route: {name: 'courses'}
        },
        {
          id: 3,
          title: 'Ứng dụng của đạo hàm để khảo sát - vẽ đồ thị hàm số'
        }
      ],
      course: {
        name: 'Ứng dụng của đạo hàm để khảo sát - vẽ đồ thị hàm số',
        lessons: [
          {id: 1, name: 'Xét tính đơn điệu của hàm số', count_question: 20, completion: 20},
          {id: 2, name: 'Xét tính đơn điệu của hàm số', count_question: 20, completion: 12},
          {id: 3, name: 'Xét tính đơn điệu của hàm số', count_question: 20, completion: 20},
          {id: 4, name: 'Xét tính đơn điệu của hàm số', count_question: 15, completion: 12},
          {id: 5, name: 'Xét tính đơn điệu của hàm số', count_question: 20, completion: 12},
          {id: 6, name: 'Xét tính đơn điệu của hàm số', count_question: 20, completion: 12},
          {id: 7, name: 'Xét tính đơn điệu của hàm số', count_question: 20, completion: 12},
          {id: 8, name: 'Xét tính đơn điệu của hàm số', count_question: 20, completion: 12},
        ],
        total_question: 155,
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
.course-lesson-list {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-bottom: 3rem;
  border-radius: 4px;
}
.course-lesson-item {
  display: flex;
  border: 1px solid #eeeeee;
}
.course-lesson-item:first-child {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.course-lesson-item:last-child {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.course-lesson-item:hover {
  position: relative;
  box-shadow: rgba(255, 121, 47, 0.7) 0px 3px 8px;
  z-index: 2;
  cursor: pointer;
}
.course-lesson-item:hover .course-lesson-item--meta p {
  color: var(--color-main);
}
.course-lesson-item:not(:last-child) {
  border-bottom: unset;
}
.course-lesson-item--index {
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.course-lesson-item--index > span {
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
.course-lesson-item--info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 80px);
  padding: 1rem 2rem 1rem 1rem;
}
.course-lesson-item--complete {
  background: #f0f9eb;
}
.course-lesson-item--complete .course-lesson-item--completion span {
  color: var(--color-main);
}
.course-lesson-item--meta p {
  font-weight: 600;
}
.course-lesson-item--meta span {
  font-size: .85rem;
  color: #949ba3;
}
.course-overview--total-question {
  font-weight: 600;
  color: var(--color-main);
}
</style>
<template>
  <div class="course-detail-wrapper">
    <div class="container">
      <breadcrumb class="breadcrumb-wrapper" :items="breadcrumbs"/>
      <div class="course-detail-box">
        <p class="page-heading">{{ course.name }}</p>
        <list-question-overview
            :percentage_easy="course.percentage_easy"
            :percentage_medium="course.percentage_medium"
            :percentage_hard="course.percentage_hard">
          <template v-slot:overview-item>
            <p>
              Tổng:
              <span class="course-overview--total-question">{{ $filter.formatNumber(course.lessons?.length) }}</span>
              bài tập gồm
              <span class="course-overview--total-question">{{ $filter.formatNumber(course.total_question) }}</span>
              câu hỏi
            </p>
          </template>
          <template v-slot:overview-last-item>
            <div class="overview-item--last-item" v-if="!course.is_bought">
              <button class="custom-btn" @click="subscribeCourse(course.id)">
                Đăng ký ngay: {{ course.price == 0 ? `${course.price}đ` : 'MIỄN PHÍ' }}
              </button>
            </div>
          </template>
        </list-question-overview>
        <div class="course-lesson-list-box">
          <div class="course-lesson-list">
            <div v-if="!course.is_bought"
                 :class="{
                  'course-lesson-item': true,
                  'course-lesson-item--not-allowed': true
                }"
                 v-for="(lesson, index) in course.lessons">
              <LessonItem :index="index" :lesson="lesson"/>
            </div>
            <router-link
                v-else
                :class="{
                  'course-lesson-item': true,
                  'course-lesson-item--complete': isCompletedLesson(lesson)
                }"
                v-for="(lesson, index) in course.lessons"
                :to="{name: 'lessons.detail', params: {id: lesson.id}}">
              <LessonItem :index="index" :lesson="lesson"/>
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
import LessonItem from "@/components/LessonItem.vue";

export default {
  name: "CourseDetail",
  components: {LessonItem, ListQuestionOverview, Breadcrumb},
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
          title: this.course.name
        }
      ]
    }
  },
  data() {
    return {
      course: {
        name: null,
        lessons: [
          // {id: 1, name: 'Xét tính đơn điệu của hàm số', count_question: 20, completion: 20},
          // {id: 2, name: 'Xét tính đơn điệu của hàm số', count_question: 20, completion: 12},
          // {id: 3, name: 'Xét tính đơn điệu của hàm số', count_question: 20, completion: 20},
          // {id: 4, name: 'Xét tính đơn điệu của hàm số', count_question: 15, completion: 12},
          // {id: 5, name: 'Xét tính đơn điệu của hàm số', count_question: 20, completion: 12},
          // {id: 6, name: 'Xét tính đơn điệu của hàm số', count_question: 20, completion: 12},
          // {id: 7, name: 'Xét tính đơn điệu của hàm số', count_question: 20, completion: 12},
          // {id: 8, name: 'Xét tính đơn điệu của hàm số', count_question: 20, completion: 12},
        ],
        total_question: 0,
        percentage_easy: 0,
        percentage_medium: 0,
        percentage_hard: 0
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const res = await this.$axios.get(`home/courses/${this.$route.params.id}`);
      this.course = res.data.data
    },
    isCompletedLesson(lesson) {
      return lesson.count_question > 0 && lesson.completion === lesson.count_question
    },
    async subscribeCourse(id) {
      const res = await this.$axios.post(`home/courses/subscribe/${id}`);
      await this.fetchData()
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
}
.course-lesson-item:hover:not(.course-lesson-item--not-allowed) {
  cursor: pointer;
}
.course-lesson-item:hover .course-lesson-item--meta p {
  color: var(--color-main);
}
.course-lesson-item:not(:last-child) {
  border-bottom: unset;
}
.course-lesson-item--complete {
  background: #f0f9eb;
}
.course-lesson-item--complete .course-lesson-item--completion span {
  color: var(--color-main);
}
.course-overview--total-question {
  font-weight: 600;
  color: var(--color-main);
}
.course-lesson-item--not-allowed {
  cursor: not-allowed;
}
.overview-item--last-item {
  width: 100%;
  text-align: center;
}
</style>
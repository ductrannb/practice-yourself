<template>
  <div class="course-detail-wrapper">
    <div class="container">
      <breadcrumb class="breadcrumb-wrapper" :items="breadcrumbs"/>
      <div class="course-detail-box">
        <p class="page-heading">{{ course.name }}</p>

        <div class="course-overview">
          <div class="course-overview-item">
            <p>
              Tổng:
              <span class="course-overview--total-question">{{ $filter.formatNumber(course.lessons?.length) }}</span>
              bài tập gồm
              <span class="course-overview--total-question">{{ $filter.formatNumber(course.total_question) }}</span>
              câu hỏi
            </p>
          </div>
          <div class="course-overview-item">
            <div>Nhận biết</div>
            <div class="course-overview-item--process-box">
              <div>67%</div>
              <v-progress-linear
                class="course-overview-item--process-linear"
                color="#40B4E5"
                model-value="67"
                :height="10"
                bg-color="#E7ECEF"
                bg-opacity="1"
                rounded
              />
            </div>
          </div>
          <div class="course-overview-item">
            <div>Thông hiểu</div>
            <div class="course-overview-item--process-box">
              <div>24%</div>
              <v-progress-linear
                class="course-overview-item--process-linear"
                color="#8AC53E"
                model-value="24"
                bg-color="#E7ECEF"
                bg-opacity="1"
                :height="10"
                rounded
              />
            </div>
          </div>
          <div class="course-overview-item">
            <div>Vận dụng</div>
            <div class="course-overview-item--process-box">
              <div>9%</div>
              <v-progress-linear
                class="course-overview-item--process-linear"
                color="#FF9B2F"
                model-value="9"
                bg-color="#E7ECEF"
                bg-opacity="1"
                :height="10"
                rounded
              />
            </div>
          </div>
        </div>

        <div class="course-lesson-list">
          <v-timeline side="end" align="start">
            <v-timeline-item
                v-for="lesson in course.lessons"
                dot-color="var(--color-main)"
                elevation="number"
            >
              <div class="course-lesson-item">
                <div class="course-lesson-item--meta">
                  <p>{{ lesson.name }}</p>
                  <span>{{ lesson.count_question }} câu hỏi</span>
                </div>
                <div class="course-lesson-item--completion">
                  <span>{{ lesson.completion }}/{{lesson.count_question}}</span>
                </div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";

export default {
  name: "CourseDetail",
  components: {Breadcrumb},
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
          {id: 1, name: 'Xét tính đơn điệu của hàm số', count_question: 20, completion: 12},
          {id: 2, name: 'Xét tính đơn điệu của hàm số', count_question: 20, completion: 12},
          {id: 3, name: 'Xét tính đơn điệu của hàm số', count_question: 20, completion: 12},
          {id: 4, name: 'Xét tính đơn điệu của hàm số', count_question: 20, completion: 12},
          {id: 5, name: 'Xét tính đơn điệu của hàm số', count_question: 20, completion: 12},
          {id: 6, name: 'Xét tính đơn điệu của hàm số', count_question: 20, completion: 12},
          {id: 7, name: 'Xét tính đơn điệu của hàm số', count_question: 20, completion: 12},
          {id: 8, name: 'Xét tính đơn điệu của hàm số', count_question: 20, completion: 12},
        ],
        total_question: 160
      }
    }
  }
}
</script>

<style scoped>
.breadcrumb-wrapper {
  margin: 2rem 0 1rem;
}
.page-heading {
  font-size: 1.5rem;
  font-weight: 800;
  text-align: center;
  padding-bottom: .5rem;
}
.course-overview {
  width: 60%;
  margin: 0.5rem auto 2rem;
  padding: 1rem;
  border: 1px solid var(--color-main);
}
.course-overview-item {
  display: flex;
  padding: .25rem 0 .25rem 50px;
}
.course-overview-item > div:first-child {
  width: 170px;
  font-weight: 600;
}
.course-overview-item--process-box {
  display: flex;
  width: calc(100% - 170px);
  align-items: center;
}
.course-overview-item--process-box > div:first-child {
  width: 40px;
  color: #949ba3;
  font-size: .85rem;
}
.course-overview-item--process-linear {
  width: calc(100% - 120px);
  margin-left: -50px;
}
.course-overview--total-question {
  font-weight: bold;
  color: var(--color-main);
}
.course-lesson-list {
  display: flex;
  justify-content: start;
}
</style>
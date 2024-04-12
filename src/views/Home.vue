<template>
  <div>
    <div class="slogan-box container">
      <p class="slogan-heading cursor-default">
        Chinh phục kỳ thi THPT Quốc gia cùng hệ thống luyện thi <br> <span>Practice Yourself</span>
      </p>
    </div>

    <div class="course-wrapper container">
      <div class="group-heading cursor-default">
        <p>Khóa học mới</p>
        <TextBackgroundColor :blue="true"/>
      </div>
      <div class="course-list home-list-product">
        <CourseItem v-for="course in courses" :key="course.id" :item="course" />
      </div>
    </div>

    <div class="exam-wrapper container">
      <div class="group-heading cursor-default">
        <p>Đề thi thử</p>
        <TextBackgroundColor :blue="true"/>
      </div>
      <div class="exam-list home-list-product">
        <ExamTestItem v-for="exam in exams" :key="exam.id" :item="exam" />
      </div>
    </div>

    <div class="overview-wrapper">
      <div class="overview-container container">
        <div class="overview-item-box">
          <div class="overview-item--image-box">
            <img src="/images/icons/student.svg">
          </div>
          <div class="overview-item--meta-box">
            <span class="overview-item--meta-number">{{ $filter.formatNumber(10000) }}</span>
            <span class="overview-item--meta-title">Người dùng</span>
          </div>
        </div>
        <div class="overview-item-box">
          <div class="overview-item--image-box">
            <img src="/images/icons/question.svg">
          </div>
          <div class="overview-item--meta-box">
            <span class="overview-item--meta-number">{{ $filter.formatNumber(2000) }}</span>
            <span class="overview-item--meta-title">Câu trắc nghiệm</span>
          </div>
        </div>
        <div class="overview-item-box">
          <div class="overview-item--image-box">
            <img src="/images/icons/exam.svg">
          </div>
          <div class="overview-item--meta-box">
            <span class="overview-item--meta-number">{{ $filter.formatNumber(5000) }}</span>
            <span class="overview-item--meta-title">Đề thi thử</span>
          </div>
        </div>
        <div class="overview-item-box">
          <div class="overview-item--image-box">
            <img src="/images/icons/course.svg">
          </div>
          <div class="overview-item--meta-box">
            <span class="overview-item--meta-number">{{ $filter.formatNumber(90) }}</span>
            <span class="overview-item--meta-title">Khóa học</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"
import CourseItem from "@/components/CourseItem.vue"
import ExamTestItem from "@/components/ExamTestItem.vue"
import TextBackgroundColor from "@/components/TextBackgroundColor.vue"

export default {
  components: {TextBackgroundColor, ExamTestItem, CourseItem},
  data() {
    return {
      courses: [
        {id: 1, image: 'https://hocaz.vn/_next/image?url=%2Fimages%2Fhome%2Flop-11.png&w=256&q=90', name: 'Khóa học cấp tốc', short_description: 'Bộ bài tập, đề thi lớp 11 và lập kế hoạch cho tương lai'},
        {id: 2, image: 'https://hocaz.vn/_next/image?url=%2Fimages%2Fhome%2Flop-11.png&w=256&q=90', name: 'Khóa học cấp tốc', short_description: 'Bộ bài tập, đề thi lớp 11 và lập kế hoạch cho tương lai'},
        {id: 3, image: 'https://hocaz.vn/_next/image?url=%2Fimages%2Fhome%2Flop-11.png&w=256&q=90', name: 'Khóa học cấp tốc', short_description: 'Bộ bài tập, đề thi lớp 11 và lập kế hoạch cho tương lai'},
        {id: 4, image: 'https://hocaz.vn/_next/image?url=%2Fimages%2Fhome%2Flop-11.png&w=256&q=90', name: 'Khóa học cấp tốc', short_description: 'Bộ bài tập, đề thi lớp 11 và lập kế hoạch cho tương lai'},
        {id: 5, image: 'https://hocaz.vn/_next/image?url=%2Fimages%2Fhome%2Flop-11.png&w=256&q=90', name: 'Khóa học cấp tốc', short_description: 'Bộ bài tập, đề thi lớp 11 và lập kế hoạch cho tương lai'},
        {id: 6, image: 'https://hocaz.vn/_next/image?url=%2Fimages%2Fhome%2Flop-11.png&w=256&q=90', name: 'Khóa học cấp tốc', short_description: 'Bộ bài tập, đề thi lớp 11 và lập kế hoạch cho tương lai'},
        {id: 7, image: 'https://hocaz.vn/_next/image?url=%2Fimages%2Fhome%2Flop-11.png&w=256&q=90', name: 'Khóa học cấp tốc', short_description: 'Bộ bài tập, đề thi lớp 11 và lập kế hoạch cho tương lai'}
      ],
      exams: [
        {id: 1, name: 'Đề thi thử THPT Quốc Gia Toán tỉnh Ninh Bình', short_description: 'Bộ bài tập, đề thi lớp 11 và lập kế hoạch cho tương lai'},
        {id: 2, name: 'Đề thi thử THPT Quốc Gia Toán tỉnh Nam Định', short_description: 'Bộ bài tập, đề thi lớp 11 và lập kế hoạch cho tương lai'},
        {id: 3, name: 'Đề thi thử THPT Quốc Gia Toán thành phố Hà Nội', short_description: 'Bộ bài tập, đề thi lớp 11 và lập kế hoạch cho tương lai'},
        {id: 4, name: 'Đề thi thử THPT Quốc Gia Toán tỉnh Ninh Bình', short_description: 'Bộ bài tập, đề thi lớp 11 và lập kế hoạch cho tương lai'}
      ],
    }
  },
  created() {
    console.log()
  },
  computed: {
    ...mapGetters(['isLoading'])
  },
  mounted() {
  },
  methods: {
    ...mapActions(['startLoading', 'stopLoading'])
  }
}
</script>
<style scoped>
.slogan-box {
  margin-top: 5rem;
  margin-bottom: 1.75rem;
}
.slogan-heading {
  color: #2CA6EB;
  font-weight: 600;
  font-size: 2rem;
  text-align: center;
}
.slogan-heading span {
  color: var(--color-main);
  font-weight: 800;
}
.course-wrapper {
  padding-top: 2rem;
}
.course-list {
}
.exam-wrapper {
  padding-top: 2rem;
}
.exam-list {
}
.home-list-product {
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 1rem;
  row-gap: 2rem;
}
.overview-wrapper {
  margin: 5rem 0;
  height: 230px;
  background-image: url(/images/overview-bg.png);
  background-size: cover;
  display: flex;
  align-items: center;
}
.overview-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 25%);
}
.overview-item-box {
  display: flex;
  justify-content: center;
  column-gap: 20px;
}
.overview-item--image-box {
  width: 76px;
  height: 76px;
  justify-content: center;
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 10px;
}
.overview-item--meta-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.overview-item--meta-number {
  font-size: 2rem;
  color: var(--color-main);
  font-weight: 800;
}
.overview-item--meta-title {
  line-height: 2;
  font-weight: 700;
}
</style>
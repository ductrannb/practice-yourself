<template>
  <div class="course-list-wrapper">
    <div class="container">
      <div class="group-heading cursor-default">
        <p>Danh sách khóa học</p>
        <TextBackgroundColor :blue="true"/>
      </div>
      <div class="course-list-box">
        <CourseItem v-for="course in courses" :key="course.id" :item="course" />
      </div>
      <div class="btn-load-more-box">
        <button
            class="btn-load-more custom-btn float-animation"
            :disabled="form.page >= paginate.last_page"
            @click="nextPage"
        >
          Xem thêm khóa học
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CourseItem from "@/components/CourseItem.vue";
import TextBackgroundColor from "@/components/TextBackgroundColor.vue";
import {mapActions} from "vuex";

export default {
  name: "Courses",
  components: {TextBackgroundColor, CourseItem},
  data() {
    return {
      courses: [
        // {id: 1, image: 'https://hocaz.vn/_next/image?url=%2Fimages%2Fhome%2Flop-11.png&w=256&q=90', name: 'Khóa học cấp tốc', short_description: 'Bộ bài tập, đề thi lớp 11 và lập kế hoạch cho tương lai'},
        // {id: 2, image: 'https://hocaz.vn/_next/image?url=%2Fimages%2Fhome%2Flop-11.png&w=256&q=90', name: 'Khóa học cấp tốc', short_description: 'Bộ bài tập, đề thi lớp 11 và lập kế hoạch cho tương lai'},
        // {id: 3, image: 'https://hocaz.vn/_next/image?url=%2Fimages%2Fhome%2Flop-11.png&w=256&q=90', name: 'Khóa học cấp tốc', short_description: 'Bộ bài tập, đề thi lớp 11 và lập kế hoạch cho tương lai'},
        // {id: 4, image: 'https://hocaz.vn/_next/image?url=%2Fimages%2Fhome%2Flop-11.png&w=256&q=90', name: 'Khóa học cấp tốc', short_description: 'Bộ bài tập, đề thi lớp 11 và lập kế hoạch cho tương lai'},
        // {id: 5, image: 'https://hocaz.vn/_next/image?url=%2Fimages%2Fhome%2Flop-11.png&w=256&q=90', name: 'Khóa học cấp tốc', short_description: 'Bộ bài tập, đề thi lớp 11 và lập kế hoạch cho tương lai'},
        // {id: 6, image: 'https://hocaz.vn/_next/image?url=%2Fimages%2Fhome%2Flop-11.png&w=256&q=90', name: 'Khóa học cấp tốc', short_description: 'Bộ bài tập, đề thi lớp 11 và lập kế hoạch cho tương lai'},
        // {id: 7, image: 'https://hocaz.vn/_next/image?url=%2Fimages%2Fhome%2Flop-11.png&w=256&q=90', name: 'Khóa học cấp tốc', short_description: 'Bộ bài tập, đề thi lớp 11 và lập kế hoạch cho tương lai'},
        // {id: 8, image: 'https://hocaz.vn/_next/image?url=%2Fimages%2Fhome%2Flop-11.png&w=256&q=90', name: 'Khóa học cấp tốc', short_description: 'Bộ bài tập, đề thi lớp 11 và lập kế hoạch cho tương lai'},
        // {id: 9, image: 'https://hocaz.vn/_next/image?url=%2Fimages%2Fhome%2Flop-11.png&w=256&q=90', name: 'Khóa học cấp tốc', short_description: 'Bộ bài tập, đề thi lớp 11 và lập kế hoạch cho tương lai'},
        // {id: 10, image: 'https://hocaz.vn/_next/image?url=%2Fimages%2Fhome%2Flop-11.png&w=256&q=90', name: 'Khóa học cấp tốc', short_description: 'Bộ bài tập, đề thi lớp 11 và lập kế hoạch cho tương lai'},
        // {id: 11, image: 'https://hocaz.vn/_next/image?url=%2Fimages%2Fhome%2Flop-11.png&w=256&q=90', name: 'Khóa học cấp tốc', short_description: 'Bộ bài tập, đề thi lớp 11 và lập kế hoạch cho tương lai'},
        // {id: 12, image: 'https://hocaz.vn/_next/image?url=%2Fimages%2Fhome%2Flop-11.png&w=256&q=90', name: 'Khóa học cấp tốc', short_description: 'Bộ bài tập, đề thi lớp 11 và lập kế hoạch cho tương lai'},
        // {id: 13, image: 'https://hocaz.vn/_next/image?url=%2Fimages%2Fhome%2Flop-11.png&w=256&q=90', name: 'Khóa học cấp tốc', short_description: 'Bộ bài tập, đề thi lớp 11 và lập kế hoạch cho tương lai'},
        // {id: 14, image: 'https://hocaz.vn/_next/image?url=%2Fimages%2Fhome%2Flop-11.png&w=256&q=90', name: 'Khóa học cấp tốc', short_description: 'Bộ bài tập, đề thi lớp 11 và lập kế hoạch cho tương lai'},
        // {id: 15, image: 'https://hocaz.vn/_next/image?url=%2Fimages%2Fhome%2Flop-11.png&w=256&q=90', name: 'Khóa học cấp tốc', short_description: 'Bộ bài tập, đề thi lớp 11 và lập kế hoạch cho tương lai'},
        // {id: 16, image: 'https://hocaz.vn/_next/image?url=%2Fimages%2Fhome%2Flop-11.png&w=256&q=90', name: 'Khóa học cấp tốc', short_description: 'Bộ bài tập, đề thi lớp 11 và lập kế hoạch cho tương lai'},
      ],
      form: {
        keyword: null,
        page: 1,
        per_page: 8
      },
      paginate: {
        last_page: 1,
        total: 0
      }
    }
  },
  async created() {
    this.courses = await this.fetchList()
  },
  methods: {
    ...mapActions(['startLoading', 'stopLoading']),
    async fetchList() {
      const res = await this.$axios.get('courses', {params: this.form})
      this.form.page = res.data.current_page
      this.paginate = {last_page: res.data.last_page, total: res.data.total}
      return res.data.data
    },
    async nextPage() {
      this.form.page += 1
      const data = await this.fetchList()
      this.courses = this.courses.concat(data)
    }
  }
}
</script>

<style scoped>
.course-list-box {
  display: flex;
  flex-wrap: wrap;
  column-gap: 1rem;
  row-gap: 2rem;
}
.group-heading {
  margin-top: 3rem;
  margin-bottom: 2rem;
}
.btn-load-more-box {
  text-align: center;
  margin: 3rem 0;
}
.btn-load-more:not(:disabled) {
  box-shadow: var(--color-main) 2px 5px 14px -1px;
}
</style>
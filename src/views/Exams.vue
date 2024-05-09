<template>
  <div class="exam-wrapper">
    <div class="container">
      <breadcrumb class="breadcrumb-wrapper" :items="breadcrumbs"/>
      <div class="group-heading cursor-default">
        <p>Bộ đề thi thử</p>
        <TextBackgroundColor :blue="true"/>
      </div>
      <p class="sub-page-title">
        Chương trình Luyện đề thi thử THPT Quốc gia môn Toán giúp học sinh củng cố chắc kiến thức, đồng thời tự đánh giá khả năng và trình độ học tập của mình, từ đó có thể xây dựng kế hoạch học tập cụ thể và phù hợp.
      </p>
      <div class="exam-list-box">
        <div class="exam-list">
          <router-link
              :class="{
                'exam-item': true,
                'exam-item--complete': exam.is_finished
              }"
              v-for="(exam, index) in exams"
              :key="index"
              :to="{name: 'exams.overview', params: {id: exam.id}}"
          >
            <div class="exam-item--index"><span>{{index + 1}}</span></div>
            <div class="exam-item--info">
              <div class="exam-item--meta">
                <p>{{ exam.name }}</p>
                <span class="exam-item--meta-question">{{ exam.count_question }} câu hỏi</span>
                <span class="exam-item--meta-time">{{ exam.time }} phút</span>
              </div>
            </div>
          </router-link>
        </div>
        <div class="exam-paginate-box">
          <v-pagination
            class="exam-paginate"
            v-model="paginate.current_page"
            :length="paginate.last_page"
            :total-visible="6"
            color="var(--color-main)"
            @update:model-value="fetchData"
          ></v-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import TextBackgroundColor from "@/components/TextBackgroundColor.vue";

export default {
  name: "Exams",
  components: {TextBackgroundColor, Breadcrumb},
  computed: {
    breadcrumbs () {
      return [
        {
          title: 'Trang chủ',
          route: {name: 'home'}
        }, {
          title: 'Thi thử'
        }
      ]
    },
  },
  data() {
    return {
      exams: [],
      paginate: {
        current_page: 1,
        last_page: 1,
        total: 0,
      }
    }
  },
  created() {
    this.page = Number.parseInt(this.$route.query.page) || 1
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const res = await this.$axios.get('home/exams', {params: {page: this.paginate.current_page}})
      this.paginate = {
        current_page: res.data.current_page,
        last_page: res.data.last_page,
        total: res.data.total
      }

      this.$router.push({name: 'exams', query: {page: this.paginate.current_page}})
      this.exams = res.data.data
    }
  }
}
</script>

<style scoped>
.group-heading {
  margin-top: 3rem;
  margin-bottom: 1rem;
}
.sub-page-title {
  color: #5a6173;
  text-align: center;
  margin-bottom: 4rem;
}
.exam-list {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-bottom: 3rem;
  border-radius: 4px;
}
.exam-item {
  display: flex;
  border: 1px solid #eeeeee;
  transition: all .3s;
}
.exam-item:first-child {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.exam-item:last-child {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.exam-item:hover {
  position: relative;
  box-shadow: rgba(255, 121, 47, 0.7) 0px 3px 8px;
  z-index: 2;
  cursor: pointer;
}
.exam-item:hover .exam-item--meta p {
  color: var(--color-main);
}
.exam-item:not(:last-child) {
  border-bottom: unset;
}
.exam-item--index {
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.exam-item--index > span {
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
.exam-item--info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 80px);
  padding: 1rem 2rem 1rem 1rem;
}
.exam-item--complete {
  background: #f0f9eb;
}
.exam-item--complete .exam-item--completion span {
  color: var(--color-main);
}
.exam-item--meta p {
  font-weight: 600;
}
.exam-item--meta span {
  font-size: .85rem;
  color: #949ba3;
}
.exam-item--meta-question {
  margin-right: .7rem;
}
.exam-paginate-box {
  margin-bottom: 3rem;
}
</style>
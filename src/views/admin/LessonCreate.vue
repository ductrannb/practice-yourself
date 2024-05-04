<template>
  <div class="admin-user-wrapper">
    <div class="admin-container">
      <breadcrumb class="admin-breadcrumb-wrapper" :items="breadcrumbs"/>
      <div class="user-form-container">
        <LessonForm @onSubmit="onSubmit"></LessonForm>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import LessonForm from "@/components/LessonForm.vue";

export default {
  name: "LessonCreate",
  components: {LessonForm, Breadcrumb},
  computed: {
    breadcrumbs() {
      return [
        {
          id: 1,
          title: 'Dashboard',
          route: {name: this.replaceRouteName('dashboard')}
        }, {
          id: 2,
          title: 'Khóa học',
          route: {name: this.replaceRouteName('courses')}
        }, {
          id: 3,
          title: this.courseName,
          route: {name: this.replaceRouteName('courses.lessons'), params: {id: this.$route.params.id}}
        }, {
          id: 4,
          title: 'Thêm mới'
        },
      ]
    }
  },
  created() {
    this.fetchName()
  },
  data() {
    return {
      courseName: null
    }
  },
  methods: {
    async fetchName() {
      const res = await this.$axios.get(`courses/get-name/${this.$route.params.id}`)
      this.courseName = res.data.data.name
    },
    async onSubmit(form) {
      await this.$axios.post('/lessons', form)
      this.$router.push({name: this.replaceRouteName('courses.lessons'), params: {id: this.$route.params.id}})
    }
  }
}
</script>

<style scoped>
</style>
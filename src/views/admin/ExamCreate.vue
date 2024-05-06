<template>
  <div class="admin-user-wrapper">
    <div class="admin-container">
      <breadcrumb class="admin-breadcrumb-wrapper" :items="breadcrumbs"/>
      <div class="user-form-container">
        <ExamForm @onSubmit="onSubmit"></ExamForm>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import ExamForm from "@/components/ExamForm.vue";

export default {
  name: "ExamCreate",
  components: {ExamForm, Breadcrumb},
  computed: {
    breadcrumbs() {
      return [
        {
          title: 'Dashboard',
          route: {name: this.replaceRouteName('dashboard')}
        }, {
          title: 'Đề thi thử',
          route: {name: this.replaceRouteName('exams')}
        }, {
          title: 'Thêm mới'
        },
      ]
    }
  },
  created() {
  },
  data() {
    return {
    }
  },
  methods: {
    async onSubmit(form) {
      await this.$axios.post('/exams', form)
      this.$router.push({name: this.replaceRouteName('exams')})
    }
  }
}
</script>

<style scoped>
</style>
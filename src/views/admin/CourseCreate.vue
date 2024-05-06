<template>
  <div class="admin-user-wrapper">
    <div class="admin-container">
      <breadcrumb class="admin-breadcrumb-wrapper" :items="breadcrumbs"/>
      <div class="user-form-container">
        <CourseForm @onSubmit="onSubmit"></CourseForm>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import CourseForm from "@/components/CourseForm.vue";

export default {
  name: "CourseCreate",
  components: {CourseForm, Breadcrumb},
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
          title: 'Thêm mới'
        },
      ]
    }
  },
  data() {
    return {
    }
  },
  methods: {
    async onSubmit(form) {
      const formData = this.objectToFormData(form)
      await this.$axios.post('courses', formData, this.configRequestFormData())
      this.$router.push({name: this.replaceRouteName('courses')})
    }
  }
}
</script>

<style scoped>
</style>
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
          route: {name: 'admin.dashboard'}
        }, {
          id: 2,
          title: 'Khóa học',
          route: {name: 'admin.courses'}
        }, {
          id: 3,
          title: 'Cập nhật'
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
      if (!form.image || typeof form.image === 'string') {
        delete form.image
      }
      const formData = this.objectToFormData(form)
      await this.$axios.post(`courses/${this.$route.params.id}?_method=put`, formData, this.configRequestFormData())
      this.$router.push({name: 'admin.courses'})
    }
  }
}
</script>

<style scoped>
</style>
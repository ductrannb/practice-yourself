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
import axios from "axios";

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
      if (form.file) {
        const formData = new FormData()
        formData.append('file', form.file)
        formData.append('options_json', '{"conversion_formats": {"tex.zip": true}, "math_inline_delimiters": ["$", "$"], "rm_spaces": true}')
        const res = await axios.post('https://api.mathpix.com/v3/pdf', formData, {
            headers: {
              'app_id': import.meta.env.VITE_MATHPIX_APP_ID,
              'app_key': import.meta.env.VITE_MATHPIX_APP_KEY,
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        form.pdf_id = res.data.pdf_id
        delete form.file
      }
      await this.$axios.post('/exams', form)
      this.$router.push({name: this.replaceRouteName('exams')})
    }
  }
}
</script>

<style scoped>
</style>
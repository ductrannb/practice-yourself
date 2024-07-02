<template>
  <div class="admin-user-wrapper">
    <div class="admin-container">
      <breadcrumb class="admin-breadcrumb-wrapper" :items="breadcrumbs"/>
      <div class="user-form-container">
        <QuestionForm @onSubmit="onSubmit"></QuestionForm>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import QuestionForm from "@/components/QuestionForm.vue";
import constants from "@/Utils/constants.js";

export default {
  name: "QuestionUpdate",
  components: {QuestionForm, Breadcrumb},
  computed: {
    breadcrumbs() {
      return [
        {
          title: 'Dashboard',
          route: {name: this.replaceRouteName('dashboard')}
        }, {
          title: 'Ngân hàng câu hỏi',
          route: {name: this.replaceRouteName('questions-bank')}
        }, {
          title: 'Cập nhật'
        }
      ]
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    async onSubmit(form) {
      const res = await this.$axios.put(`questions/${this.$route.params.id}`, form)
      this.$router.push({name: this.replaceRouteName('questions-bank')})
    },
  }
}
</script>

<style scoped>
</style>
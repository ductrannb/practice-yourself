<template>
  <Form as="v-form" :validation-schema="schema" @submit="onSubmit">
    <InputValidation
        class="mb-2"
        name="name"
        label="Tên bài học"
        type="text"
        variant="underlined"
        color="red"
        :is-required="true"
        v-model="form.name"
        :updater="form.name"
    />
    <div class="admin-form-footer">
      <router-link
          :to="{name: replaceRouteName('courses.lessons'), params: {id: this.$route.params.id}}"
          class="admin-form-footer-btn admin-form-footer-btn--cancel"
      >
        Hủy
      </router-link>
      <button type="submit" class="admin-form-footer-btn admin-form-footer-btn--submit">Lưu</button>
    </div>
  </Form>
</template>

<script>
import * as Yup from "yup";

export default {
  name: "LessonForm",
  setup() {
    const schema = Yup.object().shape({
      name: Yup.string().required().label('tên bài học')
    });

    return { schema }
  },
  data() {
    return {
      form: {
        name: null,
        course_id: null
      },
      teachers: []
    }
  },
  created() {
    if (this.$route.name === this.replaceRouteName('courses.lessons.update')) {
      this.fetchLesson()
    } else {
      this.form.course_id = this.$route.params.id
    }
  },
  methods: {
    async fetchLesson() {
      const res = await this.$axios.get(`lessons/${this.$route.params.lessonId}`)
      this.form = res.data.data
    },
    onSubmit() {
      this.$emit('onSubmit', this.form)
    }
  }
}
</script>

<style scoped>
.form-input-password-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.form-input-password-box button {
  margin-left: 1rem;
  padding: .5rem 1rem;
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  color: var(--color-primary);
}
.form-input-password-box button:hover {
  background-color: var(--color-primary);
  color: #FFFFFF;
}
</style>
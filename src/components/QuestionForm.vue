<template>
  <Form class="question-form" as="v-form" :validation-schema="schema" @submit="onSubmit">
    <div class="question-form-group">
      <label>Nội dung câu hỏi *</label>
      <CustomCkeditor id="content" v-model="form.content"></CustomCkeditor>
    </div>
    <div class="admin-form-footer">
      <router-link
          :to="{name: 'admin.courses.lessons.questions', params: {id: 1, lessonId: 2}}"
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
  name: "QuestionForm",
  setup() {
    const schema = Yup.object().shape({
      name: Yup.string().required().label('tiêu đề'),
      price: Yup.number().required().min(0).label('giá'),
    });

    return { schema }
  },
  data() {
    return {
      form: {
        content: ''
      },
      teachers: [
        {id: 1, name: 'Trần Đức 1'},
        {id: 2, name: 'Trần Đức 2'},
        {id: 3, name: 'Trần Đức 3'},
        {id: 4, name: 'Trần Đức 4'},
      ]
    }
  },
  methods: {
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
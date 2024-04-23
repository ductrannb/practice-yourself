<template>
  <Form class="question-form" as="v-form" :validation-schema="schema" @submit="onSubmit">
    <span class="question-form--text-note">Hãy nhập nội dung câu hỏi và các đáp án. Sau đó tích vào một đáp án để chọn nó là đáp án đúng</span>
    <div class="question-form-group">
      <label class="required">Nội dung câu hỏi</label>
      <CustomCkeditor
        class="question-form--question-content"
        v-model="form.content"
        placeholder="Nhập nội dung câu hỏi"
      />
    </div>
    <div class="question-form-group">
      <div class="question-choice-box">
        <label class="question-choice-label required">Đáp án A</label>
        <v-checkbox-btn size="20"></v-checkbox-btn>
      </div>
      <CustomCkeditor v-model="form.content" placeholder="Nhập nội dung đáp án A"/>
    </div>
    <div class="question-form-group">
      <div class="question-choice-box">
        <label class="question-choice-label required">Đáp án B</label>
        <v-checkbox-btn size="20"></v-checkbox-btn>
      </div>
      <CustomCkeditor v-model="form.content" placeholder="Nhập nội dung đáp án B"/>
    </div>
    <div class="question-form-group">
      <div class="question-choice-box">
        <label class="question-choice-label required">Đáp án C</label>
        <v-checkbox-btn size="20"></v-checkbox-btn>
      </div>
      <CustomCkeditor v-model="form.content" placeholder="Nhập nội dung đáp án C"/>
    </div>
    <div class="question-form-group">
      <div class="question-choice-box">
        <label class="question-choice-label required">Đáp án D</label>
        <v-checkbox-btn size="20"></v-checkbox-btn>
      </div>
      <CustomCkeditor v-model="form.content" placeholder="Nhập nội dung đáp án D"/>
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
.question-form--text-note {
  color: red;
  font-size: .9rem;
  font-style: italic;
}
.question-form-group {
  margin-top: .75rem;
}
.question-form--question-content {
  margin-top: .5rem;
}
.question-choice-box {
  display: flex;
  align-items: center;
}
.admin-form-footer {
  margin-top: 2rem;
}
</style>
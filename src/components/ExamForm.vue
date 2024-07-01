<template>
  <Form as="v-form" :validation-schema="schema" @submit="onSubmit">
    <InputValidation
        class="mb-2"
        name="name"
        label="Tiêu đề"
        type="text"
        variant="underlined"
        color="red"
        :is-required="true"
        v-model="form.name"
        :updater="form.name"/>
    <div class="time-input-box">
      <v-number-input
          label="Thời gian (phút)"
          :min="0"
          variant="underlined"
          v-model="form.time"
          :step="5"/>
    </div>
    <div class="time-input-box" v-if="['teacher.exams.create', 'admin.exams.create'].includes($route.name)">
      <v-file-input
          label="File đề thi"
          accept=".pdf"
          variant="underlined"
          @change="onChange"/>
    </div>
    <div class="admin-form-footer">
      <router-link
          :to="{name: replaceRouteName('exams')}"
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
  name: "ExamForm",
  setup() {
    const schema = Yup.object().shape({
      name: Yup.string().required().label('tiêu đề')
    });

    return { schema }
  },
  data() {
    return {
      form: {
        name: null,
        time: 90,
        file: null
      }
    }
  },
  created() {
    if (this.$route.name === this.replaceRouteName('exams.update')) {
      this.fetchExam()
    }
  },
  methods: {
    async fetchExam() {
      const res = await this.$axios.get(`exams/${this.$route.params.id}`)
      this.form = res.data.data
    },
    onSubmit() {
      this.$emit('onSubmit', this.form)
    },
    onChange(event) {
      this.form.file = event.target.files[0] ?? null
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
.time-input-box {
  width: 200px;
  display: flex;
  align-items: center;
  column-gap: 1rem;
}
</style>
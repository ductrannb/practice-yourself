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
        :updater="form.name"
    />
    <InputValidation
        class="mb-2"
        name="price"
        label="Giá"
        variant="underlined"
        color="red"
        :is-required="true"
        v-model="form.price"
        :updater="form.price"
    >
      <template v-slot:append>
        <span class="mr-2">VNĐ</span>
      </template>
    </InputValidation>
    <div class="input-image-box">
      <v-file-input
          accept="image/*"
          prepend-icon="mdi-camera"
          variant="underlined"
          color="var(--color-main)"
          v-model="image"
          :error-messages="validateMessages.image"
          @input="updateImage"
          @click:clear="form.image = null"
      >
        <template v-slot:label>
          <label class="required">Hình ảnh</label>
        </template>
      </v-file-input>
      <div class="input-image--preview-box" v-if="getUrlPreview()">
        <img :src="getUrlPreview()" alt="preview">
      </div>
    </div>
    <v-textarea
        class="mt-4"
        v-model="form.description" no-resize
        rows="4" max-rows="4"
        label="Mô tả" variant="outlined" color="var(--color-main)"
    />
    <v-autocomplete
      v-model="form.teachers"
      :items="teachers"
      label="Giáo viên phụ trách"
      multiple
      clearable
      variant="underlined"
      item-title="name"
      item-value="id"
      color="var(--color-main)"
      chips
    >
    </v-autocomplete>
    <div class="admin-form-footer">
      <router-link
          :to="{name: replaceRouteName('courses')}"
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
import constants from "@/Utils/constants.js";
import CustomCkeditor from "@/components/CustomCkeditor.vue";

export default {
  name: "CourseForm",
  components: {CustomCkeditor},
  setup() {
    const schema = Yup.object().shape({
      name: Yup.string().required().label('tiêu đề'),
      price: Yup.number().required().min(0).label('giá'),
    });

    return { schema }
  },
  data() {
    return {
      image: [],
      form: {
        name: null,
        price: null,
        image: null,
        description: null,
        teachers: []
      },
      validateMessages: {
        image: null,
      },
      teachers: []
    }
  },
  created() {
    this.fetchListTeacher()
    if (this.$route.name === this.replaceRouteName('courses.update')) {
      this.fetchCourse()
    }
  },
  methods: {
    onSubmit() {
      if (this.form.image == null) {
        this.validateMessages.image = 'Vui lòng chọn hình ảnh.'
        return
      }
      this.$emit('onSubmit', this.form)
    },
    async fetchCourse() {
      const res = await this.$axios.get(`courses/${this.$route.params.id}`)
      this.form = res.data.data
      this.form.teachers = this.form.teachers.map(teacher => teacher.id)
    },
    async fetchListTeacher() {
      let params = {role: constants.ROLE.TEACHER}
      const res = await this.$axios.get('users', {params: params})
      this.teachers = res.data.data || []
    },
    updateImage(event) {
      this.form.image = event.target.files[0] || null
      this.validateMessages.image = this.form.image == null ? 'Vui lòng chọn hình ảnh.' : null
    },
    getUrlPreview() {
      if (this.image[0]) {
        return URL.createObjectURL(this.image[0])
      }
      return this.form.image || null
    }
  }
}
</script>

<style scoped>
.input-image--preview-box {
  max-width: 250px;
  height: auto;
}
.input-image--preview-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
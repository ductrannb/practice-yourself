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
    />
    <InputValidation
        class="mb-2"
        name="price"
        label="Giá"
        variant="underlined"
        color="red"
        :is-required="true"
        v-model="form.price"
    />
    <v-file-input
      accept="image/*"
      label="Hình ảnh"
      prepend-icon="mdi-camera"
      variant="underlined"
      color="var(--color-main)"
    ></v-file-input>
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
          :to="{name: 'admin.courses'}"
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
  name: "CourseForm",
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
        name: null,
        price: null,
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
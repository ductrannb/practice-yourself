<template>
  <Form as="v-form" :validation-schema="schema" @submit="onSubmit">
    <InputValidation
        class="mb-2"
        name="name"
        label="Họ và tên *"
        type="text"
        variant="underlined"
        color="red"
        v-model="form.name"
    />
    <InputValidation
        class="mb-2"
        name="email"
        label="Email *"
        type="text"
        variant="underlined"
        color="red"
        v-model="form.email"
    />
    <div class="form-input-password-box mb-2">
      <InputValidation
          name="password"
          label="Mật khẩu *"
          :is-password="true"
          variant="underlined"
          color="red"
          v-model="form.password"
      />
      <button type="button" @click="generateRandomPassword">Tạo mật khẩu ngẫu nhiên</button>
    </div>
    <InputValidation
        class="mb-2"
        name="phone"
        label="Số điện thoại"
        variant="underlined"
        color="red"
        v-model="form.phone"
    />
    <div class="admin-form-footer">
      <router-link
          :to="{name: 'admin.users'}"
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
  name: "UserForm",
  setup() {
    const schema = Yup.object().shape({
      name: Yup.string().required().label('họ và tên'),
      email: Yup.string().required().email().label('email'),
      password: Yup.string().required().min(6).label('mật khẩu'),
      phone: Yup.string().min(10)
        .matches(/^(84|0[35789])[0-9]{8}$/, 'Số điện thoại không hợp lệ')
        .label('số điện thoại'),
    });

    return { schema }
  },
  data() {
    return {
      form: {
        name: null,
        email: null,
        password: null,
        phone: null,
      }
    }
  },
  methods: {
    onSubmit() {
      this.$emit('submit')
    },
    generateRandomPassword() {
      this.form.password = Math.random().toString(36).slice(-8)
      this.$forceUpdate()
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
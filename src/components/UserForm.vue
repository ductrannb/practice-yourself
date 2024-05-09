<template>
  <Form as="v-form" :validation-schema="schema" @submit="onSubmit">
    <InputValidation
      class="mb-2"
      name="name"
      label="Họ và tên"
      type="text"
      variant="underlined"
      color="red"
      :is-required="true"
      v-model="form.name"
      :updater="form.name"
    />
    <InputValidation
      class="mb-2"
      name="email"
      label="Email"
      type="text"
      variant="underlined"
      color="red"
      :is-required="true"
      v-model="form.email"
      :updater="form.email"
    />
    <div class="form-input-password-box mb-2">
      <InputValidation
        name="password"
        label="Mật khẩu"
        :is-password="true"
        variant="underlined"
        color="red"
        :is-required="true"
        v-model="form.password"
        :updater="form.password"
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
      :updater="form.phone"
    />
    <div class="admin-form-footer">
      <router-link
        :to="{name: getRouteNameBack}"
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
import {useRoute} from "vue-router";

export default {
  name: "UserForm",
  setup() {
    const route = useRoute()
    const schema = Yup.object().shape({
      name: Yup.string().required().label('họ và tên'),
      email: Yup.string().required().email().label('email'),
      password: (['admin.users.create', 'admin.teachers.create'].includes(route.name) ? Yup.string().required() : Yup.string()).min(6).label('mật khẩu'),
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
  computed: {
    getRouteNameBack() {
      return this.$route.name.startsWith('admin.users') ? 'admin.users' : 'admin.teachers'
    }
  },
  created() {
    if (['admin.users.update', 'admin.teachers.update'].includes(this.$route.name)) {
      this.fetchUser()
    }
  },
  methods: {
    onSubmit() {
      this.$emit('onSubmit', this.form)
    },
    generateRandomPassword() {
      this.form.password = Math.random().toString(36).slice(-8)
      this.$bus.emit('generate-random', this.form.password)
      this.$forceUpdate()
    },
    fetchUser() {
      this.$axios.get(`users/${this.$route.params.id}`)
          .then(response => {
            this.form = response.data.data
          })
          .catch(error => {
            console.log(error)
          })
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
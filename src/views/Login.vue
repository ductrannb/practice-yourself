<template>
  <div class="login-form-wrapper">
    <div class="login-form-container">
      <h2 class="page-heading fw-bold text-center">Đăng nhập</h2>
      <Form class="mb-8" as="v-form" :validation-schema="schema" @submit="login">
        <InputValidation
            class="mb-2"
            name="email"
            label="Email"
            type="text"
            variant="underlined"
            color="red"
            v-model="form.email"
            :updater="form.email"
        />
        <InputValidation
            class="mb-4"
            name="password"
            label="Mật khẩu"
            :is-password="true"
            variant="underlined"
            color="red"
            v-model="form.password"
            :updater="form.password"
        />
        <div class="forget-password-link-box">
          <router-link class="forget-password-link" :to="{name: 'forget-password'}">Quên mật khẩu?</router-link>
        </div>
        <div class="btn-login-container">
          <button type="submit" class="custom-btn btn-login float-animation fw-bold">Đăng nhập</button>
        </div>
      </Form>
      <boundary-line text="Or"/>
      <div class="btn-login-container">
        <button class="button-google-login" @click="googleLogin">Đăng nhập bằng Google</button>
      </div>
      <p class="register-link">
        Bạn chưa có tài khoản?
        <router-link :to="{name: 'register'}">Đăng ký</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import * as Yup from 'yup'
import BoundaryLine from "@/components/BoundaryLine.vue"
import constants from "@/Utils/constants.js"
import {mapActions, mapGetters} from "vuex"

export default {
  name: "Login",
  setup() {
    const schema = Yup.object().shape({
      email: Yup.string().required().email().label('email'),
      password: Yup.string().required().min(6).label('mật khẩu'),
    });

    return { schema }
  },
  data() {
    return {
      showPassword: false,
      form: {
        email: null,
        password: null
      }
    }
  },
  components: {BoundaryLine},
  computed: {
    ...mapGetters(['auth'])
  },
  mounted() {
  },
  methods: {
    ...mapActions(['loginVuex']),
    async login() {
      await this.$axios.post('login', this.form)
      await this.handleLoginSuccess()
    }
  }
}
</script>

<style scoped>
.login-form-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
  overflow: hidden;
}
.login-form-container {
  max-width: 500px;
  width: 90%;
  padding: 48px 24px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}
.page-heading {
  margin-bottom: 1.5rem;
}
.btn-login-container {
  width: 80%;
  margin: auto;
}
.btn-login {
  width: 100%;
}
.register-link {
  font-size: .8rem;
  text-align: center;
  margin: .8rem 0;
  cursor: default;
}
.register-link a {
  font-weight: bold;
  color: var(--color-primary);
  text-decoration: underline;
}
.button-google-login {
  width: 100%;
}
.forget-password-link-box {
  width: 100%;
  display: flex;
  justify-content: end;
  margin-bottom: 1rem;
}
.forget-password-link {
  color: var(--color-primary);
  font-size: .9rem;
}
.forget-password-link:hover {
  text-decoration: underline;
}
@media screen and (max-width: 425px) {
  .page-heading {
    margin-bottom: 1rem;
  }
}
@media screen and (max-width: 320px) {
  .btn-login-container {
    width: 100%;
  }
}
</style>
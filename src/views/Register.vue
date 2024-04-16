<template>
  <div class="login-form-wrapper">
    <div class="login-form-container">
      <h2 class="page-heading fw-bold text-center">Đăng ký</h2>
      <Form class="mb-8" as="v-form" :validation-schema="schema" @submit="onSubmit">
        <InputValidation
            class="mb-2"
            name="email"
            label="Email"
            type="text"
            variant="underlined"
            color="red"
        />
        <InputValidation
            class="mb-4"
            name="password"
            label="Mật khẩu"
            :is-password="true"
            variant="underlined"
            color="red"
        />
        <InputValidation
            class="mb-4"
            name="password_confirmation"
            label="Xác nhận mật khẩu"
            :is-password="true"
            variant="underlined"
            color="red"
        />
        <div class="btn-register-container">
          <button type="submit" class="custom-btn btn-register float-animation fw-bold">Đăng ký</button>
        </div>
      </Form>
      <boundary-line text="Or"/>
      <div class="btn-register-container">
        <GoogleLogin class="btn-register" :callback="googleLogin" prompt/>
      </div>
      <p class="register-link">
        Bạn đã có tài khoản?
        <router-link :to="{name: 'login'}">Đăng nhập</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { GoogleLogin, googleOneTap, decodeCredential } from "vue3-google-login"
import * as Yup from 'yup'
import BoundaryLine from "@/components/BoundaryLine.vue";

export default {
  name: "Register",
  setup() {
    const schema = Yup.object().shape({
      email: Yup.string().required().email().label('email'),
      password: Yup.string().required().min(6).label('mật khẩu'),
      password_confirmation: Yup.string()
        .required().min(6)
        .oneOf([Yup.ref('password')], 'Mật khẩu xác nhận không trùng khớp.')
        .label('mật khẩu xác nhận')
    });

    return { schema }
  },
  data() {
    return {
      showPassword: false
    }
  },
  components: {BoundaryLine, GoogleLogin},
  mounted() {
    googleOneTap()
        .then((response) => {
          console.log("Handle the response", response)
        })
        .catch((error) => {
          console.log("Handle the error", error)
        })
  },
  methods: {
    googleLogin(response) {
      const userData = decodeCredential(response.credential)
      // Họ: family_name
      // Tên: given_name
      // Avatar: picture
      // email_verified
      // email
      console.log("Handle the userData", userData)
      console.log(response)
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
.btn-register-container {
  width: 80%;
  margin: auto;
}
.btn-register {
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
.v-text-field--outlined >>> fieldset {
  border-color: rgba(192, 0, 250, 0.986);
}
@media screen and (max-width: 425px) {
  .page-heading {
    margin-bottom: 1rem;
  }
}
@media screen and (max-width: 320px) {
  .btn-register-container {
    width: 100%;
  }
}
</style>
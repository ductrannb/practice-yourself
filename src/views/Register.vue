<template>
  <div class="register-form-wrapper">
    <div class="register-form-container">
      <h2 class="page-heading fw-bold text-center">Đăng ký</h2>
      <Form class="mb-8" as="v-form" :validation-schema="schema" @submit="register">
        <InputValidation
            class="mb-2"
            name="email"
            label="Email"
            type="text"
            variant="underlined"
            color="red"
            v-model="form.email"
        />
        <InputValidation
            class="mb-4"
            name="password"
            label="Mật khẩu"
            :is-password="true"
            variant="underlined"
            color="red"
            v-model="form.password"
        />
        <InputValidation
            class="mb-4"
            name="password_confirmation"
            label="Xác nhận mật khẩu"
            :is-password="true"
            variant="underlined"
            color="red"
            v-model="form.password_confirmation"
        />
        <InputValidation
            class="mb-4"
            name="otp"
            label="Mã OTP"
            variant="underlined"
            color="red"
            v-model="form.otp"
        >
          <template v-slot:append>
            <button class="register-form--btn-send-otp">Gửi mã</button>
          </template>
        </InputValidation>
        <div class="btn-register-container">
          <button type="submit" class="custom-btn btn-register float-animation fw-bold">Đăng ký</button>
        </div>
      </Form>
      <boundary-line text="Or"/>
      <div class="btn-register-container">
        <button class="button-google-login">Đăng nhập bằng Google</button>
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
        .label('mật khẩu xác nhận'),
      otp: Yup.string()
          .required()
          .matches(/^[0-9]+$/, 'Chỉ được nhập ký tự số')
          .min(6)
          .max(6)
          .label('mã OTP')
    });

    return { schema }
  },
  data() {
    return {
      showPassword: false,
      form: {
        email: null,
        password: null,
        password_confirmation: null,
        otp: null
      }
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
    async register() {
      const response = await this.post('register', this.form)
      console.log(response)
    },
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
.register-form-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
  overflow: hidden;
}
.register-form-container {
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
.button-google-login {
  width: 100%;
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
.register-form--btn-send-otp {
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.register-form--btn-send-otp:hover {
  color: var(--color-main);
}
</style>
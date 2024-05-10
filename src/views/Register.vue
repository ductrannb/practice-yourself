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
            :updater="form.email"
            ref="inputEmail"
        />
        <InputValidation
            class="mb-2"
            name="name"
            label="Họ tên"
            type="text"
            variant="underlined"
            color="red"
            v-model="form.name"
            :updater="form.name"
            ref="inputEmail"
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
        <InputValidation
            class="mb-4"
            name="password_confirmation"
            label="Xác nhận mật khẩu"
            :is-password="true"
            variant="underlined"
            color="red"
            v-model="form.password_confirmation"
            :updater="form.password_confirmation"
        />
        <InputValidation
            class="otp-input mb-4"
            name="otp"
            label="Mã OTP"
            variant="underlined"
            color="red"
            v-model="form.otp"
            :updater="form.otp"
        >
          <template v-slot:append>
            <div class="register-form--btn-send-otp-box">
              <div class="register-form--btn-send-otp-overlay" v-if="countdown > 0">
                <span>{{countdown}}</span>
              </div>
              <button type="button" class="register-form--btn-send-otp" @click="sendOtp">Gửi mã</button>
            </div>
          </template>
        </InputValidation>
        <div class="btn-register-container">
          <button type="submit" class="custom-btn btn-register float-animation fw-bold">Đăng ký</button>
        </div>
      </Form>
      <boundary-line text="Or"/>
      <div class="btn-login-container">
        <button class="button-google-login" @click="googleLogin">Đăng nhập bằng Google</button>
      </div>
      <p class="register-link">
        Bạn đã có tài khoản?
        <router-link :to="{name: 'login'}">Đăng nhập</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import * as Yup from 'yup'
import BoundaryLine from "@/components/BoundaryLine.vue";

export default {
  name: "Register",
  setup() {
    const schema = Yup.object().shape({
      email: Yup.string().required().email().label('email'),
      name: Yup.string().required().max(255).label('họ tên'),
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
        name: null,
        password: null,
        password_confirmation: null,
        otp: null
      },
      countdown: 0
    }
  },
  components: {BoundaryLine},
  methods: {
    register() {
      this.$axios.post('register', this.form)
          .then(response => {
            this.$router.push({name: 'login'})
          })
    },
    sendOtp() {
      this.schema.fields.email.validate(this.form.email)
        .then(async res => {
          const response = await this.$axios.post('send-otp', {email: this.form.email})
          this.countdownSendOtp()
        })
        .catch(error => {
          this.$bus.emit('validate-email')
        })
    },
    countdownSendOtp() {
      this.countdown = 60
      const vm = this
      let downloadTimer = setInterval(function() {
        if(vm.countdown <= 0){
          clearInterval(downloadTimer);
        }
        vm.countdown -= 1
      }, 1000)
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
  cursor: pointer;
  padding: .5rem 1rem;
  background-color: var(--color-primary);
  color: #FFFFFF;
}
.register-form--btn-send-otp:hover {
  background-color: var(--color-primary-dark);
}
.register-form--btn-send-otp-box {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.register-form--btn-send-otp-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}
.register-form--btn-send-otp-overlay span {
  color: #FFFFFF;
  font-weight: 600;
}
.register-form--btn-send-otp-overlay span:after {
  content: 's';
}
.btn-login-container {
  width: 80%;
  margin: auto;
}
.btn-login {
  width: 100%;
}
</style>
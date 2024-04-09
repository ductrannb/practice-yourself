<template>
<!--  <GoogleLogin :callback="googleLogin" prompt/>-->
  <Form as="v-form" :validation-schema="schema" @submit="onSubmit">
    <InputValidation
        class="my-input"
        name="email"
        label="Email"
        type="text"
        variant="outlined"
        color="red"
    />
    <InputValidation
        class="my-input"
        name="password"
        label="Mật khẩu"
        :type="showPassword ? 'text' : 'password'"
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="showPassword = !showPassword"
        variant="outlined"
        color="red"
    />

    <v-btn type="submit" class="base-button button-login">Đăng nhập</v-btn>
  </Form>
</template>

<script>
import { GoogleLogin } from "vue3-google-login"
import { googleOneTap } from "vue3-google-login"
import { decodeCredential } from 'vue3-google-login'
import * as Yup from 'yup'

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
      showPassword: false
    }
  },
  components: {GoogleLogin},
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

</style>
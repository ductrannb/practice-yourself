<template>
  <GoogleLogin :callback="googleLogin" prompt/>
</template>

<script>
import { GoogleLogin } from "vue3-google-login"
import { googleOneTap } from "vue3-google-login"
import { decodeCredential } from 'vue3-google-login'

export default {
  name: "Login",
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
      console.log("Handle the userData", userData)
      console.log(response)
    }
  }
}
</script>

<style scoped>

</style>
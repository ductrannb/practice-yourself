<template>
  <GoogleLogin :callback="googleLogin" prompt/>
</template>

<script>
import { GoogleLogin } from "vue3-google-login"
import { googleOneTap } from "vue3-google-login"

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
      console.log(response)
    }
  }
}
</script>

<style scoped>

</style>
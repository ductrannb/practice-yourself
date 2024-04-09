<template>
  <GoogleLogin :callback="googleLogin"/>
</template>

<script>
import {GoogleLogin} from "vue3-google-login";

export default {
  name: "Login",
  components: {GoogleLogin},
  methods: {
    googleLogin(response) {
      console.log(response)
    }
  }
}
</script>

<style scoped>

</style>
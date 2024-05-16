<template>

</template>

<script>
import { usePayOS, PayOSConfig } from "payos-checkout"
export default {
  name: "Payment",
  data() {
    return {
      payOS: {}
    }
  },
  mounted() {
    this.initPayOS()
  },
  methods: {
    initPayOS() {
      const payOSConfig: PayOSConfig = {
        RETURN_URL: '',
        ELEMENT_ID: 'app',
        CHECKOUT_URL: '',
        onSuccess: (event: any) => {
          this.$emit('onSuccess', event)
        },
        onCancel: (event: any) => {
          this.$emit('onCancel', event)
        },
        onExit: (event: any) => {
          this.$emit('onExit', event)
        }
      }
      const payOS = usePayOS(payOSConfig)
      this.payOS = payOS
      payOS.open()
    }
  }
}
</script>

<style scoped>

</style>
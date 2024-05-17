<template>
  <div class="payment-container">
    <div class="payment-content"></div>
  </div>
</template>

<script>
import { usePayOS, PayOSConfig } from "payos-checkout"
import {mapGetters} from "vuex";
export default {
  name: "Payment",
  data() {
    return {
      payOS: {}
    }
  },
  computed: {
    ...mapGetters(['paymentUrl'])
  },
  watch: {
    paymentUrl(newVal) {
      if (newVal) {
        this.initPayOS()
      }
    },
  },
  methods: {
    initPayOS() {
      const payOSConfig = {
        RETURN_URL: this.paymentUrl.return_url,
        ELEMENT_ID: 'app',
        CHECKOUT_URL: this.paymentUrl.checkout_url,
        onSuccess: (event) => {
          console.log('onSuccess')
          this.$emit('onSuccess', event)
        },
        onCancel: (event) => {
          this.$emit('onCancel', event)
        },
        onExit: (event) => {
          console.log('onExit')
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
.payment-container {
  position: relative;
}
</style>
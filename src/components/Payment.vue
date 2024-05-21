<template>
  <div class="payment-container">
    <div class="payment-content"></div>
    <v-dialog v-model="showDialogIFrame" width="1024px">
      <iframe ref="iframePayment" v-if="paymentUrl?.checkout_url" :src="paymentUrl.checkout_url"></iframe>
    </v-dialog>
  </div>
</template>

<script>
import { usePayOS } from "payos-checkout"
import {mapGetters} from "vuex";
export default {
  name: "Payment",
  data() {
    return {
      payOS: {},
      showDialogIFrame: false
    }
  },
  computed: {
    ...mapGetters(['paymentUrl'])
  },
  watch: {
    paymentUrl(newVal) {
      if (newVal) {
        // this.initPayOS()
        this.showDialogIFrame = true
      }
    },
  },
  mounted() {
    window.addEventListener('message', this.handleIframeMessage);
  },
  beforeDestroy() {
    window.removeEventListener('message', this.handleIframeMessage);
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
    },
    handleIframeMessage(event) {
      // Add origin check if necessary
      // if (event.origin !== 'https://trusted-origin.com') return;

      console.log(event)
      if (event.data.type === 'urlChange') {
        console.log('Iframe URL changed to:', event.data.newUrl);
        // Handle the URL change accordingly
      }
    },
  }
}
</script>

<style scoped>
.payment-container {
  position: relative;
}

iframe {
  height: 650px;
  background: #ffffff;
}
</style>
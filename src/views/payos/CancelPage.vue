<script>
export default {
  name: "CancelPage",
  mounted() {
    this.sendData()
  },
  methods: {
    async sendData() {
      console.log(this.$route.query)
      const res = await this.$axios.post('payment/cancel', this.$route.query)
      this.$router.push({name: 'home'})
    }
  }
}
</script>

<template>
  <div>
    <span>Đang xử lý giao dịch</span>
  </div>
</template>

<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  min-width: 100%;
}
</style>
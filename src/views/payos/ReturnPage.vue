<script>
export default {
  name: "ReturnPage",
  created() {
    this.sendData()
  },
  methods: {
    async sendData() {
      const res = await this.$axios.post('payment/return', this.$route.query)
      this.checkAuth(true)
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
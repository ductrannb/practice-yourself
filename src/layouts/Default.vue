<template>
  <Header></Header>
  <main class="main-content">
    <router-view></router-view>
  </main>
  <Footer v-if="!isHideFooter"></Footer>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Default",
  components: {Footer, Header},
  computed: {
    isHideFooter() {
      return this.routesHideFooter.includes(this.$route.name)
    }
  },
  data() {
    return {
      routesHideFooter: ['lesson-detail', 'exam-detail']
    }
  },
}
</script>

<style scoped>
.main-content {
  padding-top: 7.5rem;
}
</style>
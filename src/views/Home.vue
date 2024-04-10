<template>
  <div class="container">
    <div class="slogan-box">
      <p class="slogan-heading">
        Chinh phục kỳ thi THPT Quốc gia cùng hệ thống luyện thi Practice Yourself!
      </p>
    </div>

    <div>Khóa học mới</div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  created() {
    console.log()
  },
  computed: {
    ...mapGetters(['isLoading'])
  },
  mounted() {
  },
  methods: {
    ...mapActions(['startLoading', 'stopLoading'])
  }
}
</script>

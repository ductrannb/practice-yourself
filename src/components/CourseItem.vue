<template>
  <div class="item-box">
    <div class="item-image-box">
      <img :src="item.image" alt="course">
    </div>
    <p class="item-name">{{item.name}}</p>
    <p class="item-name">{{item.short_description}}</p>
    <router-link to="">Đăng ký ngay</router-link>
    <a></a>
  </div>
</template>

<script>
export default {
  name: "CourseItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <router-link :to="{name: 'courses.detail', params: {id: item.id}}" class="course-item-box float-animation">
    <div class="course-item--image-box">
      <img :src="item.image" alt="course">
    </div>
    <div class="course-item--name-box">
      <p class="course-item--name">{{item.name}}</p>
      <TextBackgroundColor/>
    </div>
    <p class="course-item--short-description">{{item.short_description}}</p>
    <router-link class="custom-btn course-item--subscribe-btn" :to="{name: 'courses.detail', params: {id: item.id}}">Đăng ký ngay</router-link>
  </router-link>
</template>

<script>
import TextBackgroundColor from "@/components/TextBackgroundColor.vue"

export default {
  name: "CourseItem",
  components: {TextBackgroundColor},
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.course-item-box {
  width: 270px;
  height: 381px;
  padding: 1rem;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 6px 12px 0 rgba(0,0,0,.078);
  text-align: center;
}
.course-item-box:hover{
  box-shadow: 0 16px 20px 0 rgba(0,0,0,.239);
  transform: translateY(-.8rem);
}
.course-item--image-box {
  height: 132px;
  width: 100%;
}
.course-item--image-box img {
  height: 100%;
  width: 100%;
}
.course-item--name-box {
  position: relative;
  margin-top: 1.4rem;
}
.course-item--name-box span {
  margin-top: 1rem;
}
.course-item--name-box p {
  position: relative;
  z-index: 2;
}
.course-item--name {
  font-size: 1.5rem;
  font-weight: 600;
}
.course-item--short-description {
  font-size: .9rem;
  color: #464646;
  margin-top: 1rem;
  margin-bottom: 2.8rem;
}
.course-item--subscribe-btn {
  font-weight: 600;
}
</style>
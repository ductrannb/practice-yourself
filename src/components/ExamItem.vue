<template>
  <router-link :to="{name: 'exams.overview', params: {id: item.id}}" class="exam-item-box float-animation">
    <p class="exam-item--name">{{item.name}}</p>
    <router-link class="custom-btn exam-item--subscribe-btn" :to="{name: 'exams.overview', params: {id: item.id}}" >Thi thử ngay</router-link>
  </router-link>
</template>

<script>
import TextBackgroundColor from "@/components/TextBackgroundColor.vue";

export default {
  name: "ExamItem",
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
.exam-item-box {
  width: 270px;
  height: 223px;
  padding: 1rem;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 6px 12px 0 rgba(0,0,0,.078);
  text-align: center;
}
.exam-item-box:hover{
  box-shadow: 0 16px 20px 0 rgba(0,0,0,.239);
  transform: translateY(-.8rem);
}
.exam-item--name {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2.8rem;
  height: 4.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.exam-item--subscribe-btn {
  font-weight: 600;
}
</style>
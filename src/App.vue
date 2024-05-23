<template>
  <div class='loader-wrapper' v-if='isLoading'>
    <div class='dot-spinner'>
      <div class='dot-spinner__dot'></div>
      <div class='dot-spinner__dot'></div>
      <div class='dot-spinner__dot'></div>
      <div class='dot-spinner__dot'></div>
      <div class='dot-spinner__dot'></div>
      <div class='dot-spinner__dot'></div>
      <div class='dot-spinner__dot'></div>
      <div class='dot-spinner__dot'></div>
    </div>
  </div>
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import {mapGetters} from 'vuex'
import constants from '@/Utils/constants.js'
import Swal from 'sweetalert2'

export default {
  computed: {
    ...mapGetters(['isLoading', 'auth'])
  },
  mounted() {
    Pusher.logToConsole = true;

    const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
      cluster: 'ap1'
    });

    const vm = this

    pusher.subscribe(constants.PUSHER_CHANNELS.IMPORT_QUESTION)
        .bind(constants.PUSHER_EVENTS.IMPORT_QUESTION_DONE, function(data) {

          const routeName = data.type == constants.IMPORT_QUESTION_TYPE.LESSON
              ? vm.replaceRouteName('courses.lessons.questions')
              : vm.replaceRouteName('exams.detail')
          const routeParams = data.type == constants.IMPORT_QUESTION_TYPE.LESSON
              ? {id: data.parent_id,lessonId: data.id}
              : {id: data.id}

          Swal.fire({
            title: "Thông báo",
            text: "Dữ liệu câu hỏi đã được cập nhật",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#8c8c8c",
            confirmButtonText: "Đi xem"
          }).then((result) => {
            if (result.isConfirmed) {
              vm.$router.push({name: routeName, params: routeParams})
            }
          });
          console.log('alo', data);
        });
  },
}
</script>

<style scoped>
.loader-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background-color: rgba(225, 225, 225, 0.6);
}
.dot-spinner {
  --uib-size: 2.8rem;
  --uib-speed: .9s;
  --uib-color: #183153;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: var(--uib-size);
  width: var(--uib-size);
}
.dot-spinner__dot {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
}
.dot-spinner__dot::before {
  content: '';
  height: 20%;
  width: 20%;
  border-radius: 50%;
  background-color: var(--uib-color);
  transform: scale(0);
  opacity: 0.5;
  animation: pulse0112 calc(var(--uib-speed) * 1.111) ease-in-out infinite;
  box-shadow: 0 0 20px rgba(18, 31, 53, 0.3);
}
.dot-spinner__dot:nth-child(2) {
  transform: rotate(45deg);
}
.dot-spinner__dot:nth-child(2)::before {
  animation-delay: calc(var(--uib-speed) * -0.875);
}
.dot-spinner__dot:nth-child(3) {
  transform: rotate(90deg);
}
.dot-spinner__dot:nth-child(3)::before {
  animation-delay: calc(var(--uib-speed) * -0.75);
}
.dot-spinner__dot:nth-child(4) {
  transform: rotate(135deg);
}
.dot-spinner__dot:nth-child(4)::before {
  animation-delay: calc(var(--uib-speed) * -0.625);
}
.dot-spinner__dot:nth-child(5) {
  transform: rotate(180deg);
}
.dot-spinner__dot:nth-child(5)::before {
  animation-delay: calc(var(--uib-speed) * -0.5);
}
.dot-spinner__dot:nth-child(6) {
  transform: rotate(225deg);
}
.dot-spinner__dot:nth-child(6)::before {
  animation-delay: calc(var(--uib-speed) * -0.375);
}
.dot-spinner__dot:nth-child(7) {
  transform: rotate(270deg);
}
.dot-spinner__dot:nth-child(7)::before {
  animation-delay: calc(var(--uib-speed) * -0.25);
}
.dot-spinner__dot:nth-child(8) {
  transform: rotate(315deg);
}
.dot-spinner__dot:nth-child(8)::before {
  animation-delay: calc(var(--uib-speed) * -0.125);
}
@keyframes pulse0112 {
  0%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
}

</style>

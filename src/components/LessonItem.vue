<template>
  <div class="course-lesson-item--index"><span>{{ index + 1 }}</span></div>
  <div class="course-lesson-item--info">
    <div class="course-lesson-item--meta">
      <p>{{ lesson.name }}</p>
      <span>{{ lesson.count_question }} câu hỏi</span>
    </div>
    <div class="course-lesson-item--completion">
      <span v-if="isCompletedLesson(lesson)">Hoàn thành</span>
      <span v-else>{{ lesson.completion }}/{{ lesson.count_question }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "LessonItem",
  props: {
    lesson: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    isCompletedLesson(lesson) {
      return lesson.count_question > 0 && lesson.completion === lesson.count_question
    }
  }
}
</script>

<style scoped>
.course-lesson-item--index {
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.course-lesson-item--index > span {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-main);
  color: #ffffff;
  border-radius: 50%;
  border: 1px solid var(--color-main);
  font-weight: 800;
}
.course-lesson-item--info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 80px);
  padding: 1rem 2rem 1rem 1rem;
}
.course-lesson-item--meta p {
  font-weight: 600;
}
.course-lesson-item--meta span {
  font-size: .85rem;
  color: #949ba3;
}
</style>
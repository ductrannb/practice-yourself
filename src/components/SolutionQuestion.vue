<template>
  <div class="question-solution-box">
    <div class="question-solution--content-box" v-if="solution">
      <div :class="{'question-solution--content': true, 'question-solution--show': isShowSolution}" v-html="solution"/>
      <span class="question-solution--button-show" @click="isShowSolution = !isShowSolution">{{ isShowSolution ? 'Ẩn' : 'Xem' }} lời giải</span>
    </div>
    <p class="question-solution--none" v-else>
      <span>Lời giải:</span>
      <strong>&nbsp;Không có</strong>
    </p>
  </div>
</template>

<script>
export default {
  name: "SolutionQuestion",
  props: {
    solution: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isShowSolution: false
    }
  },
}
</script>

<style scoped>
.question-solution--content {
  display: none;
}
.question-solution--show {
  display: block;
}
.question-solution--content-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.question-solution--button-show {
  font-size: .8rem;
  cursor: pointer;
  text-decoration: underline;
  margin-left: auto;
}
.question-solution--content {
  flex: 1;
  padding: .5rem;
  margin-top: .5rem;
  background-color: #f9ee68;
  margin-right: 1rem;
  border-radius: 4px;
}
</style>
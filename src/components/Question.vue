<template>
  <div class="question-box">
    <div class="question-heading-box">
      <span class="question-index">{{index + 1}}.</span>
      <div class="question-content" v-html="question.content"/>
      <LevelBadge :level="question.level"/>
    </div>
    <div class="question-choice-list">
      <div
          :class="{
            'question-choice-item': true,
            'question-choice-item--wrong': isChoiceWrong(choice),
            'question-choice-item--correct': isChoiceCorrect(choice),
            'question-choice-item--select': isChoiceSelected(choice)
          }"
          v-for="(choice, index) in question.choices"
          :key="index">
        <span class="question-choice-code">{{getChoiceCode(index)}}.</span>
        <p class="question-choice-item--content" v-html="choice.content"></p>
      </div>
    </div>
  </div>
</template>

<script>
import constants from "@/Utils/constants";
import LevelBadge from "@/components/LevelBadge.vue";
export default {
  name: "Question",
  components: {LevelBadge},
  props: {
    index: {
      type: Number,
      required: true
    },
    question: {
      type: Object,
      required: true
    }
  },
  computed: {
    constants() {
      return constants
    }
  },
  methods: {
    isChoiceSelected(choice) {
      return ['exam-detail', 'exam-review'].includes(this.$route.name) && this.question.choice_selected === choice.id
    },
    isChoiceCorrect(choice) {
      return ['lesson-detail', 'exam-review'].includes(this.$route.name) && this.question.choice_correct.id === choice.id
    },
    isChoiceWrong(choice) {
      return ['lesson-detail'].includes(this.$route.name) && this.question.choice_selected === choice.id && this.question.choice_correct !== choice.id
    },
  }
}
</script>

<style scoped>
</style>
<template>
  <section :id="`question-${index}`">
    <div class="question-box">
      <div class="question-heading-box">
        <span class="question-index">{{index + 1}}.</span>
        <span class="question-incomplete-flag" v-if="!selected && ['exams.review'].includes($route.name)">Chưa làm</span>
        <div class="question-content" v-html="question.content"/>
        <LevelBadge :level="question.level"/>
      </div>
      <div class="question-choice-list">
        <div
            :class="{
            'question-choice-item': true,
            'question-choice-item--selected': question.is_selected,
            'question-choice-item--wrong': isChoiceWrong(choice),
            'question-choice-item--correct': isChoiceCorrect(choice),
            'question-choice-item--select': isChoiceSelected(choice)
          }"
            v-for="(choice, index) in question.choices"
            :key="index"
            @click="selectChoice(choice.id)">
          <span class="question-choice-code">{{getChoiceCode(index)}}.</span>
          <p class="question-choice-item--content" v-html="choice.content"></p>
        </div>
      </div>
      <SolutionQuestion v-if="!['exams.detail'].includes($route.name) && question.is_selected" :solution="question.solution"/>
    </div>
  </section>
</template>

<script>
import constants from "@/Utils/constants";
import LevelBadge from "@/components/LevelBadge.vue";
import SolutionQuestion from "@/components/SolutionQuestion.vue";
export default {
  name: "Question",
  components: {SolutionQuestion, LevelBadge},
  props: {
    index: {
      type: Number,
      required: true
    },
    question: {
      type: Object,
      required: true
    },
    selected: {
      type: Object,
      default: null
    }
  },
  computed: {
    constants() {
      return constants
    }
  },
  methods: {
    isChoiceSelected(choice) {
      return ['exams.detail', 'exams.review'].includes(this.$route.name)
          && this.selected != null
          && this.selected.question_choice_id === choice.id
    },
    isChoiceCorrect(choice) {
      if (this.$route.name === 'exams.review' && !this.selected) {
        return this.question.correct_choice.id === choice.id
      }
      return ['lessons.detail', 'exams.review'].includes(this.$route.name)
          && this.selected != null
          && this.question.correct_choice.id === choice.id
    },
    isChoiceWrong(choice) {
      return ['lessons.detail'].includes(this.$route.name)
          && this.selected != null
          && this.selected.question_choice_id === choice.id
          && !this.selected.is_correct
    },
    selectChoice(choiceId) {
      if (this.question.is_selected) {
        return
      }
      this.$emit('select-choice', {question_choice_id: choiceId, question_id: this.question.id})
    },
  }
}
</script>

<style scoped>
.question-solution--none {
  margin-top: .5rem;
  padding: .5rem;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.question-incomplete-flag {
  font-size: .7rem;
  color: #ff0000;
  margin-right: .5rem;
  padding: .25rem .5rem;
  border: 1px solid;
  border-radius: 4px;
}
</style>
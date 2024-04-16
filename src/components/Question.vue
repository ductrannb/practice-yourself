<template>
  <div class="question-box">
    <div class="question-heading-box">
      <span class="question-index">{{index + 1}}.</span>
      <div class="question-content" v-html="question.content"/>
      <span :class="{
        'question-level': true,
        'question-level--easy': question.level === constants.LESSON_LEVEL.CODE.LEVEL_EASY,
        'question-level--medium': question.level === constants.LESSON_LEVEL.CODE.LEVEL_MEDIUM,
        'question-level--hard': question.level === constants.LESSON_LEVEL.CODE.LEVEL_HARD
      }">{{getLevelText(question.level)}}</span>
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
export default {
  name: "Question",
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
    getLevelText(value) {
      switch (value) {
        case constants.LESSON_LEVEL.CODE.LEVEL_EASY:
          return constants.LESSON_LEVEL.TEXT.LEVEL_EASY
        case constants.LESSON_LEVEL.CODE.LEVEL_MEDIUM:
          return constants.LESSON_LEVEL.TEXT.LEVEL_MEDIUM
        case constants.LESSON_LEVEL.CODE.LEVEL_HARD:
          return constants.LESSON_LEVEL.TEXT.LEVEL_HARD
      }
    },
    getChoiceCode(index) {
      switch (index) {
        case 0:
          return "A"
        case 1:
          return "B"
        case 2:
          return "C"
        case 3:
          return "D"
      }
    }
  }
}
</script>

<style scoped>
.question-box {
  margin-bottom: 1.5rem;
}
.question-heading-box {
  display: flex;
}
.question-index {
  font-weight: 600;
  margin-right: .5rem;
}
.question-level {
  margin-left: auto;
  font-size: .7rem;
  padding: .25rem .5rem;
  border-radius: 100px;
  border: 1px solid;
  width: 82px;
  text-align: center;
  font-weight: 500;
  color: white;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
.question-level--easy {
  background-color: #40B4E5;
  border-color: #40B4E5;
}
.question-level--medium {
  background-color: #8AC53E;
  border-color: #8AC53E;
}
.question-level--hard {
  background-color: #FF9B2F;
  border-color: #FF9B2F;
}
.question-choice-list {
  padding-left: 1.5rem;
  margin-top: .5rem;
}
.question-choice-item {
  display: flex;
  cursor: pointer;
  padding: .5rem .4rem;
}
.question-choice-item:hover {
  display: flex;
  cursor: pointer;
  padding: .5rem .4rem;
  background-color: #ececec;
  border-radius: 4px;
  transition: background-color .2s;
}
.question-choice-code {
  font-weight: 600;
  margin-right: .5rem;
}
.question-choice-item:before {
  content: '';
  width: 24px;
  height: 24px;
  display: inline-block;
  background-image: url("/images/icons/choice-unselect.svg");
  background-size: contain;
  margin-right: .5rem;
  margin-top: .1rem;
}
.question-choice-item--correct:before {
  content: '';
  background-image: url("/images/icons/choice-correct.svg");
}
.question-choice-item--wrong:before {
  content: '';
  background-image: url("/images/icons/choice-wrong.svg");
}
.question-choice-item--select:before {
  content: '';
  background-image: url("/images/icons/choice-select.svg");
}
</style>
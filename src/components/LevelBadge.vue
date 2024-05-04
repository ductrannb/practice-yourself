<template>
    <span :class="{
      'question-level': true,
      'question-level--easy': level === constants.QUESTION_LEVEL.CODE.LEVEL_EASY,
      'question-level--medium': level === constants.QUESTION_LEVEL.CODE.LEVEL_MEDIUM,
      'question-level--hard': level === constants.QUESTION_LEVEL.CODE.LEVEL_HARD
    }">
      {{getLevelText(level)}}
    </span>
</template>

<script>
import constants from "@/Utils/constants.js";

export default {
  name: "LevelBadge",
  props: {
    level: {
      type: Number,
      required: true
    }
  },
  computed: {
    constants() {
      return constants
    }
  }
}
</script>

<style scoped>

</style>
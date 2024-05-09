<template>
  <div class="course-overview">
    <div class="course-overview-item">
      <slot name="overview-item"></slot>
    </div>
    <div class="course-overview-item">
      <div>{{ constants.QUESTION_LEVEL.TEXT.LEVEL_EASY }}</div>
      <div class="course-overview-item--process-box">
        <div>{{percentage_easy}}%</div>
        <v-progress-linear
            class="course-overview-item--process-linear"
            color="#40B4E5"
            :model-value="percentage_easy"
            :height="10"
            bg-color="#E7ECEF"
            bg-opacity="1"
            rounded
        />
      </div>
    </div>
    <div class="course-overview-item">
      <div>{{ constants.QUESTION_LEVEL.TEXT.LEVEL_MEDIUM }}</div>
      <div class="course-overview-item--process-box">
        <div>{{percentage_medium}}%</div>
        <v-progress-linear
            class="course-overview-item--process-linear"
            color="#8AC53E"
            :model-value="percentage_medium"
            bg-color="#E7ECEF"
            bg-opacity="1"
            :height="10"
            rounded
        />
      </div>
    </div>
    <div class="course-overview-item">
      <div>{{ constants.QUESTION_LEVEL.TEXT.LEVEL_HARD }}</div>
      <div class="course-overview-item--process-box">
        <div>{{percentage_hard}}%</div>
        <v-progress-linear
            class="course-overview-item--process-linear"
            color="#FF9B2F"
            :model-value="percentage_hard"
            bg-color="#E7ECEF"
            bg-opacity="1"
            :height="10"
            rounded
        />
      </div>
    </div>
    <div class="course-overview-item">
      <slot name="overview-last-item"></slot>
    </div>
  </div>
</template>

<script>
import constants from "../Utils/constants.js";

export default {
  name: "ListQuestionOverview",
  computed: {
    constants() {
      return constants
    }
  },
  props: {
    percentage_easy: {
      type: Number,
      required: true
    },
    percentage_medium: {
      type: Number,
      required: true
    },
    percentage_hard: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>

.course-overview {
  width: 60%;
  margin: 0.5rem auto 2rem;
  padding: 1rem;
  border: 1px solid var(--color-main);
}
.course-overview-item {
  display: flex;
  padding: .25rem 0 .25rem 50px;
}
.course-overview-item:has(.overview-item--last-item) {
  height: max-content;
  margin: 2rem 0 1rem;
  padding: 0;
}
.course-overview-item > div:first-child {
  width: 170px;
  font-weight: 600;
}
.course-overview-item--process-box {
  display: flex;
  width: calc(100% - 170px);
  align-items: center;
}
.course-overview-item--process-box > div:first-child {
  width: 40px;
  color: #949ba3;
  font-size: .85rem;
}
.course-overview-item--process-linear {
  width: calc(100% - 120px);
  margin-left: -50px;
}
</style>
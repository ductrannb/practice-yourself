<template>
  <Form class="question-form" as="v-form" :validation-schema="schema" @submit="onSubmit">
    <span class="question-form--text-note">Hãy nhập nội dung câu hỏi và các đáp án. Sau đó tích vào một đáp án để chọn nó là đáp án đúng</span>
    <v-row class="learning-module-box">
      <v-col cols="2">
        <v-select
            variant="outlined"
            label="Lớp"
            :items="classes"
            item-title="name"
            item-value="id"
            density="compact"
            v-model="learningModule._class"
            @update:model-value="() => {
              learningModule._chapter = null
              learningModule._unit = null
              form.learning_module_id = null
            }"/>
      </v-col>
      <v-col cols="5">
        <v-select
            variant="outlined"
            label="Chương"
            :items="chapters"
            item-title="name"
            item-value="id"
            density="compact"
            v-model="learningModule._chapter"
            @update:model-value="() => {
              learningModule._unit = null
              form.learning_module_id = null
            }"/>
      </v-col>
      <v-col cols="5">
        <v-select
            variant="outlined"
            label="Bài"
            :items="units"
            item-title="name"
            item-value="id"
            density="compact"
            v-model="learningModule._unit"
            @update:model-value="() => {
              form.learning_module_id = learningModule._unit
            }"/>
      </v-col>
    </v-row>
    <v-radio-group hide-details class="custom-radio-group mt-2" v-model="form.level" inline>
      <template v-slot:label>
        <label class="required">Mức độ</label>
      </template>
      <v-radio :label="constants.QUESTION_LEVEL.TEXT.LEVEL_EASY" color="#40B4E5" :value="constants.QUESTION_LEVEL.CODE.LEVEL_EASY"></v-radio>
      <v-radio :label="constants.QUESTION_LEVEL.TEXT.LEVEL_MEDIUM" color="#8AC53E" :value="constants.QUESTION_LEVEL.CODE.LEVEL_MEDIUM"></v-radio>
      <v-radio :label="constants.QUESTION_LEVEL.TEXT.LEVEL_HARD" color="#FF9B2F" :value="constants.QUESTION_LEVEL.CODE.LEVEL_HARD"></v-radio>
    </v-radio-group>
    <div class="question-form-group">
      <label class="required">Nội dung câu hỏi</label>
      <CustomCkeditor
        class="question-form--question-content"
        v-model="form.content"
        placeholder="Nhập nội dung câu hỏi"
        :updater="form.content"
      />
    </div>
    <div class="question-form-group">
      <div class="question-choice-box">
        <label class="question-choice-label required">Đáp án A</label>
        <v-checkbox-btn size="20" v-model="form.choices[0].is_correct" @update:model-value="updateCorrectChoice(0)"></v-checkbox-btn>
      </div>
      <CustomCkeditor v-model="form.choices[0].content" :updater="form.choices[0].content" placeholder="Nhập nội dung đáp án A"/>
    </div>
    <div class="question-form-group">
      <div class="question-choice-box">
        <label class="question-choice-label required">Đáp án B</label>
        <v-checkbox-btn size="20" v-model="form.choices[1].is_correct" @update:model-value="updateCorrectChoice(1)"></v-checkbox-btn>
      </div>
      <CustomCkeditor v-model="form.choices[1].content" :updater="form.choices[1].content" placeholder="Nhập nội dung đáp án B"/>
    </div>
    <div class="question-form-group">
      <div class="question-choice-box">
        <label class="question-choice-label required">Đáp án C</label>
        <v-checkbox-btn size="20" v-model="form.choices[2].is_correct" @update:model-value="updateCorrectChoice(2)"></v-checkbox-btn>
      </div>
      <CustomCkeditor v-model="form.choices[2].content" :updater="form.choices[2].content" placeholder="Nhập nội dung đáp án C"/>
    </div>
    <div class="question-form-group">
      <div class="question-choice-box">
        <label class="question-choice-label required">Đáp án D</label>
        <v-checkbox-btn size="20" v-model="form.choices[3].is_correct" @update:model-value="updateCorrectChoice(3)"></v-checkbox-btn>
      </div>
      <CustomCkeditor v-model="form.choices[3].content" :updater="form.choices[3].content" placeholder="Nhập nội dung đáp án D"/>
    </div>
    <div class="question-form-group">
      <label>Lời giải</label>
      <CustomCkeditor
          class="question-form--question-content"
          v-model="form.solution"
          placeholder="Nhập nội dung lời giải"
          :updater="form.solution"
      />
    </div>
    <div class="admin-form-footer">
      <router-link
          :to="{name: replaceRouteName('questions-bank')}"
          class="admin-form-footer-btn admin-form-footer-btn--cancel"
      >
        Hủy
      </router-link>
      <button type="submit" class="admin-form-footer-btn admin-form-footer-btn--submit">Lưu</button>
    </div>
  </Form>
</template>

<script>
import * as Yup from "yup";
import constants from "@/Utils/constants.js";

export default {
  name: "QuestionForm",
  computed: {
    constants() {
      return constants
    },
    classes() {
      return this.learningModule.classes.filter(item => item.type === constants.QUESTION_TYPE.CLASS)
    },
    chapters() {
      return this.learningModule.chapters.filter(item => item.type === constants.QUESTION_TYPE.CHAPTER && item.parent_id === this.learningModule._class)
    },
    units() {
      return this.learningModule.units.filter(item => item.type === constants.QUESTION_TYPE.UNIT && item.parent_id === this.learningModule._chapter)
    },
    isUpdate() {
      return this.$route.params.id
    }
  },
  setup() {
    const schema = Yup.object().shape({
    });

    return { schema }
  },
  data() {
    return {
      learningModule: {
        _class: null,
        _chapter: null,
        _unit: null,
        classes: [],
        chapters: [],
        units: []
      },
      form: {
        content: '',
        level: constants.QUESTION_LEVEL.CODE.LEVEL_EASY,
        choices: [
          { content: null, is_correct: false },
          { content: null, is_correct: false },
          { content: null, is_correct: false },
          { content: null, is_correct: false },
        ],
        solution: '',
        learning_module_id: null
      }
    }
  },
  created() {
    this.fetchLearningModule()
    if (this.isUpdate) {
      this.fetchQuestion()
    }
  },
  methods: {
    onSubmit() {
      if (!this.form.learning_module_id) {
        this.noticeError('Vui lòng chọn lớp, chương và bài')
        return
      }
      this.$emit('onSubmit', this.form)
    },
    updateCorrectChoice(index) {
      this.form.choices.forEach((choice, i) => { choice.is_correct = i === index })
    },
    async fetchQuestion() {
      const res = await this.$axios.get(`questions/${this.$route.params.id}`)
      this.form = res.data.data
      this.learningModule._class = res.data.data.class_id
      this.learningModule._chapter = res.data.data.chapter_id
      this.learningModule._unit = res.data.data.unit_id
    },
    async fetchLearningModule() {
      const res = await this.$axios.get('learning-modules')
      this.learningModule.classes = res.data.data.classes
      this.learningModule.chapters = res.data.data.chapters
      this.learningModule.units = res.data.data.units
    }
  }
}
</script>

<style scoped>
.form-input-password-box button {
  margin-left: 1rem;
  padding: .5rem 1rem;
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  color: var(--color-primary);
}
.form-input-password-box button:hover {
  background-color: var(--color-primary);
  color: #FFFFFF;
}
.question-form--text-note {
  color: red;
  font-size: .9rem;
  font-style: italic;
}
.question-form-group {
  margin-top: .75rem;
}
.question-form--question-content {
  margin-top: .5rem;
}
.question-choice-box {
  display: flex;
  align-items: center;
}
.admin-form-footer {
  margin-top: 2rem;
}
.learning-module-box {
  margin-top: 1rem;
}
</style>
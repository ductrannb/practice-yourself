<script>
import {mapActions, mapGetters} from "vuex";
import constants from "@/Utils/constants.js";
import LevelBadge from "@/components/LevelBadge.vue";
import Author from "@/components/Author.vue";

export default {
  name: "ListQuestionFromBank",
  components: {Author, LevelBadge},
  props: {
    assignable_id: {
      type: Number,
      required: true
    },
    assignable_type: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      selected: [],
      listQuestion: [],
      learningModule: {
        _class: null,
        _chapter: null,
        _unit: null
      },
      form: {
        learning_module_id: null,
        learning_module_type: null,
        paginate: true,
        assignable_id: null,
        assignable_type: null,
      },
    }
  },
  computed: {
    constants() {
      return constants
    },
    ...mapGetters(['learningModuleState']),
    classes() {
      return this.learningModuleState.classes.filter(item => item.type === constants.QUESTION_TYPE.CLASS)
    },
    chapters() {
      return this.learningModuleState.chapters.filter(item => item.type === constants.QUESTION_TYPE.CHAPTER && item.parent_id === this.learningModule._class)
    },
    units() {
      return this.learningModuleState.units.filter(item => item.type === constants.QUESTION_TYPE.UNIT && item.parent_id === this.learningModule._chapter)
    },
    levels() {
      return [
        {id: constants.QUESTION_LEVEL.CODE.LEVEL_EASY, name: constants.QUESTION_LEVEL.TEXT.LEVEL_EASY},
        {id: constants.QUESTION_LEVEL.CODE.LEVEL_MEDIUM, name: constants.QUESTION_LEVEL.TEXT.LEVEL_MEDIUM},
        {id: constants.QUESTION_LEVEL.CODE.LEVEL_HARD, name: constants.QUESTION_LEVEL.TEXT.LEVEL_HARD},
      ]
    },
    headers() {
      return [
        {
          title: 'Nội dung',
          align: 'start',
          sortable: false,
          key: 'content'
        }, {
          title: 'Mức độ',
          align: 'start',
          sortable: false,
          key: 'level'
        }, {
          title: 'Lớp',
          align: 'start',
          sortable: false,
          key: 'class'
        }, {
          title: 'Chương',
          align: 'start',
          sortable: false,
          key: 'chapter'
        }, {
          title: 'Bài',
          align: 'start',
          sortable: false,
          key: 'unit'
        }, {
          title: 'Người tạo',
          align: 'start',
          sortable: false,
          key: 'author'
        }
      ]
    }
  },
  created() {
    this.fetchQuestions()
  },
  watch: {
    selected() {
      this.setLessonQuestionSelected(this.selected)
    }
  },
  methods: {
    ...mapActions(['setLessonQuestionSelected']),
    async fetchQuestions() {
      this.setAssignable()
      const response = await this.$axios.get('/questions', {params: this.form})
      this.listQuestion = response.data.data
      this.selected = response.data.extra?.selected || []
    },
    setAssignable() {
      this.form.assignable_id = this.assignable_id
      this.form.assignable_type = this.assignable_type
    }
  }
}
</script>

<template>
  <div class="list-question-box">
    <v-row>
      <v-col cols="12">
        <v-form>
          <v-row>
            <v-col cols="2">
              <v-select
                  v-model="learningModule._class"
                  :items="classes"
                  label="Lớp"
                  density="compact"
                  variant="outlined"
                  hide-details
                  item-title="name"
                  item-value="id"
                  clearable
                  @update:model-value="() => {
                    learningModule._chapter = null
                    learningModule._unit = null
                    form.learning_module_id = learningModule._class
                    form.learning_module_type = constants.QUESTION_TYPE.CLASS
                    fetchQuestions()
                  }"/>
            </v-col>
            <v-col cols="3">
              <v-select
                  v-model="learningModule._chapter"
                  :items="chapters"
                  label="Chương"
                  density="compact"
                  variant="outlined"
                  hide-details
                  item-title="name"
                  item-value="id"
                  clearable
                  @update:model-value="() => {
                    learningModule._unit = null
                    form.learning_module_id = learningModule._chapter
                    form.learning_module_type = constants.QUESTION_TYPE.CHAPTER
                    fetchQuestions()
                  }"/>
            </v-col>
            <v-col cols="3">
              <v-select
                  v-model="learningModule._unit"
                  :items="units"
                  label="Bài"
                  density="compact"
                  variant="outlined"
                  hide-details
                  item-title="name"
                  item-value="id"
                  clearable
                  @update:model-value="() => {
                    form.learning_module_id = learningModule._unit
                    form.learning_module_type = constants.QUESTION_TYPE.UNIT
                    fetchQuestions()
                  }"/>
            </v-col>
            <v-col cols="2">
              <v-select
                  :items="levels"
                  label="Mức độ"
                  density="compact"
                  variant="outlined"
                  hide-details
                  item-title="name"
                  item-value="id"
                  clearable/>
            </v-col>
            <v-col cols="2">
              <v-select
                  :items="[]"
                  label="Người tạo"
                  density="compact"
                  variant="outlined"
                  hide-details
                  item-title="name"
                  item-value="id"
                  clearable/>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col cols="12">
        <v-data-table-virtual
            v-model="selected"
            :items="listQuestion"
            :headers="headers"
            show-select
        >
          <template v-slot:[`item.content`]="{ item }">
            <div class="ckeditor-content--remove-heading" v-html="item.content"></div>
          </template>
          <template v-slot:[`item.level`]="{ item }">
            <LevelBadge :level="item.level"/>
          </template>
          <template v-slot:[`item.author`]="{ item }">
            <Author :author="item.author"/>
          </template>
        </v-data-table-virtual>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.list-question-box {
  padding: 14px 24px;
}
</style>
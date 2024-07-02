<template>
  <div class="admin-user-wrapper">
    <v-dialog max-width="800" v-model="dialogDetail.isShow" theme="light">
      <template v-slot:default="{ isActive }">
        <v-card title="Chi tiết câu hỏi">
          <v-card-item>
            <Question :question="dialogDetail.question" :index="0"/>
          </v-card-item>
          <v-card-actions class="flex justify-end">
            <v-btn @click="dialogDetail.isShow = false">Đóng</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <div class="admin-container">
      <breadcrumb class="admin-breadcrumb-wrapper" :items="breadcrumbs"/>
      <div class="admin-user-container">
        <div class="admin-user-heading-box">
          <div class="search-input-box">
            <svg class="search-input--icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
            <input placeholder="Tìm kiếm ..." type="search" @input="search" v-model="form.keyword" class="search-input--input">
          </div>
          <div class="d-flex gap-2">
            <router-link :to="{name: replaceRouteName('questions-bank.create')}" class="custom-btn">Thêm mới</router-link>
            <v-dialog max-width="1200">
              <template v-slot:activator="{ props: activatorProps }">
                <span class="custom-btn import-btn" v-bind="activatorProps" >Nhập từ file</span>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="Chọn file PDF">
                  <v-card-item>
                    <v-row class="mt-2">
                      <v-col cols="2">
                        <v-select
                            variant="outlined"
                            label="Lớp"
                            :items="classesPopup"
                            item-title="name"
                            item-value="id"
                            hide-details
                            density="compact"
                            clearable
                            v-model="learningModulePopup._class"
                            @update:model-value="() => {
                            learningModulePopup._chapter = null
                            learningModulePopup._unit = null
                          }"/>
                      </v-col>
                      <v-col cols="5">
                        <v-select
                            variant="outlined"
                            label="Chương"
                            :items="chaptersPopup"
                            item-title="name"
                            item-value="id"
                            hide-details
                            density="compact"
                            clearable
                            v-model="learningModulePopup._chapter"
                            @update:model-value="() => {
                              learningModulePopup._unit = null
                            }"/>
                      </v-col>
                      <v-col cols="5">
                        <v-select
                            variant="outlined"
                            label="Bài"
                            :items="unitsPopup"
                            item-title="name"
                            item-value="id"
                            hide-details
                            density="compact"
                            clearable
                            v-model="learningModulePopup._unit"
                            @update:model-value="() => {
                              formImport.learning_module_id = learningModulePopup._unit
                            }"/>
                      </v-col>
                      <v-col cols="12">
                        <v-file-input
                            accept="application/pdf"
                            label="Chọn file"
                            dense
                            variant="underlined"
                            @change="(event) => {
                              formImport.file = event.target.files[0] ?? null
                            }"
                        ></v-file-input>
                      </v-col>
                    </v-row>
                  </v-card-item>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        text="Lưu"
                        @click="async () => {
                          const status = await importFile()
                          if (status) {
                            isActive.value = false
                            resetFormPopup()
                          }
                        }"
                    ></v-btn>
                    <v-btn
                        text="Đóng"
                        @click="() => {
                          isActive.value = false
                          resetFormPopup()
                        }"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </div>
        </div>
        <v-row class="mt-2">
          <v-col cols="2">
            <v-select
                variant="outlined"
                label="Lớp"
                :items="classes"
                item-title="name"
                item-value="id"
                hide-details
                density="compact"
                clearable
                v-model="learningModule._class"
                @update:model-value="() => {
                  learningModule._chapter = null
                  learningModule._unit = null
                  form.learning_module_id = learningModule._class
                  form.learning_module_type = constants.QUESTION_TYPE.CLASS
                  fetchList()
                }"/>
          </v-col>
          <v-col cols="5">
            <v-select
                variant="outlined"
                label="Chương"
                :items="chapters"
                item-title="name"
                item-value="id"
                hide-details
                density="compact"
                clearable
                v-model="learningModule._chapter"
                @update:model-value="() => {
                  learningModule._unit = null
                  form.learning_module_id = learningModule._chapter
                  form.learning_module_type = constants.QUESTION_TYPE.CHAPTER
                  fetchList()
                }"/>
          </v-col>
          <v-col cols="5">
            <v-select
                variant="outlined"
                label="Bài"
                :items="units"
                item-title="name"
                item-value="id"
                hide-details
                density="compact"
                clearable
                v-model="learningModule._unit"
                @update:model-value="() => {
                  form.learning_module_id = learningModule._unit
                  form.learning_module_type = constants.QUESTION_TYPE.UNIT
                  fetchList()
                }"/>
          </v-col>
        </v-row>
        <p class="admin-count-data-label">Tổng: <span>{{ paginate.total }}</span></p>
        <v-data-table
            :headers="headers"
            :items="questions"
        >
          <template v-slot:[`item.index`]="{ item }">
            <span>{{ questions.indexOf(item) + 1 }}</span>
          </template>
          <template v-slot:[`item.content`]="{ item }">
            <div class="ckeditor-content--remove-heading" v-html="item.content"></div>
          </template>
          <template v-slot:[`item.correct_choice`]="{ item }">
            <div class="ckeditor-content--remove-heading" v-html="item.correct_choice?.content"></div>
          </template>
          <template v-slot:[`item.level`]="{ item }">
            <LevelBadge :level="item.level"/>
          </template>
          <template v-slot:[`item.author`]="{ item }">
            <Author :author="item.author"/>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <div class="admin-user-table--column-action-box">
              <v-tooltip text="Xem chi tiết">
                <template v-slot:activator="{ props }">
                  <v-icon v-bind="props" icon="mdi-eye" @click="async () => {
                    const res = await this.$axios.get('questions/' + item.id)
                    dialogDetail.question = res.data.data
                    dialogDetail.isShow = true
                  }"/>
                </template>
              </v-tooltip>
              <v-tooltip text="Sửa">
                <template v-slot:activator="{ props }">
                  <v-icon v-bind="props" icon="mdi-pencil" @click="$router.push({name: replaceRouteName('questions-bank.update'), params: {id: item.id}})"/>
                </template>
              </v-tooltip>
              <v-tooltip text="Xóa" v-if="isAdmin">
                <template v-slot:activator="{ props }">
                  <v-icon v-bind="props" icon="mdi-delete" color="red" @click="destroy('questions', item.id, fetchList)"/>
                </template>
              </v-tooltip>
            </div>
          </template>
          <template v-slot:bottom>
            <v-pagination
                v-model="form.page"
                :length="paginate.lastPage"
                color="var(--color-primary)"
                total-visible="5"
                @update:model-value="fetchList"
            ></v-pagination>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import {debounce} from "lodash";
import {mapGetters} from "vuex";
import constants from "@/Utils/constants.js";
import Author from "@/components/Author.vue";
import Question from "@/components/Question.vue";
import LevelBadge from "@/components/LevelBadge.vue";
import axios from "axios";

export default {
  name: "Courses",
  components: {LevelBadge, Question, Author, Breadcrumb},
  computed: {
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
    classesPopup() {
      return this.learningModuleState.classes.filter(item => item.type === constants.QUESTION_TYPE.CLASS)
    },
    chaptersPopup() {
      return this.learningModuleState.chapters.filter(item => item.type === constants.QUESTION_TYPE.CHAPTER && item.parent_id === this.learningModulePopup._class)
    },
    unitsPopup() {
      return this.learningModuleState.units.filter(item => item.type === constants.QUESTION_TYPE.UNIT && item.parent_id === this.learningModulePopup._chapter)
    },
    constants() {
      return constants
    },
    headers() {
      return [
        {
          title: 'STT',
          align: 'center',
          sortable: false,
          key: 'index',
          width: '50px'
        }, {
          title: 'Nội dung',
          align: 'start',
          sortable: false,
          key: 'content'
        }, {
          title: 'Đáp án đúng',
          align: 'start',
          sortable: false,
          key: 'correct_choice'
        }, {
          title: 'Mức độ',
          align: 'start',
          sortable: false,
          key: 'level',
          width: '120px'
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
        }, {
          title: 'Số lượt dùng',
          align: 'center',
          sortable: false,
          key: 'usage_count'
        }, {
          title: 'Hành động',
          align: 'center',
          sortable: false,
          key: 'actions'
        }
      ]
    },
    breadcrumbs() {
      return [
        {
          id: 1,
          title: 'Dashboard',
          route: {name: this.replaceRouteName('dashboard')}
        }, {
          id: 2,
          title: 'Ngân hàng câu hỏi',
        },
      ]
    }
  },
  data() {
    return {
      questions: [],
      form: {
        keyword: null,
        page: 1,
        learning_module_id: null,
        learning_module_type: null
      },
      formImport: {
        learning_module_id: null,
        file: null,
        pdf_id: null
      },
      paginate: {
        last_page: 1,
        total: 0,
      },
      learningModule: {
        _class: null,
        _chapter: null,
        _unit: null
      },
      learningModulePopup: {
        _class: null,
        _chapter: null,
        _unit: null
      },
      dialogDetail: {
        isShow: false,
        question: {}
      }
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    async importFile() {
      if (!this.formImport.learning_module_id) {
        this.noticeError('Vui lòng chọn bài học')
        return false
      }
      if (!this.formImport.file) {
        this.noticeError('Vui lòng chọn file')
        return false
      }

      const formData = new FormData()
      formData.append('file', this.formImport.file)
      formData.append('options_json', '{"conversion_formats": {"tex.zip": true}, "math_inline_delimiters": ["$", "$"], "rm_spaces": true}')
      const resp = await axios.post('https://api.mathpix.com/v3/pdf', formData, {
            headers: {
              'app_id': import.meta.env.VITE_MATHPIX_APP_ID,
              'app_key': import.meta.env.VITE_MATHPIX_APP_KEY,
              'Content-Type': 'multipart/form-data'
            }
          }
      )
      this.formImport.pdf_id = resp.data.pdf_id
      // this.formImport.pdf_id = '2024_07_05_262fe4f8e944cc3bc2eeg'
      // this.formImport.learning_module_id = 7

      // call api
      const res = await this.$axios.post('questions/import', {
        learning_module_id: this.formImport.learning_module_id,
        pdf_id: this.formImport.pdf_id
      })
      return true
    },
    resetFormPopup() {
      this.learningModulePopup = {
        _class: null,
        _chapter: null,
        _unit: null
      }
      this.formImport = {
        learning_module_id: null,
        file: null
      }
    },
    async fetchList() {
      const res = await this.$axios.get('questions', {params: this.form})
      this.questions = res.data.data ?? []
      this.paginate = {
        lastPage: res.data.last_page ?? 1,
        total: res.data.total ?? 0
      }
      this.form.page = res.data.current_page ?? 1
    },
    search: debounce(
        function() {
          this.form.page = 1
          this.fetchList()
        },
        1000
    ),
    getLabelTeachers(teachers) {
      if (!Array.isArray(teachers) || teachers.length === 0) {
        return 'Chưa có'
      }
      let teachersName = teachers.map(teacher => teacher.name)
      if (teachersName.length <= 2) {
        return teachersName.join(', ')
      }
      return `${teachersName.slice(0, 2).join(', ')}, (+${teachersName.length - 2})`
    }
  }
}
</script>

<style scoped>
.admin-user-heading-box {
  display: flex;
  justify-content: space-between;
}
.custom-btn {
  font-size: .9rem;
  padding: .6rem 1rem;
}
.search-input--input {
  width: 300px;
}
.admin-count-data-label {
  margin-top: 1rem;
  padding-left: 1rem;
  font-weight: 600;
}
.admin-user-table--column-action-box {
  display: flex;
  column-gap: 8px;
  justify-content: center;
}
.import-btn {
  color: #0a53be;
  border-color: #0a53be;
  cursor: pointer;
}
.import-btn:hover {
  color: white;
  border-color: #0a53be;
  background-color: #0a53be;
}
</style>
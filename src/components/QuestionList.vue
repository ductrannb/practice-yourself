<template>
  <div class="admin-user-container">
    <div class="admin-user-heading-box">
      <div class="search-input-box">
        <svg class="search-input--icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
        <input placeholder="Tìm kiếm ..." v-model="form.keyword" @input="search" type="search"  class="search-input--input">
      </div>
      <router-link :to="{name: replaceRouteName('courses.lessons.questions.create')}" class="custom-btn">Thêm mới</router-link>
    </div>
    <p class="admin-count-data-label">Tổng: <span>{{ paginate.total }}</span></p>
    <v-data-table
        :headers="headers"
        :items="questions"
    >
      <template v-slot:[`item.index`]="{ item }">
        <span>{{ questions.indexOf(item) + 1 }}</span>
      </template>
      <template v-slot:[`item.content`]="{ item }">
        <div class="ck-content--block" v-html="item.content">
        </div>
      </template>
      <template v-slot:[`item.correct_choice`]="{ item }">
        <div class="ck-content--block" v-html="item.correct_choice?.content">
        </div>
      </template>
      <template v-slot:[`item.level`]="{ item }">
        <LevelBadge :level="item.level"/>
      </template>
      <template v-slot:[`item.author`]="{ item }">
        <Author :author="item.author"/>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <div class="admin-user-table--column-action-box">
          <v-icon icon="mdi-eye" @click="$router.push({name: replaceRouteName('courses.lessons.questions.detail'), params: {questionId: item.id}})"/>
          <v-icon icon="mdi-pencil" @click="$router.push({name: replaceRouteName('courses.lessons.questions.update'), params: {questionId: item.id}})"/>
          <v-icon icon="mdi-delete" color="red" @click="destroy('questions', item.id, fetchQuestions)"/>
        </div>
      </template>
      <template v-slot:bottom>
        <v-pagination
            v-model="form.page"
            :length="paginate.last_page"
            color="var(--color-primary)"
            @update:model-value="fetchQuestions"
        ></v-pagination>
      </template>
    </v-data-table>
  </div>
</template>

<script>

import Author from "@/components/Author.vue";
import LevelBadge from "@/components/LevelBadge.vue";
import {debounce} from "lodash";
import constants from "@/Utils/constants.js";

export default {
  name: "QuestionList",
  components: {LevelBadge, Author},
  props: ['questions', 'paginate'],
  computed: {
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
          align: 'center',
          sortable: false,
          key: 'level'
        }, {
          title: 'Người tạo',
          align: 'start',
          sortable: false,
          key: 'author'
        }, {
          title: 'Hành động',
          align: 'center',
          sortable: false,
          key: 'actions'
        }
      ]
    }
  },
  data() {
    return {
      form: {
        assignable_id: this.$route.params.lessonId,
        assignable_type: constants.QUESTION_TYPE.LESSON,
        keyword: null,
        page: 1,
      },
    }
  },
  methods: {
    search: debounce(
        function() {
          this.form.page = 1
          this.$emit('fetchList', this.form)
        },
        1000
    ),
    fetchQuestions() {
      this.$emit('fetchList', this.form)
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
</style>
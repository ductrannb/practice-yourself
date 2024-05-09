<template>
  <div class="admin-user-container">
    <div class="admin-user-heading-box">
      <div class="search-input-box">
        <svg class="search-input--icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
        <input placeholder="Tìm kiếm ..." type="search" v-model="form.keyword" @input="search" class="search-input--input">
      </div>
      <router-link :to="{name: replaceRouteName('courses.lessons.create')}" class="custom-btn">Thêm mới</router-link>
    </div>
    <p class="admin-count-data-label">Tổng: <span>{{ paginate.total }}</span></p>
    <v-data-table
        :headers="headers"
        :items="lessons"
    >
      <template v-slot:[`item.index`]="{ item }">
        <span>{{ lessons.indexOf(item) + 1 }}</span>
      </template>
      <template v-slot:[`item.author`]="{ item }">
        <Author :author="item.author"/>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <div class="admin-user-table--column-action-box">
          <v-tooltip text="Danh sách câu hỏi">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" icon="mdi-eye" @click="$router.push({name: replaceRouteName('courses.lessons.questions'), params: {lessonId: item.id}})"/>
            </template>
          </v-tooltip>
          <v-tooltip text="Sửa" v-if="authorIsMe(item.author.id)">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" icon="mdi-pencil" @click="$router.push({name: replaceRouteName('courses.lessons.update'), params: {lessonId: item.id}})"/>
            </template>
          </v-tooltip>
          <v-tooltip text="Xóa" v-if="authorIsMe(item.author.id)">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" icon="mdi-delete" color="red" @click="destroy('lessons', item.id, fetchList)"/>
            </template>
          </v-tooltip>
        </div>
      </template>
      <template v-slot:bottom>
        <v-pagination
            v-model="form.page"
            :length="paginate.last_page"
            color="var(--color-primary)"
            @update:model-value="fetchList"
        ></v-pagination>
      </template>
    </v-data-table>
  </div>
</template>

<script>

import {debounce} from "lodash";
import Author from "@/components/Author.vue";

export default {
  name: "LessonList",
  components: {Author},
  props: {
    lessons: {
      type: Array,
      required: true
    },
    paginate: {
      type: Object,
      required: true,
    }
  },
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
          title: 'Tên',
          align: 'start',
          sortable: false,
          key: 'name'
        }, {
          title: 'Người tạo',
          align: 'start',
          sortable: false,
          key: 'author'
        }, {
          title: 'Số câu hỏi',
          align: 'center',
          sortable: false,
          key: 'count_question'
        }, {
          title: 'Hành động',
          align: 'start',
          sortable: false,
          key: 'actions'
        }
      ]
    }
  },
  data() {
    return {
      form: {
        keyword: null,
        page: 1
      },
    }
  },
  methods: {
    fetchList() {
      this.$emit('fetchList', this.form)
    },
    search: debounce(
        function() {
          this.form.page = 1
          this.fetchList()
        },
        1000
    ),
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
  justify-content: start;
}
</style>
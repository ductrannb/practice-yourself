<template>
  <div class="admin-user-wrapper">
    <div class="admin-container">
      <breadcrumb class="admin-breadcrumb-wrapper" :items="breadcrumbs"/>
      <div class="admin-user-container">
        <div class="admin-user-heading-box">
          <div class="search-input-box">
            <svg class="search-input--icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
            <input placeholder="Tìm kiếm ..." type="search" v-model="form.keyword" @input="search" class="search-input--input">
          </div>
          <router-link :to="{name: replaceRouteName('exams.create')}" class="custom-btn">Thêm mới</router-link>
        </div>
        <p class="admin-count-data-label">Tổng: <span>{{ paginate.total }}</span></p>
        <v-data-table
            :headers="headers"
            :items="exams"
        >
          <template v-slot:[`item.index`]="{ item }">
            <span>{{ exams.indexOf(item) + 1 }}</span>
          </template>
          <template v-slot:[`item.author`]="{ item }">
            <Author :author="item.author"/>
          </template>
          <template v-slot:[`item.created_at`]="{ item }">
            <span>{{ $filter.formatDatetime(item.created_at) }}</span>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <div class="admin-user-table--column-action-box">
              <v-tooltip text="Danh sách câu hỏi">
                <template v-slot:activator="{ props }">
                  <v-icon v-bind="props" icon="mdi-eye" @click="$router.push({name: replaceRouteName('exams.detail'), params: {id: item.id}})"/>
                </template>
              </v-tooltip>
              <v-tooltip text="Sửa">
                <template v-slot:activator="{ props }">
                  <v-icon v-bind="props" icon="mdi-pencil" @click="$router.push({name: replaceRouteName('exams.update'), params: {id: item.id}})"/>
                </template>
              </v-tooltip>
              <v-tooltip text="Xóa">
                <template v-slot:activator="{ props }">
                  <v-icon v-bind="props" icon="mdi-delete" color="red" @click="destroy('exams', item.id, fetchList)"/>
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
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue"
import Author from "@/components/Author.vue"
import {debounce} from "lodash";

export default {
  name: "Exams",
  components: {Author, Breadcrumb},
  computed: {
    breadcrumbs() {
      return [
        {
          title: 'Dashboard',
          route: {name: this.replaceRouteName('dashboard')}
        }, {
          title: 'Đề thi thử',
        }
      ]
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
          title: 'Tiêu đề',
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
          title: 'Ngày tạo',
          align: 'center',
          sortable: false,
          key: 'created_at'
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
      exams: [],
      paginate: {
        current_page: 1,
        last_page: 1,
        total: 0,
      },
      form: {
        keyword: null,
        page: 1
      },
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    async fetchList(form = {}) {
      const res = await this.$axios.get(`exams`, {params: form})
      this.exams = res.data.data
      this.paginate = {
        current_page: res.data.current_page,
        last_page: res.data.last_page,
        total: res.data.total
      }
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
  justify-content: center;
}
</style>
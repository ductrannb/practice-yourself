<template>
  <div class="admin-user-wrapper">
    <div class="admin-container">
      <breadcrumb class="admin-breadcrumb-wrapper" :items="breadcrumbs"/>
      <div class="admin-user-container">
        <div class="admin-user-heading-box">
          <div class="search-input-box">
            <svg class="search-input--icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
            <input placeholder="Tìm kiếm ..." type="search" @input="search" v-model="form.keyword" class="search-input--input">
          </div>
        </div>
        <p class="admin-count-data-label">Tổng: <span>{{ paginate.total }}</span></p>
        <v-data-table
            :headers="headers"
            :items="courses"
        >
          <template v-slot:[`item.index`]="{ item }">
            <span>{{ courses.indexOf(item) + 1 }}</span>
          </template>
          <template v-slot:[`item.name`]="{ item }">
            <router-link class="text-primary text-decoration-underline" :to="{name: 'courses.detail', params: {id: item.id}}">{{ item.name }}</router-link>
          </template>
          <template v-slot:[`item.price`]="{ item }">
            <span>{{ $filter.formatMoney(item.price) }}</span>
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

export default {
  name: "UserCourses",
  components: {Breadcrumb},
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
          title: 'Số bài học',
          align: 'center',
          sortable: false,
          key: 'count_lesson'
        }, {
          title: 'Số câu hỏi',
          align: 'center',
          sortable: false,
          key: 'count_question'
        }, {
          title: 'Giá',
          align: 'center',
          sortable: false,
          key: 'price'
        }
      ]
    },
    breadcrumbs() {
      return [
        {
          title: 'Dashboard',
          route: {name: 'user.dashboard'}
        }, {
          title: 'Khóa học',
        },
      ]
    }
  },
  data() {
    return {
      courses: [],
      form: {
        keyword: null,
        page: 1
      },
      paginate: {
        last_page: 1,
        total: 0,
      },
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    async fetchList() {
      const res = await this.$axios.get('user/courses', {params: this.form})
      this.courses = res.data.data ?? []
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
      if (!Array.isArray(teachers)) {
        return ''
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
</style>
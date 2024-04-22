<template>
  <div class="admin-user-wrapper">
    <div class="admin-container">
      <breadcrumb class="admin-breadcrumb-wrapper" :items="breadcrumbs"/>
      <div class="admin-user-container">
        <div class="admin-user-heading-box">
          <div class="search-input-box">
            <svg class="search-input--icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
            <input placeholder="Tìm kiếm ..." type="search"  class="search-input--input">
          </div>
          <router-link :to="{name: 'admin.courses.create'}" class="custom-btn">Thêm mới</router-link>
        </div>
        <p class="admin-count-data-label">Tổng: <span>500</span></p>
        <v-data-table
          :headers="headers"
          :items="courses"
        >
          <template v-slot:[`item.teachers`]="{ item }">
            <span>{{ getLabelTeachers(item.teachers) }}</span>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <div class="admin-user-table--column-action-box">
              <v-icon icon="mdi-eye" @click="$router.push({name: 'admin.courses.lessons', params: {id: 1}})"/>
              <v-icon icon="mdi-pencil"/>
              <v-icon icon="mdi-delete" color="red"/>
            </div>
          </template>
          <template v-slot:bottom>
            <v-pagination
              :length="4"
              color="var(--color-primary)"
            ></v-pagination>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";

export default {
  name: "Courses",
  components: {Breadcrumb},
  data() {
    return {
      breadcrumbs: [
        {
          id: 1,
          title: 'Dashboard',
          route: {name: 'admin.dashboard'}
        },
        {
          id: 2,
          title: 'Khóa học',
        },
      ],
      headers: [
        {
          title: 'STT',
          align: 'center',
          sortable: false,
          key: 'index',
          width: '50px'
        },
        {
          title: 'Tên',
          align: 'start',
          sortable: false,
          key: 'name'
        },
        {
          title: 'Giáo viên',
          align: 'start',
          sortable: false,
          key: 'teachers'
        },
        {
          title: 'Số bài học',
          align: 'center',
          sortable: false,
          key: 'count_lesson'
        },
        {
          title: 'Số câu hỏi',
          align: 'center',
          sortable: false,
          key: 'count_question'
        },
        {
          title: 'Lượt bán',
          align: 'center',
          sortable: false,
          key: 'sold'
        },
        {
          title: 'Hành động',
          align: 'center',
          sortable: false,
          key: 'actions'
        }
      ],
      courses: [
        {
          index: 1,
          id: 1,
          name: 'Nguyễn Văn A',
          teachers: ['Trần Đức 1', 'Trần Đức 2', 'Trần Đức 3'],
          count_lesson: 15,
          count_question: 500,
          sold: 30
        },
        {
          index: 2,
          id: 2,
          name: 'Nguyễn Văn B',
          teachers: ['Trần Đức 1'],
          count_lesson: 15,
          count_question: 500,
          sold: 30
        },
        {
          index: 3,
          id: 3,
          name: 'Nguyễn Văn C',
          teachers: ['Trần Đức 1', 'Trần Đức 2'],
          count_lesson: 15,
          count_question: 500,
          sold: 30
        },
        {
          index: 4,
          id: 4,
          name: 'Nguyễn Văn D',
          teachers: ['Trần Đức 1', 'Trần Đức 2', 'Trần Đức 3'],
          count_lesson: 15,
          count_question: 500,
          sold: 30
        },
        {
          index: 5,
          id: 5,
          name: 'Nguyễn Văn E',
          teachers: ['Trần Đức 1', 'Trần Đức 2', 'Trần Đức 3'],
          count_lesson: 15,
          count_question: 500,
          sold: 30
        },{
          index: 6,
          id: 6,
          name: 'Nguyễn Văn A',
          teachers: ['Trần Đức 1', 'Trần Đức 2', 'Trần Đức 3'],
          count_lesson: 15,
          count_question: 500,
          sold: 30
        },
        {
          index: 7,
          id: 7,
          name: 'Nguyễn Văn B',
          teachers: ['Trần Đức 1', 'Trần Đức 2', 'Trần Đức 3'],
          count_lesson: 15,
          count_question: 500,
          sold: 30
        },
        {
          index: 8,
          id: 8,
          name: 'Nguyễn Văn C',
          teachers: ['Trần Đức 1', 'Trần Đức 2', 'Trần Đức 3'],
          count_lesson: 15,
          count_question: 500,
          sold: 30
        },
        {
          index: 9,
          id: 9,
          name: 'Nguyễn Văn D',
          teachers: ['Trần Đức 1', 'Trần Đức 2', 'Trần Đức 3'],
          count_lesson: 15,
          count_question: 500,
          sold: 30
        },
        {
          index: 10,
          id: 10,
          name: 'Nguyễn Văn E',
          teachers: ['Trần Đức 1', 'Trần Đức 2', 'Trần Đức 3'],
          count_lesson: 15,
          count_question: 500,
          sold: 30
        },
      ]
    }
  },
  methods: {
    getLabelTeachers(teachers) {
      if (!Array.isArray(teachers)) {
        return ''
      }
      if (teachers.length <= 2) {
        return teachers.join(', ')
      }
      return `${teachers.slice(0, 2).join(', ')}, (+${teachers.length - 2})`
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
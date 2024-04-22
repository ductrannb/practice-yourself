<template>
  <div class="admin-user-wrapper">
    <div class="admin-container">
      <breadcrumb class="admin-breadcrumb-wrapper" :items="breadcrumbs"/>
      <div class="admin-user-container">
        <div class="course-teacher-box">
          Danh sách giáo viên:
          <span>{{ course.teachers.join(', ') }}</span>
        </div>
        <LessonList :lessons="course.lessons"></LessonList>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue"
import LessonList from "@/components/LessonList.vue"

export default {
  name: "Courses",
  components: {LessonList, Breadcrumb},
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
          route: {name: 'admin.courses'}
        },
        {
          id: 3,
          title: 'Tên khóa học',
        },
        {
          id: 2,
          title: 'Danh sách bài học',
        },
      ],
      course: {
        name: 'Xét tính đơn điệu',
        teachers: ['Giáo viên 1', 'Giáo viên 2', 'Giáo viên 3'],
        lessons: [
          {
            index: 1,
            id: 1,
            name: 'Nguyễn Văn A',
            count_question: 500,
            author: 'Giáo viên 1'
          },
          {
            index: 2,
            id: 2,
            name: 'Nguyễn Văn B',
            count_question: 3,
            author: 'Giáo viên 2'
          },
          {
            index: 3,
            id: 3,
            name: 'Nguyễn Văn C',
            count_question: 500,
            author: 'Giáo viên 2'
          },
          {
            index: 4,
            id: 4,
            name: 'Nguyễn Văn D',
            count_question: 500,
            author: 'Giáo viên 2'
          },
          {
            index: 5,
            id: 5,
            name: 'Nguyễn Văn E',
            count_question: 500,
            author: 'Admin'
          },{
            index: 6,
            id: 6,
            name: 'Nguyễn Văn A',
            count_question: 500,
            author: 'Giáo viên 2'
          },
          {
            index: 7,
            id: 7,
            name: 'Nguyễn Văn B',
            count_question: 500,
            author: 'Giáo viên 2'
          },
          {
            index: 8,
            id: 8,
            name: 'Nguyễn Văn C',
            count_question: 500,
            author: 'Giáo viên 2'
          },
          {
            index: 9,
            id: 9,
            name: 'Nguyễn Văn D',
            count_question: 500,
            author: 'Giáo viên 2'
          },
          {
            index: 10,
            id: 10,
            name: 'Nguyễn Văn E',
            count_question: 500,
            author: 'Giáo viên 2'
          },
        ]
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.course-teacher-box {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-primary);
}
.course-teacher-box span {
  font-weight: 500;
  font-style: italic;
}
</style>
<template>
  <div class="admin-user-wrapper">
    <div class="admin-container">
      <breadcrumb class="admin-breadcrumb-wrapper" :items="breadcrumbs"/>
      <div class="admin-user-container">
        <QuestionList :questions="lesson.questions"></QuestionList>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue"
import LessonList from "@/components/LessonList.vue"
import Question from "@/components/Question.vue";
import QuestionList from "@/components/QuestionList.vue";

export default {
  name: "Courses",
  components: {QuestionList, Question, LessonList, Breadcrumb},
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
          title: 'Tên khóa học'
        },
        {
          id: 4,
          title: 'Danh sách bài học',
          route: {name: "admin.courses.lessons", params: {id: 1}}
        },
        {
          id: 5,
          title: 'Tên bài học'
        },
        {
          id: 6,
          title: 'Danh sách câu hỏi'
        },
      ],
      lesson: {
        name: 'Xét tính đơn điệu',
        teachers: ['Giáo viên 1', 'Giáo viên 2', 'Giáo viên 3'],
        questions: [
          {
            index: 1,
            id: 1,
            content: 'Nguyễn Văn A',
            count_question: 500,
            author: 'Giáo viên 1'
          },
          {
            index: 2,
            id: 2,
            content: 'Nguyễn Văn B',
            count_question: 3,
            author: 'Giáo viên 2'
          },
          {
            index: 3,
            id: 3,
            content: 'Nguyễn Văn C',
            count_question: 500,
            author: 'Giáo viên 2'
          },
          {
            index: 4,
            id: 4,
            content: 'Nguyễn Văn D',
            count_question: 500,
            author: 'Giáo viên 2'
          },
          {
            index: 5,
            id: 5,
            content: 'Nguyễn Văn E',
            count_question: 500,
            author: 'Admin'
          },{
            index: 6,
            id: 6,
            content: 'Nguyễn Văn A',
            count_question: 500,
            author: 'Giáo viên 2'
          },
          {
            index: 7,
            id: 7,
            content: 'Nguyễn Văn B',
            count_question: 500,
            author: 'Giáo viên 2'
          },
          {
            index: 8,
            id: 8,
            content: 'Nguyễn Văn C',
            count_question: 500,
            author: 'Giáo viên 2'
          },
          {
            index: 9,
            id: 9,
            content: 'Nguyễn Văn D',
            count_question: 500,
            author: 'Giáo viên 2'
          },
          {
            index: 10,
            id: 10,
            content: 'Nguyễn Văn E',
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
.page-heading {
  text-align: center;
}
.course-teacher-box {
  margin-bottom: 1rem;
}
.course-teacher-box span {
  font-weight: 500;
  font-style: italic;
}
</style>
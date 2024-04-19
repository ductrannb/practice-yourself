<template>
  <div class="admin-user-wrapper">
    <div class="admin-container">
      <breadcrumb :items="breadcrumbs"/>
      <div class="admin-user-container">
        <div class="admin-user-heading-box">
          <v-text-field variant="outlined" placeholder="Tìm kiếm" prepend-inner-icon="mdi-magnify" rounded/>
          <button class="custom-btn">Thêm mới</button>
        </div>
        <p class="admin-count-data-label">Tổng: <span>500</span></p>
        <v-data-table
            :headers="headers"
            :items="users"
        >
          <template v-slot:[`item.created_at`]="{ item }">
            <span>{{ $filter.formatDatetime(item.created_at) }}</span>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <div class="admin-user-table--column-action-box">
              <v-icon icon="mdi-eye"/>
              <v-icon icon="mdi-pencil"/>
              <v-icon icon="mdi-delete" color="red"/>
            </div>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";

export default {
  name: "User",
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
          title: 'Người dùng',
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
          title: 'Họ tên',
          align: 'start',
          sortable: false,
          key: 'name'
        },
        {
          title: 'Email',
          align: 'start',
          sortable: false,
          key: 'email'
        },
        {
          title: 'Ngày đăng ký',
          align: 'center',
          sortable: false,
          key: 'created_at'
        },
        {
          title: 'Hành động',
          align: 'center',
          sortable: false,
          key: 'actions'
        }
      ],
      users: [
        {
          index: 1,
          id: 1,
          name: 'Nguyễn Văn A',
          email: 'nguyenvana@gmail.com',
          created_at: '2021-09-01 12:00:00',
        },
        {
          index: 2,
          id: 2,
          name: 'Nguyễn Văn B',
          email: 'nguyenvanb@gmail.com',
          created_at: '2021-09-01 14:09:00',
        },
        {
          index: 3,
          id: 3,
          name: 'Nguyễn Văn C',
          email: 'nguyenvanc@gmail.com',
          created_at: '2021-09-01 15:00:00',
        },
        {
          index: 4,
          id: 4,
          name: 'Nguyễn Văn D',
          email: 'nguyenvand@gmail.com',
          created_at: '2021-09-01 16:00:00',
        },
        {
          index: 5,
          id: 5,
          name: 'Nguyễn Văn E',
          email: 'nguyenvane@gmail.com',
          created_at: '2021-09-01 17:00:00',
        },{
          index: 6,
          id: 6,
          name: 'Nguyễn Văn A',
          email: 'nguyenvana@gmail.com',
          created_at: '2021-09-01 12:00:00',
        },
        {
          index: 7,
          id: 7,
          name: 'Nguyễn Văn B',
          email: 'nguyenvanb@gmail.com',
          created_at: '2021-09-01 14:09:00',
        },
        {
          index: 8,
          id: 8,
          name: 'Nguyễn Văn C',
          email: 'nguyenvanc@gmail.com',
          created_at: '2021-09-01 15:00:00',
        },
        {
          index: 9,
          id: 9,
          name: 'Nguyễn Văn D',
          email: 'nguyenvand@gmail.com',
          created_at: '2021-09-01 16:00:00',
        },
        {
          index: 10,
          id: 10,
          name: 'Nguyễn Văn E',
          email: 'nguyenvane@gmail.com',
          created_at: '2021-09-01 17:00:00',
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>
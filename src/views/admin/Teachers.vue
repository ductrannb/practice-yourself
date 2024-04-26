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
          <router-link :to="{name: 'admin.teachers.create'}" class="custom-btn">Thêm mới</router-link>
        </div>
        <p class="admin-count-data-label">Tổng: <span>{{ paginate.total }}</span></p>
        <v-data-table
          :headers="headers"
          :items="teachers"
        >
          <template v-slot:[`item.index`]="{ item }">
            <span>{{ teachers.indexOf(item) + 1 }}</span>
          </template>
          <template v-slot:[`item.created_at`]="{ item }">
            <span>{{ $filter.formatDatetime(item.created_at) }}</span>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <div class="admin-user-table--column-action-box">
              <v-icon icon="mdi-eye" title="Chi tiết" @click="$router.push({name: 'admin.teachers.detail', params: {id: item.id}})"/>
              <v-icon icon="mdi-pencil" title="Sửa" @click="$router.push({name: 'admin.teachers.update', params: {id: item.id}})"/>
              <v-icon icon="mdi-delete" title="Xóa" color="red" @click="destroy(item.id)"/>
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
import constants from "@/Utils/constants.js";
import {debounce} from "lodash";

export default {
  name: "Teachers",
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
          title: 'Họ tên',
          align: 'start',
          sortable: false,
          key: 'name'
        }, {
          title: 'Email',
          align: 'start',
          sortable: false,
          key: 'email'
        }, {
          title: 'Ngày đăng ký',
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
    },
    breadcrumbs() {
      return [
        {
          id: 1,
          title: 'Dashboard',
          route: {name: 'admin.dashboard'}
        }, {
          id: 2,
          title: 'Giáo viên',
        },
      ]
    }
  },
  data() {
    return {
      form: {
        role: constants.ROLE.TEACHER,
        keyword: null,
        page: 1
      },
      paginate: {
        current_page: 1,
        last_page: 1,
        total: 0,
      },
      teachers: []
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    async fetchList() {
      const res = await this.$axios.get('users', {params: this.form})
      this.teachers = res.data.data ?? []
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
    async destroy(id) {
      const rs = await this.deleteConfirm()
      if (rs.isConfirmed) {
        await this.$axios.delete(`users/${id}`)
        this.fetchList()
      }
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
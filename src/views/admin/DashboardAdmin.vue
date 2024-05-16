<template>
  <div class="body flex-grow-1 px-3">
    <CContainer lg>
      <div class="dashboard-wrapper">
        <CRow>
          <CCol :xs="3" v-if="auth.role_id == constants.ROLE.ADMIN">
            <ChartMini
                title="Người dùng"
                :value="dashboard.userChart.value"
                :growPercent="dashboard.userChart.grow_percent"
                :chartLabels="dashboard.userChart.chart_labels"
                data-set-label="Người dùng"
                :data-set-data-chart="dashboard.userChart.chart_data"
            />
          </CCol>
          <CCol :xs="3" v-if="auth.role_id == constants.ROLE.ADMIN">
            <ChartMini
                title="Giáo viên"
                :value="dashboard.teacherChart.value"
                :growPercent="dashboard.teacherChart.grow_percent"
                :chartLabels="dashboard.teacherChart.chart_labels"
                data-set-label="Giáo viên"
                :data-set-data-chart="dashboard.teacherChart.chart_data"
                background-color="info"
                data-set-point-background-color="#39f"
            />
          </CCol>
          <CCol :xs="3">
            <ChartMini
                title="Câu hỏi"
                :value="dashboard.questionChart.value"
                :growPercent="dashboard.questionChart.grow_percent"
                :chartLabels="dashboard.questionChart.chart_labels"
                data-set-label="Câu hỏi"
                :data-set-data-chart="dashboard.questionChart.chart_data"
                background-color="warning"
                data-set-point-background-color="rgb(205 114 0)"
            />
          </CCol>
          <CCol :xs="3">
            <ChartMini
                title="Đề thi"
                :value="dashboard.examChart.value"
                :growPercent="dashboard.examChart.grow_percent"
                :chartLabels="dashboard.examChart.chart_labels"
                data-set-label="Đề thi"
                :data-set-data-chart="dashboard.examChart.chart_data"
                background-color="danger"
                data-set-point-background-color="rgb(189, 68, 68)"
            />
          </CCol>
        </CRow>
          <CCard>
            <CCardBody>
              <CRow>
                <CCol :sm="5">
                  <h4 id="traffic" class="card-title mb-0">Tổng quan</h4>
                  <div class="small text-medium-emphasis"></div>
                </CCol>
                <CCol :sm="7" class="d-none d-md-block">
                  <CButtonGroup
                      class="float-end me-3"
                      role="group"
                      aria-label="Basic outlined example"
                  >
                    <CButton color="secondary" variant="outline" @click="changeType(typeDay)" :active="form.type === typeDay">Ngày</CButton>
                    <CButton color="secondary" variant="outline" @click="changeType(typeWeek)" :active="form.type === typeWeek">Tuần</CButton>
                    <CButton color="secondary" variant="outline" @click="changeType(typeMonth)" :active="form.type === typeMonth">Tháng</CButton>
                  </CButtonGroup>
                </CCol>
              </CRow>
              <CCol>
                <CChart
                  :data="mainChartData"
                  :options="{
                    elements: {
                      line: {
                        borderWidth: 1,
                        tension: 0.4,
                      },
                      point: {
                        radius: 4,
                        hitRadius: 10,
                        hoverRadius: 4,
                      },
                    },
                    scales: {
                      y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                      },
                      y1: {
                        type: 'linear',
                        display: isAdmin,
                        position: 'right',
                        grid: {
                          drawOnChartArea: false,
                        },
                      },
                    }
                }"></CChart>
              </CCol>
            </CCardBody>
          </CCard>
      </div>
    </CContainer>
  </div>
</template>

<script>
import ChartMini from "@/components/charts/ChartMini.vue"
import {CCol, CRow} from "@coreui/vue/dist/esm/components/grid/index.js";
import {CChart} from "@coreui/vue-chartjs";
import {CCardBody} from "@coreui/vue/dist/esm/components/card/index.js";
import {mapGetters} from "vuex";
import constants from "@/Utils/constants.js";

export default {
  name: 'DashboardAdmin',
  components: {CCardBody, CChart, CCol, CRow, ChartMini},
  computed: {
    constants() {
      return constants
    },
    ...mapGetters(['auth']),
    isAdmin() {
      return this.auth.role_id == constants.ROLE.ADMIN
    },
    mainChartData() {
      return  {
        labels: this.dashboard.mainChart.labels,
        datasets: [
          {
            label: this.isAdmin ? 'Lượng đăng ký khóa học' : 'Số học sinh tham gia',
            backgroundColor: '#000',
            borderColor: '#000',
            position: 'right',
            data: this.isAdmin ? this.dashboard.mainChart.course_data : this.dashboard.mainChart.joiner_data,
          },
          {
            label: this.isAdmin ? 'Doanh thu' : 'Số lượt nộp',
            backgroundColor: '#ff0000',
            borderColor: '#ff0000',
            type: 'line',
            data: this.isAdmin ? this.dashboard.mainChart.revenue_data : this.dashboard.mainChart.submit_time_data,
          },
        ],
      }
    },
    typeDay() {
      return 1
    },
    typeWeek() {
      return 2
    },
    typeMonth() {
      return 3
    }
  },
  data() {
    return {
      form: {
        type: 2
      },
      dashboard: {
        userChart: {
          chart_labels: [],
          chart_data: [],
        },
        teacherChart: {
          chart_labels: [],
          chart_data: [],
        },
        questionChart: {
          chart_labels: [],
          chart_data: [],
        },
        examChart: {
          chart_labels: [],
          chart_data: [],
        },
        mainChart: {}
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    changeType(type) {
      this.form.type = type
      this.fetchData()
    },
    async fetchData() {
      const url = this.auth.role_id == constants.ROLE.ADMIN ? 'admin/dashboard' : 'teacher/dashboard'
      const res = await this.$axios.get(url, {params: this.form})
      this.dashboard = res.data.data
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>
.dashboard-wrapper {
}
</style>
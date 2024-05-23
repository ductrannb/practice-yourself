<template>
  <CWidgetStatsA class="mb-4" :color="backgroundColor">
    <template #value>
      {{ $filter.formatNumberChart(value) }}
      <span class="fs-6 fw-normal">
            ({{ growPercent }} <CIcon :icon="iconPercent" />)
          </span>
    </template>
    <template #title>{{ title }}</template>
    <template #action>
    </template>
    <template #chart>
      <CChart
        type="line"
        class="mt-3 mx-3"
        style="height: 70px"
        :data="chart"
        :options="chartOptions"
      />
    </template>
  </CWidgetStatsA>
</template>

<script>
import {CChart} from "@coreui/vue-chartjs";

export default {
  name: "ChartMini",
  components: {CChart},
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      required: true,
    },
    growPercent: {
      required: true,
    },
    dataSetLabel: {
      type: String,
      required: true
    },
    dataSetBorderColor: {
      type: String,
      default: 'rgba(255,255,255,.55)'
    },
    dataSetPointBackgroundColor: {
      type: String,
      default: '#321fdb'
    },
    dataSetDataChart: {
      type: Array,
      required: true
    },
    chartLabels: {
      type: Array,
      required: true,
    },
    backgroundColor: {
      type: String,
      default: "primary",
    },
  },
  watch: {
    chartLabels(newVal) {
      this.chart.labels = newVal
    },
    dataSetDataChart(newVal) {
      this.chart.datasets[0].data = newVal
    }
  },
  data() {
    return {
      chart: {
        labels: [],
        datasets: [
          {
            label: this.dataSetLabel,
            backgroundColor: 'transparent',
            borderColor: this.dataSetBorderColor,
            pointBackgroundColor: this.dataSetPointBackgroundColor,
            data: [],
          },
        ],
      }
    }
  },
  computed: {
    iconPercent() {
      if (!this.growPercent) return 'cil-arrow-top';
      const value = parseFloat(`${this.growPercent}`.replace('%', ''));
      return this.growPercent >= 0 ? 'cil-arrow-top' : 'cil-arrow-bottom';
    },
    chartOptions() {
      return {
        plugins: {
          legend: {
            display: false,
          },
        },
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: false,
            },
          },
          y: {
            min: 30,
            max: 89,
            display: false,
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        },
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
      }
    }
  }
}
</script>

<style scoped>

</style>
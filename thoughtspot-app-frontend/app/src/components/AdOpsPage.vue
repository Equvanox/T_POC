<template>
  <div ref="chart" style="width: 650px; height: 400px;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'SimpleChart',
  props: {
    chartData: {
      type: Array,
      default: () => []
    },
    chartType: {
      type: String,
      default: 'bar' // Options: 'bar', 'line', 'pie', 'bubble'
    }
  },
  mounted() {
    this.initChart();
  },
  watch: {
    chartData: {
      handler(newData) {
        if (this.myChart) {
          this.updateChart(newData);
        }
      },
      deep: true,
      immediate: true
    },
    chartType: {
      handler() {
        this.updateChart(this.chartData);
      },
      immediate: true
    }
  },
  methods: {
    initChart() {
      const chartDom = this.$refs.chart;
      this.myChart = echarts.init(chartDom);
      this.updateChart(this.chartData);

      window.addEventListener('resize', this.myChart.resize);
    },
    updateChart(data) {
      if (!this.myChart) return;

      const categories = data.map(item => item.category);
      const values = data.map(item => item.value);

      let options;

      if (this.chartType === 'pie') {
        options = {
          title: { text: 'Spend by Advertisers' },
          tooltip: { trigger: 'item' },
          series: [
            {
              type: 'pie',
              data: data.map(item => ({ name: item.category, value: item.value }))
            }
          ]
        };
      } else if (this.chartType === 'bubble') {
        // Bubble chart setup
        options = {
          title: { text: 'Impressions Scale' },
          tooltip: { trigger: 'item' },
          xAxis: { type: 'category', data: categories },
          yAxis: { type: 'value' },
          series: [
            {
              type: 'scatter',
              data: data.map(item => ({
                name: item.category,
                value: [item.category, item.value, item.size] // x-axis, y-axis, bubble size
              })),
              symbolSize: function (data) {
                return data[2]; // Controls the bubble size based on the third value (size)
              }
            }
          ]
        };
      } else {
        options = {
          title: { text: `Advertiser ${this.chartType.charAt(0).toUpperCase() + this.chartType.slice(1)} Details` },
          tooltip: {},
          xAxis: { type: 'category', data: categories },
          yAxis: { type: 'value' },
          series: [
            {
              type: this.chartType,
              data: values
            }
          ]
        };
      }

      this.myChart.setOption(options);
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.myChart.resize);
    if (this.myChart) {
      this.myChart.dispose();
    }
  }
};
</script>

<style>
</style>

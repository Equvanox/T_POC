<template>
  <div ref="chart" style="width: 1500px; height: 400px;"></div>
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
      default: 'bar'
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
        // Re-render the chart with the new type
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

      // Extract categories and values for bar and line charts
      const categories = data.map(item => item.category);
      const values = data.map(item => item.value);

      let options;

      if (this.chartType === 'pie') {
        options = {
          title: {
            text: 'Spend by Advertisers',
          },
          tooltip: {
            trigger: 'item',
          },
          series: [
            {
              type: 'pie',
              data: data.map(item => ({ name: item.category, value: item.value })),
            },
          ],
        };
      } else {
        // Default to bar/line types that use x/y axes
        options = {
          title: {
            text: `Advertiser ${this.chartType.charAt(0).toUpperCase() + this.chartType.slice(1)} Details`,
          },
          tooltip: {},
          xAxis: {
            type: 'category',
            data: categories,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              type: this.chartType, // Dynamic series type (bar, line)
              data: values,
            },
          ],
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

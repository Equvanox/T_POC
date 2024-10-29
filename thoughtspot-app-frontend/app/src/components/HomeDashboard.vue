<template>
  <v-chart :options="chartOptions" style="width: 100%; height: 400px;" />
</template>

<script>
import { defineComponent, reactive, watch } from 'vue';
import VChart from 'vue-echarts';
import * as echarts from 'echarts/core';
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer]);

export default defineComponent({
  components: { VChart },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const chartOptions = reactive({
      title: { text: 'Test Chart' },
      tooltip: { trigger: 'axis', formatter: '{b} : {c}' },
      xAxis: { type: 'category', data: [] },
      yAxis: { type: 'value' },
      series: [{ type: 'bar', data: [] }],
    });

    watch(
      () => props.data,
      (newData) => {
        if (newData && newData.length > 0) {
          chartOptions.xAxis.data = newData.map((item) => item.category);
          chartOptions.series[0].data = newData.map((item) => item.value);
          console.log()
        }
      },
      { immediate: true });

    return { chartOptions };
  },
});
</script>

<style>
/* Add your styles here */
</style>

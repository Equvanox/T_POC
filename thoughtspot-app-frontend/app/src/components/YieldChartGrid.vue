<template>
  <div style="width: 100%; display: flex; flex-direction: column; ">
   
    <!-- Data Grid Table with a larger margin below -->
    <div style="height: 400px; overflow-y: auto; margin-bottom: -120px; align:center;">
      <AgGridVue
        class="ag-theme-alpine"
        style="width: 68%; height: 65%; margin:atuo;"
        :columnDefs="columnDefs"
        :rowData="rowData"
        :gridOptions="gridOptions"
        @first-data-rendered="onFirstDataRendered"
      />
    </div>

    <!-- Charts section in two rows -->
    <div style="display: flex; flex-wrap: wrap; gap: 20px; padding: 10px;">
      <div ref="revenueChartContainer" class="chart-box">
        <h3>Revenue Over Time</h3>
      </div>
      <div ref="sellThroughChartContainer" class="chart-box">
        <h3>Sell-Through Rate by Campaign</h3>
      </div>
      <div ref="profitMarginChartContainer" class="chart-box">
        <h3 style="padding: 20px;">Profit Margin by Campaign</h3>
      </div>
      <div ref="inventoryChartContainer" class="chart-box">
        <h3 style="padding: 20px;">Inventory Usage by Campaign</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-enterprise';

export default {
  components: { AgGridVue },
  data() {
    return {
      columnDefs: [
        { headerName: 'Campaign', field: 'campaign' },
        { headerName: 'Inventory (%)', field: 'inventoryUsage' },
        { headerName: 'Sell-Through Rate (%)', field: 'sellThroughRate' },
        { headerName: 'Profit Margin (%)', field: 'profitMargin' },
        { headerName: 'Revenue ($)', field: 'revenue' },
        { headerName: 'Date', field: 'date' },
      ],
      rowData: [
        { campaign: 'Campaign A', inventoryUsage: 80, sellThroughRate: 70, profitMargin: 25, revenue: 10000, date: '2024-01-01' },
        { campaign: 'Campaign B', inventoryUsage: 60, sellThroughRate: 60, profitMargin: 30, revenue: 15000, date: '2024-02-01' },
        { campaign: 'Campaign C', inventoryUsage: 90, sellThroughRate: 85, profitMargin: 20, revenue: 12000, date: '2024-03-01' },
        { campaign: 'Campaign D', inventoryUsage: 70, sellThroughRate: 75, profitMargin: 28, revenue: 18000, date: '2024-04-01' },
        { campaign: 'Campaign E', inventoryUsage: 65, sellThroughRate: 68, profitMargin: 27, revenue: 11000, date: '2024-05-01' },
      ],
      gridOptions: { enableCharts: true, enableRangeSelection: true },
      gridApi: null,
    };
  },
  methods: {
    onFirstDataRendered(params) {
      this.gridApi = params.api;
      this.createAllCharts();
    },
    createAllCharts() {
      this.createChart('line', ['date', 'revenue'], this.$refs.revenueChartContainer, 'Date', 'Revenue ($)');
      this.createChart('bar', ['campaign', 'sellThroughRate'], this.$refs.sellThroughChartContainer, 'Campaign', 'Sell-Through Rate (%)');
      this.createChart('column', ['campaign', 'profitMargin'], this.$refs.profitMarginChartContainer, 'Campaign', 'Profit Margin (%)');
      this.createChart('pie', ['campaign', 'inventoryUsage'], this.$refs.inventoryChartContainer, 'Campaign', 'Inventory Usage (%)');
    },
    createChart(type, columns, container, xAxisTitle, yAxisTitle) {
      const chartRangeParams = {
        cellRange: { columns },
        chartType: type,
        chartContainer: container,
        chartThemeOverrides: {
          common: { padding: { top: 5, right: 5, bottom: 5, left: 5 }, background: { fill: '#f4f4f4' }},
          axes: {
            category: { label: { rotation: 0 }, title: { text: xAxisTitle }},
            number: { title: { text: yAxisTitle }},
          },
        },
      };
      this.gridApi.createRangeChart(chartRangeParams);
    },
  },
};
</script>

<style>
@import "~ag-grid-community/styles/ag-grid.css";
@import "~ag-grid-community/styles/ag-theme-alpine.css";


.chart-box {
  width: 48%;
  height: 250px;
  border: 1px solid #ddd;
  padding: 10px;
  box-sizing: border-box;
  background-color: #f4f4f4;
  text-align: center;
}
</style>

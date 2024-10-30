<template>
  <div id="tableauViz" class="tableau-dashboard"></div>
</template>

<script>
export default {
  data() {
    return {
      tableauViz: null,
      tableauUrl:"https://prod-apnortheast-a.online.tableau.com/t/govindatak-45a71db4fa/views/Plannig_Dashboard/Plannig_Dashboard?:origin=card_share_link&:embed=n" // Replace with your dashboard URL
    };
  },
  mounted() {
    this.initTableau();
  },
  methods: {
    initTableau() {
      const containerDiv = document.getElementById("tableauViz");
      const options = {
        width: "100%",
        height: "100%",
        hideTabs: true,
        hideToolbar: true
      };

      this.tableauViz = new window.tableau.Viz(containerDiv, this.tableauUrl, options);
    }
  }
};
</script>

<style>
html, body, #tableauViz, .tableau-dashboard {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>

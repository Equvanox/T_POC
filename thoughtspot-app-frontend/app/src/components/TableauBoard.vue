<template>
    <div class="tableauPlaceholder" :id="vizId" style="position: relative;">
      <noscript>
        <a :href="dashboardUrl"><img :alt="altText" :src="staticImageUrl" style="border: none" /></a>
      </noscript>
      <object class="tableauViz" style="display: none;">
        <param name="host_url" :value="hostUrl" />
        <param name="embed_code_version" value="3" />
        <param name="site_root" value="" />
        <param name="name" :value="name" />
        <param name="tabs" value="no" />
        <param name="toolbar" value="yes" />
        <param name="static_image" :value="staticImageUrl" />
        <param name="animate_transition" value="yes" />
        <param name="display_static_image" value="yes" />
        <param name="display_spinner" value="yes" />
        <param name="display_overlay" value="yes" />
        <param name="display_count" value="yes" />
        <param name="language" value="en-US" />
      </object>
    </div>
  </template>
  
  <script>
  export default {
    name: "TableauEmbed",
    props: {
      vizId: {
        type: String,
        default: "viz1730294586988",
      },
      dashboardUrl: {
        type: String,
        default: "https://public.tableau.com/views/HRDashboard_17194096809750/OVERVIEW",
      },
      hostUrl: {
        type: String,
        default: "https%3A%2F%2Fpublic.tableau.com%2F",
      },
      name: {
        type: String,
        default: "HRDashboard_17194096809750/OVERVIEW",
      },
      staticImageUrl: {
        type: String,
        default: "https://public.tableau.com/static/images/HR/HRDashboard_17194096809750/OVERVIEW/1.png",
      },
      altText: {
        type: String,
        default: "OVERVIEW",
      },
    },
    mounted() {
      this.loadTableauScript();
    },
    methods: {
      loadTableauScript() {
        const divElement = document.getElementById(this.vizId);
        const vizElement = divElement.getElementsByTagName("object")[0];
        vizElement.style.width = "1366px";
        vizElement.style.height = "1047px";
        const scriptElement = document.createElement("script");
        scriptElement.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
        vizElement.parentNode.insertBefore(scriptElement, vizElement);
      },
    },
  };
  </script>
  
  <style scoped>
  .tableauPlaceholder {
    width: 100%;
    height: auto;
  }
  </style>
  
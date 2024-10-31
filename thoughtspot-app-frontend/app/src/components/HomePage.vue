<template>
  <div class="dashboard-page screen">
    <!-- Header with Menu -->
    <header class="header">
      <div class="hamburger-menu" @click="toggleSidebar">
        <i class="fas fa-bars"></i>
      </div>
      <div class="logo">
        <img src="@\assets\logo_dashboard.jpg" alt="Logo" />
      </div>

      <nav class="menu">
        <ul>
          <div style="margin-right: 13px;">
            <li><a href="#" title="Oneview"><i class="fas fa-tachometer-alt"></i><span> OneView</span></a></li>
          </div>
          <div style="margin-right: 13px;">
            <li><a href="#" title="Answers"><i class="fas fa-question-circle"></i><span> Answers</span></a></li>
          </div>
          <div style="margin-right: 13px;">
            <li><a href="#" title="Liveboards"><i class="fas fa-tv"></i><span> LiveBoards</span></a></li>
          </div>
          <div style="margin-right: 13px;">
            <li><a href="#" title="Sage"><i class="fas fa-search"></i><span> Sage</span></a></li>
          </div>
        <!-- Help Button -->
          <div style="margin-right: 5px; margin-left: 915px;">
            <li><a href="#" title="Help"><i class="fas fa-life-ring"></i><span> Help</span></a></li>
          </div>
        </ul>
      </nav>
    </header>

    <!-- Sidebar with Icons -->
    <div class="main-container screen">
      <aside class="sidebar" :class="{ collapsed: !isSidebarOpen }">
        <nav>
          <ul>
            <li id='general' class="menu-item" @click="toggleSubMenu('general')" ref="generalMenuItem">
              <a href="#" title="General">
                <i class="fas fa-chart-line"></i>
                <span v-if="isSidebarOpen">General (TS)</span>
              </a>
              <!-- Submenu for General -->
              <div class="submenu" v-if="showSubMenu.general && isSidebarOpen" ref="generalsubmenu"  @click.stop>
                <ul>
                  <li @click="switchDashboard('General Summary')"><a href="#" title="Summary"><i class="fas fa-clipboard"></i><span>Summary</span></a></li>
                  <li @click="switchDashboard('Bookings Dashboard')"><a href="#" title="Bookings Dashboard"><i class="fas fa-chart-bar"></i><span>Bookings Dashboard</span></a></li>
                </ul>
              </div>
            </li>
            <li id='adops' class="menu-item" @click="toggleSubMenu('adops')" ref="adopsMenuItem">
              <a href="#" title="AdOps"><i class="fas fa-ad"></i> <span v-if="isSidebarOpen">AdOps (Echarts)</span></a>
              <div class="submenu" v-if="showSubMenu.adops && isSidebarOpen" ref="adopssubmenu"  @click.stop>
                <ul>
                  <li @click="switchDashboard('Delivery Metrics')"><a href="#" title="Delivery Metrics"><i class="fas fa-user"></i><span>Delivery Metrics</span></a></li>
                </ul>
              </div>
            </li>
            <li id='yield' class="menu-item" @click="toggleSubMenu('yield')" ref="yieldMenuItem">
              <a href="#" title="Yield"><i class="fas fa-balance-scale"></i> <span v-if="isSidebarOpen">Yield (AgGrid)</span></a>
              <div class="submenu" v-if="showSubMenu.yield && isSidebarOpen" ref="yieldsubmenu"  @click.stop>
                <ul>
                  <li @click="switchDashboard('Yield Summary')"><a href="#" title="Summary"><i class="fas fa-dashboard"></i><span>Summary</span></a></li>
                </ul>
              </div></li>
            <li id='finance' class="menu-item" @click="toggleSubMenu('finance')" ref="financeMenuItem">
              <a href="#" title="Sales/Finance"><i class="fas fa-chart-pie"></i><span v-if="isSidebarOpen">Finance (PowerBI)</span></a>
              <div class="submenu" v-if="showSubMenu.finance && isSidebarOpen" ref="financesubmenu"  @click.stop>
                <ul>
                  <li @click="switchDashboard('Premion Sales')"><a href="#" title="Premion Sales"><i class="fas fa-dollar"></i><span> Premion Sales</span></a></li>
                </ul>
              </div>
            </li>
            <li id='planning' class="menu-item" @click="toggleSubMenu('planning')" ref="planningMenuItem">
            <a href="#" title="Planning"><i class="fas fa-project-diagram"></i><span v-if="isSidebarOpen">Planning (Tableau)</span></a>
            <div class="submenu" v-if="showSubMenu.planning && isSidebarOpen" ref="planningsubmenu"  @click.stop>
                <ul>
                  <li @click="switchDashboard('Planning Strategy')"><a href="#" title="Planning Strategy"><i class="fas fa-brain"></i><span>Planning Strategy</span></a></li>
                </ul>
              </div>
            </li>
            <li><a href="#" title="Account Management"><i class="fas fa-users"></i><span v-if="isSidebarOpen">Account Management</span></a></li>
            <li><a href="#" title="Product"><i class="fas fa-box"></i><span v-if="isSidebarOpen">Product</span></a></li>
            <li><a href="#" title="Executive"><i class="fas fa-user-tie"></i><span v-if="isSidebarOpen">Executive</span></a></li>
            <li><a href="#" title="Settings"><i class="fas fa-cogs"></i><span v-if="isSidebarOpen">Settings</span></a></li>
            <li @click="signOut"><a href="#" title="Signout"><i class="fas fa-sign-out-alt"></i><span v-if="isSidebarOpen">Signout</span></a></li>
          </ul>
        </nav>
      </aside>

      <div id="embed-title" v-if="dashboardType === 'General Summary' || dashboardType === 'Bookings Dashboard'">
          <h2>{{ heading }}</h2>
          <div id="embed-container"></div>
      </div>
      <div id="embed-title" v-if="dashboardType === 'AGgrid'">
        <h2>{{ heading }}</h2>
        <div id="embed-container" class="scrollable-container">
          <component :is="currentComponent" :data="AchartData" />
        </div>
      </div>
      <div id="embed-title" v-if="dashboardType === 'echart'">
        <h2>{{ heading }}</h2>
        <div id="embed-container" class="scrollable-container">
          <div class="chart-container">
            <AdOpsPage class="chart chart1" :chartData="chartData" chartType="bar" />
            <AdOpsPage class="chart chart2" :chartData="chartData" chartType="line" />
            <AdOpsPage class="chart chart1" :chartData="chartData" chartType="pie" />
            <AdOpsPage class="chart chart2" :chartData="bubblechartData" chartType="bubble" />
          </div>
          </div>
      </div>
      <div id="embed-title" v-if="dashboardType === 'Planning Strategy'">
        <h2>{{ heading }}</h2>
        <div id="embed-container" class="scrollable-container" style="padding-top: 0px;">
          <PlanningPage />
        </div>
      </div>
      <div class="iframecontainer" v-if="dashboardType === 'iframe'">
        <iframe class="responsive-iframe" title="Sample Report Demo" width="1140" height="541.25" src="https://playground.powerbi.com/sampleReportEmbed" frameborder="0" allowFullScreen="true"></iframe>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { nextTick } from 'vue';
import '@/styles/HomePageStyle.css';
import AdOpsPage from '@/components/AdOpsPage.vue';
import PlanningPage from '@/components/PlanningPage.vue';
import YieldPage from '@/components/YieldPage.vue';
import { init, Action, LiveboardEmbed, AuthType } from '@thoughtspot/visual-embed-sdk';
export default {
  components: { AdOpsPage, YieldPage, PlanningPage},
  data() {
    return {
      showSubMenu: {
        general: false,
        bookings: false,
        sales: false
      },
      activeDashboard: null,
      isSidebarOpen: false,
      dashboardType : 'General Summary',
      liveboardId: 'ef5b2449-05c0-4dd9-9494-70d93946c377',
      heading: 'General Summary',
      chartData: [],
      AchartData: [],
      bubblechartData: []
    };
  },
  methods: {
    toggleSubMenu(id) {
      this.showSubMenu[id] = !this.showSubMenu[id];
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    signOut() {
      this.$router.push('/');
    },
    handleClickOutside(event, id) {
      const menuItem = this.$refs[`${id}MenuItem`];
      const submenu = this.$refs[`${id}Submenu`];
      if (menuItem && submenu && !menuItem.contains(event.target) && !submenu.contains(event.target)) {
        this.$set(this.showSubMenu, id, false);
      }
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    async showAGgrid() {
      this.currentComponent = 'YieldPage';
    },
    async showEchart() {
      await nextTick();
      console.log("Reached Vue");
      const response = await axios.get('http://localhost:3000/api/dashboard-data');
      console.log(response.data);
      if (this.bubblechartData.length == 0) {
        for (let i=0; i< response.data.length; i++) {
          response.data[i]['size'] = response.data[i]['value']/18;
          this.bubblechartData.push(response.data[i]);
        }
      }
      console.log(this.bubblechartData)
      this.chartData = response.data;
    },
    switchDashboard(type) {
      this.activeDashboard = type;
      if (this.liveboardEmbed) {
        this.liveboardEmbed.detach();
        this.liveboardEmbed = null;
      }
      if (type === 'General Summary') {
        this.dashboardType = type;
        this.heading = type;
        this.liveboardId = 'ef5b2449-05c0-4dd9-9494-70d93946c377';
        this.renderLiveboard();
      }
      if (type === 'Bookings Dashboard') {
        this.dashboardType = type;
        this.heading = type;
        this.liveboardId = '5a16fd22-3c8c-4889-b755-996256276bd8';
        this.renderLiveboard();
      }
      if (type === 'Yield Summary') {
        this.dashboardType = 'AGgrid';
        this.heading = type;
        this.showAGgrid();
      }
      if (type === 'Planning Strategy') {
        this.dashboardType = type;
        this.heading = type;
      }
      if (type === 'Delivery Metrics') {
        this.heading = type;
        this.dashboardType = 'echart';
        this.showEchart();
      }  
      if (type === 'Premion Sales') {
        this.dashboardType = 'iframe';
      }  
    },
    async renderLiveboard() {
      await nextTick();
      const embed = new LiveboardEmbed('#embed-container', {
        frameParams: {},
        liveboardId: this.liveboardId,
        hiddenActions: [Action.EditTML, Action.Schedule, Action.ExportTML, Action.UpdateTML,
          Action.RenameModalTitleDescription, Action.MakeACopy, Action.LiveboardInfo, Action.Present, 
          Action.SchedulesList, Action.Edit, Action.Share ,Action.CopyLink, Action.Pin, Action.Edit, Action.RenameModalTitleDescription,Action.Share,"requestVerification",Action.AddToFavorites],
      });
      embed.render();
    }
  },
  async mounted() {
    document.addEventListener('click', (event) => this.handleClickOutside(event, 'general'));
    document.addEventListener('click', (event) => this.handleClickOutside(event, 'finance'));
    document.addEventListener('click', (event) => this.handleClickOutside(event, 'yield'));
    document.addEventListener('click', (event) => this.handleClickOutside(event, 'adops'));
    document.addEventListener('click', (event) => this.handleClickOutside(event, 'planning'));
    try {
      init({
        thoughtSpotHost: 'https://tegna.thoughtspot.cloud/', 
        authType: AuthType.None,
        getAuthToken: async () => {
          return localStorage.getItem('token');
        },
      });
    if (this.activeDashboard === 'General Summary' || this.activeDashboard === 'Bookings Dashboard' || this.activeDashboard === null) {
      this.renderLiveboard();
    }
    if (this.activeDashboard === 'Yield Summary') {
      this.showAGgrid();
    }
    if (this.activeDashboard === 'Delivery Metrics') {
      this.showEchart();
    }
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  },
  beforeUnmount() {
    document.removeEventListener('click', (event) => this.handleClickOutside(event, 'general'));
    document.removeEventListener('click', (event) => this.handleClickOutside(event, 'finance'));
    document.removeEventListener('click', (event) => this.handleClickOutside(event, 'yield'));
    document.removeEventListener('click', (event) => this.handleClickOutside(event, 'adops'));
    document.removeEventListener('click', (event) => this.handleClickOutside(event, 'planning'));
  },
};
</script>
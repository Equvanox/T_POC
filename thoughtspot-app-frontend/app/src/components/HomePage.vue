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
            <li class="menu-item" @click="toggleSubMenu" ref="generalMenuItem">
              <a href="#" title="General">
                <i class="fas fa-chart-line"></i>
                <span v-if="isSidebarOpen">General</span>
              </a>
              <!-- Submenu for General -->
              <div class="submenu" v-if="showSubMenu && isSidebarOpen" ref="submenu"  @click.stop>
                <ul>
                  <li><a href="#" title="Summary"><i class="fas fa-clipboard"></i><span> Summary</span></a></li>
                  <li><a href="#" title="Bookings Dashboard"><i class="fas fa-chart-bar"></i><span> Bookings Dashboard</span></a></li>
                </ul>
              </div>
            </li>
            <li>
              <a href="#" title="AdOps"><i class="fas fa-ad"></i> <span v-if="isSidebarOpen">AdOps</span></a>
            </li>
            <li>
              <a href="#" title="Yield"><i class="fas fa-balance-scale"></i> <span v-if="isSidebarOpen">Yield</span></a>
            </li>
            <!-- New Items in Hamburger Menu -->
            <li><a href="#" title="Sales/Finance"><i class="fas fa-chart-pie"></i><span v-if="isSidebarOpen">Sales/Finance (Beta)</span></a></li>
            <li><a href="#" title="Planning"><i class="fas fa-project-diagram"></i><span v-if="isSidebarOpen">Planning (Beta)</span></a></li>
            <li><a href="#" title="Account Management"><i class="fas fa-users"></i><span v-if="isSidebarOpen">Account Management</span></a></li>
            <li><a href="#" title="Product"><i class="fas fa-box"></i><span v-if="isSidebarOpen">Product (Beta)</span></a></li>
            <li><a href="#" title="Executive"><i class="fas fa-user-tie"></i><span v-if="isSidebarOpen">Executive</span></a></li>
            <li><a href="#" title="Settings"><i class="fas fa-cogs"></i><span v-if="isSidebarOpen">Settings</span></a></li>
            <li @click="signOut"><a href="#" title="Signout"><i class="fas fa-sign-out-alt"></i><span v-if="isSidebarOpen">Signout</span></a></li>
          </ul>
        </nav>
      </aside>

      <div id="embed-title">
        <h2>{{ heading }}</h2>
        <div id="embed-container">
          <HomeDashboard :data="chartData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import HomeDashboard from './HomeDashboard.vue';
export default {
  components: { HomeDashboard },
  data() {
    return {
      showSubMenu: false,
      isSidebarOpen: false, // Control sidebar visibility
      heading: 'General Summary',
      chartData: [],
    };
  },
  methods: {
    toggleSubMenu() {
      this.showSubMenu = !this.showSubMenu;
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    signOut() {
      this.$router.push('/');
    },
    handleClickOutside(event) {
      const menuItem = this.$refs.generalMenuItem;
      const submenu = this.$refs.submenu;
      if (menuItem && submenu && !menuItem.contains(event.target) && !submenu.contains(event.target)) {
        this.showSubMenu = false;
      }
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
  async mounted() {
    try {
      console.log("Reached Vue");
      const response = await axios.get('http://localhost:3000/api/dashboard-data');
      console.log(response.data);
      this.chartData = response.data;
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600&display=swap');

body {
  font-family: 'Be Vietnam Pro', sans-serif;
}

.header {
  background-color: black;
  color: white;
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  align-items: center;
}

.logo img {
  height: 50px;
  width: 120px;
  margin-right: 15px;
}

.hamburger-menu {
  color: white;
  font-size: 24px;
  cursor: pointer;
  margin-right: 20px;
}

.menu ul {
  list-style-type: none;
  display: flex;
  margin: 0;
}

.menu ul li {
  margin-right: 20px;
}

.menu ul li a {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.menu ul li a i {
  margin-right: 10px;
}

.main-container {
  display: flex;
}

.sidebar {
  width: 275px;
  background-color: black;
  padding: 15px;
  padding-top: 5px;
  transition: width 0.3s ease;
}

.sidebar.collapsed {
  width: 30px;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  margin-bottom: 10px;
  position: relative;
}

.sidebar ul li a {
  display: block;
  padding: 10px;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.sidebar ul li a i {
  margin-right: 10px;
}

.sidebar ul li a span {
  white-space: nowrap;
}

.text,span {
  padding-left: 10%;
}

.sidebar ul li ul {
  position: absolute;
  left: 100%;
  top: 0;
  background-color: black;
  padding: 10px;
  width: 210px;
  z-index: 1000;
  display: block;
}

.sidebar ul li ul li {
  margin-bottom: 5px;
}

.sidebar ul li ul li a {
  padding: 8px 10px;
  white-space: nowrap;
}

.content {
  flex: 1;
  padding: 20px;
  background-color: #f0f2f5;
  text-align: center;
}

h3 {
  font-size: 24px;
  color: #333;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

@media (max-width: 768px) {
  .sidebar {
    width: 60px;
  }
  .sidebar ul li a {
    padding: 10px;
    justify-content: center;
  }
  .sidebar ul li a i {
    margin-right: 0;
  }
  .menu ul li {
    margin-right: 10px;
  }
}

#embed-container {
  width: 100%;
  height: 81.5vh;
}

#embed-title {
  width: 100%;
  padding-left: 20px;
}
</style>
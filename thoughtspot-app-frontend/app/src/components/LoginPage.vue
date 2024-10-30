<template>
  <div class="login-page">
    <div class="login-image" >
    </div>
    <div class="login-form">
      <div class="sign-in">
        <h2>Sign in</h2>
        <table>
        <tbody>
        <tr>
          <td><h4>Username  </h4></td>
          <td><input type="text" v-model="username" placeholder="Username" /></td>
        </tr>
        <tr>
          <td><h4>Password  </h4></td>
          <td><input type="password" v-model="password" placeholder="Password" /></td>  
        </tr>
        </tbody>
        </table>
        <button @click="login">Sign in</button>

        <div class="okta-login">
          <button @click="oktaLogin">Okta Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          username: this.username,
          password: this.password
        });
        localStorage.setItem('token', response.data.token);
        this.$router.push('/home');
      } catch (error) {
        alert('Invalid credentials');
      }
    },
    oktaLogin() {
      alert('Redirect to Okta login');
    },
  },
};
</script>

<style>
.login-page {
  display: flex;
  height: 100vh;
}

.login-image {
  flex: 2;
  background: url('D:\VisualStudioCode\BI Portal\POC\thoughtspot-app-frontend\app\src\assets\login_background.jpg') no-repeat center center;
  background-size: cover;
  /* clip-path: polygon(0 0, 75% 0, 65% 100%, 0% 100%); Creating the angled shape */
  position: relative;
}

.pentagon-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  clip-path: polygon(0 0, 100% 0, 75% 50%, 100% 100%, 0 100%); /* Pentagon shape */
}

.login-image .overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 255, 0.5); /* Blue transparent overlay */
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-image .overlay h2 {
  color: white;
  font-size: 48px;
  font-weight: bold;
}


.login-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 40px 40px 0px;
  max-width: 50%;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.sign-in {
  margin-left: 50px;
  margin-right: 125px;
}

.login-form h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.login-form input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  font-size: 16px;
  border-radius: 6px;
  border:None;
  background: #E8F0FE;
}

.login-form button {
  padding: 12px;
  background-color: #28a745;
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin-left: 30%;
  width: 100px;
  border-radius: 6px;
}

.login-form button:hover {
  background-color: #218838;
}

.okta-login {
  margin-top: 20px;
}

.okta-login button {
  width: 40%;
  padding: 7px;
  background-color: white;
  color: #0073c8;
  font-size: 16px;
  border: 1px solid #0073c8;
  cursor: pointer;
  border-radius: 6px;
}

.okta-login button:hover {
  background-color: #f8f9fa;
}

html, body {
  margin: 0px;
  font:"Be Vietnam Pro";
}

td {
  padding-right: 40px;
  padding-bottom: 7px;
}
</style>

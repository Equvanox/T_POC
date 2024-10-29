<template>
    <div class="hello">
      <h1>{{ msg }}</h1>
      <p>
        Welcome to your Vue.js App
      </p>
      <p>
        To get started, edit <code>src/components/HelloWorld.vue</code> and save to reload.
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HelloWorld',
    props: {
      msg: {
        type: String,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  h1, h2 {
    font-weight: normal;
  }
  
  p {
    font-size: 16px;
  }
  
  code {
    background-color: #f9f9f9;
    padding: 2px 4px;
    border-radius: 4px;
  }
  </style>
  
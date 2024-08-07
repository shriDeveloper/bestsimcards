<!-- components/Banner.vue -->
<template>
    <div class="banner d-flex flex-column justify-content-center align-items-center">
      <h1>Stay Connected Anywhere in the World</h1>
      <p>Experience seamless internet connectivity with our global eSIM solutions.</p>
      <nuxt-link target="_blank" to="https://simcorner.com" class="btn btn-lg" style="background-color: #ff7a00;color: white;">Get Your eSIM Now</nuxt-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Banner'
  }
  </script>
  
  <style scoped>
  .banner {
    background-color: whitesmoke;
    background-size: cover;
    background-position: center;
    padding: 100px 0;
    color: black;
    text-align: center;
  }
  .banner h1 {
    font-size: 3rem;
    font-weight: bold;
  }
  .banner p {
    font-size: 1.25rem;
    margin: 20px 0;
  }
  .banner .btn {
    font-size: 1rem;
    padding: 15px 30px;
  }
  @media (max-width: 768px) {
    .banner {
      padding: 50px 0;
    }
    .banner h1 {
      font-size: 2rem;
    }
    .banner p {
      font-size: 1rem;
    }
  }
  </style>
  
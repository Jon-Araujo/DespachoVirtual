<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App'
});
</script>

<style lang="scss">
  html {
    height: 100%;
    width: 100%;
  }
  body {
    height: 100%;
    width: 100%;
    background-image: url('../public/25blog.png');
    background-repeat: no-repeat;
    background-size: cover;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    margin: 0;
    h1 {
      font-size: 2rem;
    }
  }
</style>

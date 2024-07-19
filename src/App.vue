<!-- src/App.vue -->
<template>
  <div id="app">
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script setup></script>

<style>
/* Add your styles here */
</style>

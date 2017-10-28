<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html, body, #app {
  width: 100%;
  height: 100%;
}
body {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  margin: 0;
  padding: 0;
}
a {
  display: block;
  text-decoration: none;
  color: inherit;
  cursor: default;
}
</style>

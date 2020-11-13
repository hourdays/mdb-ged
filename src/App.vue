<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <img alt="Vue logo" src="./assets/mdb_logo.jpg" style="width:20%;">
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <GedImages />
    <GedPDFs />
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import GedImages from './components/GED_images.vue'
import GedPDFs from './components/GED_PDFs.vue'
/*
export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
*/
export default {
  name: 'App',
  components: {
    GedImages,
    GedPDFs
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

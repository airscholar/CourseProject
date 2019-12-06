<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Course Project</a>
    </nav>
    <Shortener />
  </div>
</template>

<script>
import Shortener from "./components/Shortener.vue";
// import StatsModal from "./components/ShortenerStats.vue";


export default {
  name: "App",
  components: {
    Shortener
    // StatsModal
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

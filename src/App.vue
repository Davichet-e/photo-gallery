<template>
  <div id="app">
    <nav-bar />
    <transition name="slide" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script lang="ts">
import NavBar from "./components/NavBar.vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default { components: { NavBar } };
</script>

<style>
a {
  color: whitesmoke;
}

.border {
  border: 5px solid black;
}

/* Animations */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 1s, transform 1s;
}

.slide-enter, .slide-leave-to /* .slide-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-30%);
}

body {
  /* font-family: "Josefin Sans", sans-serif; */
  background-color: #141414 !important;
}
</style>

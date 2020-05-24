<template>
  <div id="app">
    <nav-bar />
    <transition name="slide" mode="out-in">
      <router-view :key="$route.path" />
    </transition>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: { NavBar },
  created() {
    this.$store.dispatch("auth/authUser");
  }
};
</script>

<style>
a {
  color: whitesmoke;
}

a:hover {
  color: cadetblue;
}

.border {
  border: 5px solid black;
}

/* Animations */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 1s, transform 1s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}

body {
  /* font-family: "Josefin Sans", sans-serif; */
  background-color: #292828 !important;
}
</style>

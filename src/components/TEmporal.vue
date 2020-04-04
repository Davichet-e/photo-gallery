<template>
  <div id="app">
    <h4>LOGIN</h4>
    <hr style="position: relative; top: 40px; color: #7E55F3; width: 90%" />
    <!-- <NavBar /> -->
    <!-- <section id="page">
      <header>Header</header>
      <aside class="side-1">Side 1</aside>
      <main>Main area</main>
      <aside class="side-2">Side 2</aside>
      <footer>Footer</footer>
    </section>-->
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/new">New</router-link>|
    </div>
    <router-view />-->
  </div>
</template>

<script>
// import NavBar from "@/components/NavBar.vue";
export default {
  // components: { NavBar }
};
</script>

<style>
* {
  box-sizing: border-box;
}
/* 
body {
  padding: 0;
  margin: 0;
  border: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #547494;
} */
body {
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-content: center;
  background-image: url("https:///marvel-live.freetls.fastly.net/canvas/2020/2/3873225776594ff7aa5442658a7d4db8?quality=95&fake=.png");
  background-position-y: -150px;
  background-size: cover;
}

#app {
  background-color: rgba(45, 45, 45, 0.85);
  width: 450px;
  height: 600px;
  border-radius: 25px;
  margin-top: 25px;
  text-align: center;
}
#app > h4 {
  color: #b3b3b3;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 35px;
  font-weight: 400;
  margin-bottom: 0px;
}
</style>

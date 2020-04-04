<template>
  <nav class="navbar">
    <span
      class="navbar-toggle"
      id="js-navbar-toggle"
      @click="isClicked = !isClicked"
    >
      <img src="../assets/bars-solid.svg" height="25px" />
    </span>
    <div class="logo-search">
      <a href="#" class="logo">logo</a>
      <form class="search" action>
        <input type="search" placeholder="Search here..." required />
        <button v-if="!isMobile" type="submit">Search</button>
      </form>
    </div>
    <ul :class="['main-nav', { active: isClicked }]" id="js-menu">
      <li>
        <a href="#" class="nav-links">
          <img
            src="https://marvel-live.freetls.fastly.net/canvas/2020/3/9d8776ef343b49079e13d2c9dc821fe8?quality=95&fake=.png"
            alt="trending"
            height="50px"
          />
        </a>
      </li>
      <li>
        <a href="#" class="nav-links">
          <img src="../assets/three-dots.svg" alt="More..." height="40px" />
          <!-- <figure class="img-fig">
             <img
              src="https://marvel-live.freetls.fastly.net/canvas/2020/2/cb78b9b6e3b24adbbe611acaa0ec9ae7?quality=95&fake=.png"
              alt="trending"
              height="50px"
              vertical-align
            
            <figcaption>More</figcaption>
          </figure>-->
        </a>
      </li>
      <li>
        <a href="#" class="nav-links">Login</a>
      </li>
      <li>
        <a href="#" class="nav-links sign-up">Sign Up</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return { isClicked: false, isMobile: window.innerWidth <= 768 };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

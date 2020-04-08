<template>
  <div>
    <div id="wrap">
      <h1>Name</h1>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, quaerat?</p>
      <b-icon-people-circle variant="light" class="h1" scale="2"></b-icon-people-circle>
      <ul class="bottom-line">
        <li>
          <ul class="bottom-line-left"></ul>
        </li>
        <li>
          <ul class="bottom-line-center">
            <li>
              <a href="#">
                <b-icon-arrow-bar-up></b-icon-arrow-bar-up>
              </a>
            </li>
            <li>
              <a href="#">
                <b-icon-heart-fill></b-icon-heart-fill>
              </a>
            </li>
            <li>
              <a href="#">
                <b-icon-person-plus></b-icon-person-plus>
              </a>
            </li>
            <li>
              <a href="#">
                <b-icon-download></b-icon-download>
              </a>
            </li>
          </ul>
        </li>
        <li>
          <ul class="bottom-line-right"></ul>
        </li>
      </ul>
    </div>
    <b-nav pills class="mx-4 border border-secondary rounded-bottom">
      <b-nav-item @click="handleActive('photos')" :active="active === 'photos'">Photos</b-nav-item>
      <b-nav-item @click="handleActive('about')" :active="active === 'about'">About Me</b-nav-item>
      <b-nav-item-dropdown
        id="my-nav-dropdown"
        text="Sort by"
        toggle-class="nav-link-custom"
        center
      >
        <b-dropdown-item>Most Recents</b-dropdown-item>
        <b-dropdown-item>Most Popular</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>
    <div class="gallery-container">
      <b-overlay v-for="(image, i) in images" :key="i" :show="loaded < 2" rounded="sm">
        <a href="#" class="item">
          <img :src="image" alt="image" @load="loaded++" />
        </a>
      </b-overlay>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";

@Component
export default class Profile extends Vue {
  loaded = 0;
  active = "photos";
  handleActive(id: string) {
    this.active = id;
  }

  images: Array<string> = [
    "https://picsum.photos/3000/1700",
    "https://picsum.photos/3000/1500",
    "https://picsum.photos/3000/1600",
    "https://picsum.photos/3000/1700",
    "https://picsum.photos/3200/1700",
    "https://picsum.photos/3000/1702",
    "https://picsum.photos/3000/1100",
    "https://picsum.photos/3000/1300"
  ];
}
</script>

<style scoped>
[class|="bottom-line"] {
  padding: 0;
  margin-top: auto;
  list-style: none;
  display: flex;
}
.bottom-line {
  width: 100vw;
  justify-content: space-between;
}
li {
  color: antiquewhite;
  margin: 0px 10px 0px 10px;
}
p {
  margin-bottom: 40px;
  color: rgb(23, 49, 40);
}
a:hover {
  color: rgb(83, 83, 83);
}
#wrap {
  height: 300px;
  width: 100vw;
  background-image: url("https://picsum.photos/2000/1000/?blur=10");
  background-color: black;
  opacity: 0.7;
  background-position: center;

  display: flex;
  flex-direction: column;
  align-items: center;
}
h1 {
  font-style: bold;
  color: white;
}
.gallery-container {
  display: grid;
  margin: 35px;
  grid-auto-rows: 300px;
  grid-template-columns: 300px;
  grid-gap: 1rem;
  grid-auto-flow: row dense;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media all and (min-width: 320px) {
  #wrap ~ .gallery-container {
    grid-template-columns: 1fr;
  }
}

@media all and (min-width: 768px) {
  #wrap ~ .gallery-container {
    grid-template-columns: 1fr 1fr;
  }
}

@media all and (min-width: 1024px) {
  #wrap ~ .gallery-container {
    grid-template-columns: repeat(3, 1fr);
  }

  .gallery-container *:nth-child(11n + 1) {
    grid-column: span 1;
  }

  .gallery-container *:nth-child(11n + 4) {
    grid-column: span 2;
    grid-row: span 1;
  }

  .gallery-container *:nth-child(11n + 6) {
    grid-column: span 3;
    grid-row: span 1;
  }

  .gallery-container *:nth-child(11n + 7) {
    grid-column: span 1;
    grid-row: span 2;
  }

  .gallery-container *:nth-child(11n + 8) {
    grid-column: span 2;
    grid-row: span 2;
  }

  .gallery-container *:nth-child(11n + 9) {
    grid-row: span 3;
  }
}
</style>
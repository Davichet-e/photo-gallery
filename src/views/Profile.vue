<template>
  <div>
    <div id="profile">
      <h1>{{ data.name }}</h1>
      <p>{{ data.description }}</p>
      <b-icon-people-circle
        variant="dark"
        class="h1"
        scale="2"
      ></b-icon-people-circle>
      <b-row class="w-100 mt-auto">
        <b-col></b-col>
        <b-col class="d-flex justify-content-center">
          <div class="mx-3" v-b-tooltip.hover="'Images uploaded'">
            <b-icon-card-image class="mr-1"></b-icon-card-image>
            <small>{{ data.imagesUploaded }}</small>
          </div>

          <div class="mx-3" v-b-tooltip.hover="'Downloads'">
            <b-icon-download class="mr-1"></b-icon-download>
            <small>{{ data.downloads }}</small>
          </div>

          <div class="mx-3" v-b-tooltip.hover="'Comments'">
            <b-icon-chat-dots-fill class="mr-1"></b-icon-chat-dots-fill>
            <small>{{ data.comments }}</small>
          </div>

          <div class="mx-3" v-b-tooltip.hover="'Followers'">
            <b-icon-people-fill class="mr-1"></b-icon-people-fill>
            <small>{{ data.followers }}</small>
          </div>
        </b-col>
        <b-col class="d-flex flex-row-reverse mb-3 mr-3">
          <b-button pill size="sm" variant="success" class="ml-2"
            >Donate</b-button
          >
          <b-button pill size="sm" variant="info">Follow</b-button>
        </b-col>
      </b-row>
    </div>
    <b-nav
      tabs
      pills
      align="center"
      class="mx-4 pt-2 border border-top-0 border-secondary rounded-bottom"
    >
      <b-nav-item
        @click="handleActive('popular')"
        :active="active === 'popular'"
        >Most Popular</b-nav-item
      >
      <b-nav-item @click="handleActive('recent')" :active="active === 'recent'"
        >Most Recent</b-nav-item
      >
      <b-nav-item @click="handleActive('about')" :active="active === 'about'"
        >About Me</b-nav-item
      >
    </b-nav>
    <div class="gallery-container">
      <b-overlay
        v-for="(image, i) in images"
        :key="i"
        :show="loaded < 2"
        rounded="sm"
      >
        <router-link :to="'/images/' + i" class="item">
          <img :src="image" alt="image" @load="loaded++" />
        </router-link>
      </b-overlay>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";

@Component
export default class Profile extends Vue {
  // Faked data
  data = {
    name: "Turno",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, quaerat?",
    followers: Math.floor(Math.random() * 10000),
    imagesUploaded: Math.floor(Math.random() * 10000),
    downloads: Math.floor(Math.random() * 10000),
    comments: Math.floor(Math.random() * 10000)
  };
  loaded = 0;
  active = "popular";
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
b-column a {
  color: teal;
}
.nav-link {
  color: whitesmoke;
}
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
#profile {
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
  color: rgb(23, 49, 40);
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
  #profile ~ .gallery-container {
    grid-template-columns: 1fr;
  }
}

@media all and (min-width: 768px) {
  #profile ~ .gallery-container {
    grid-template-columns: 1fr 1fr;
  }
}

@media all and (min-width: 1024px) {
  #profile ~ .gallery-container {
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

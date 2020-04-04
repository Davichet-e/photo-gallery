<template>
  <div id="wrap">
    <b-nav pills class="mx-4 border border-secondary rounded">
      <b-nav-item @click="handleActive('Photos')" :active="active === 'Photos'">Photos</b-nav-item>
      <b-nav-item @click="handleActive('Users')" :active="active === 'Users'">Users</b-nav-item>
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
    <section>
      <a href="#">Next ></a>
    </section>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";

@Component
export default class New extends Vue {
  loaded = 0;
  active = "Photos";
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
section {
  text-align: right;
  margin: 35px;
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
  #wrap > .gallery-container {
    grid-template-columns: 1fr;
  }
}

@media all and (min-width: 768px) {
  #wrap > .gallery-container {
    grid-template-columns: 1fr 1fr;
  }
}

@media all and (min-width: 1024px) {
  #wrap > .gallery-container {
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

<template>
  <div id="wrap">
    <b-nav tabs fill class="mx-4 rounded">
      <b-nav-item
        class="border-left border-bottom rounded-left"
        @click="handleActive('photos')"
        :active="active === 'photos'"
      >Photos</b-nav-item>
      <b-nav-item
        class="border-bottom"
        @click="handleActive('users')"
        :active="active === 'users'"
        active-class="active"
      >Users</b-nav-item>
      <b-nav-item-dropdown
        class="border-bottom border-right rounded-right"
        id="my-nav-dropdown"
        text="Sort by"
        toggle-class="nav-link-custom"
        center
      >
        <b-dropdown-item
          @click="sortingBy = 'recents'"
          :active="sortingBy === 'recents'"
        >Most Recents</b-dropdown-item>
        <b-dropdown-item
          @click="sortingBy = 'popular'"
          :active="sortingBy === 'popular'"
        >Most Popular</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>
    <div :class="active === 'photos' ? 'gallery-container' : 'users-container'">
      <b-overlay v-for="(image, i) in images" :key="i" :show="loaded < 2" rounded="sm">
        <a v-show="active === 'photos'" href="#" class="item">
          <img :src="image" alt="image" @load="loaded++" />
        </a>

        <b-card
          v-show="active === 'users'"
          :title="'User' + i"
          overlay
          :img-src="image"
          img-alt="Image"
          tag="article"
          class="mb-2"
        >
          <div class="card-img-overlay d-flex flex-column">
            <div class="mt-auto">{{ Math.floor(Math.random() * 100) }} photos uploaded</div>
          </div>
        </b-card>
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
  sortingBy = "recents";
  loaded = 0;
  active = "photos";
  handleActive(id: string) {
    this.active = id;
  }

  get images(): Array<string> {
    return this.active === "photos"
      ? [
          "", // "https://picsum.photos/3000/1700"
          "", // "https://picsum.photos/3000/1500"
          "", // "https://picsum.photos/3000/1600"
          "", // "https://picsum.photos/3000/1700"
          "", // "https://picsum.photos/3200/1700"
          "", // "https://picsum.photos/3000/1702"
          "", // "https://picsum.photos/3000/1100"
          "" // "https://picsum.photos/3000/1300"
        ]
      : [
          "", //"https://picsum.photos/600/300/?image=25",
          "", //"https://picsum.photos/600/300/?image=24",
          "", //"https://picsum.photos/3000/1700",
          "", //"https://picsum.photos/3000/1500",
          "", //"https://picsum.photos/3000/1600",
          "", //"https://picsum.photos/3000/1700",
          "", //"https://picsum.photos/3200/1700",
          "", //"https://picsum.photos/3000/1702",
          "", //"https://picsum.photos/3000/1100",
          "" //"https://picsum.photos/3000/1300"
        ];
  }
}
</script>

<style scoped>
a {
  color: whitesmoke;
}

a:hover {
  color: rgb(104, 124, 120);
}

section {
  text-align: right;
  margin: 35px;
}

.users-container {
  display: grid;
  margin: 35px;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  grid-auto-flow: row dense;
}

.users-container article {
  height: 200px;
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
  #wrap > .gallery-container,
  #wrap > .users-container {
    grid-template-columns: 1fr;
  }
}

@media all and (min-width: 768px) {
  #wrap > .gallery-container,
  #wrap > .users-container {
    grid-template-columns: 1fr 1fr;
  }
}

@media all and (min-width: 1024px) {
  #wrap > .gallery-container {
    grid-template-columns: repeat(3, 1fr);
  }

  #wrap > .users-container {
    grid-template-columns: repeat(6, 1fr);
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

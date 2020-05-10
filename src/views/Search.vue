<template>
  <div id="search">
    <b-nav tabs fill class="mx-4 rounded">
      <b-nav-item
        class="border-left border-bottom rounded-left"
        @click="handleActive('photos')"
        :active="active === 'photos'"
      >
        Photos
      </b-nav-item>
      <b-nav-item
        class="border-bottom"
        @click="handleActive('users')"
        :active="active === 'users'"
        active-class="active"
      >
        Users
      </b-nav-item>
      <b-nav-item-dropdown
        class="border-bottom border-right rounded-right"
        text="Sort by"
        toggle-class="nav-link-custom"
        center
      >
        <b-dropdown-item
          to="search?order=recents"
          :active="sortingBy === 'recents'"
        >
          Most Recents
        </b-dropdown-item>
        <b-dropdown-item
          to="search?order=popular"
          :active="sortingBy === 'popular'"
        >
          Most Popular
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>
    <div :class="active === 'photos' ? 'gallery-container' : 'users-container'">
      <b-overlay
        v-for="(element, i) in activeElements"
        :key="i"
        :show="loaded < 2"
        rounded="sm"
      >
        <router-link
          v-show="active === 'photos'"
          :to="'/images/' + i"
          class="item"
        >
          <img :src="element" alt="image" @load="loaded++" />
        </router-link>

        <b-card
          v-show="active === 'users'"
          :title="'User' + i"
          overlay
          :img-src="element.profileImageUrl"
          img-alt="Image"
          tag="article"
          class="mb-2"
        >
          <div class="card-img-overlay d-flex flex-column">
            <div class="mt-auto">{{ element.followers }} photos uploaded</div>
          </div>
        </b-card>
      </b-overlay>
    </div>
    <section>
      <a href="#">Next ></a>
    </section>
    <h1>{{ users }}</h1>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";

@Component
export default class Search extends Vue {
  @Prop({ default: "recents" }) sortingBy!: string;

  loaded = 0;
  active = "photos";
  handleActive(id: string) {
    this.active = id;
  }
  users = [];

  get activeElements(): Array<string | object> {
    return this.active === "photos" ? this.images : this.users;
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
  #search > .gallery-container,
  #search > .users-container {
    grid-template-columns: 1fr;
  }
}

@media all and (min-width: 768px) {
  #search > .gallery-container,
  #search > .users-container {
    grid-template-columns: 1fr 1fr;
  }
}

@media all and (min-width: 1024px) {
  #search > .gallery-container {
    grid-template-columns: repeat(3, 1fr);
  }

  #search > .users-container {
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

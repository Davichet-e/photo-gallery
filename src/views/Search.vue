<template>
  <div id="search">
    <transition name="slide" mode="out-in">
      <div v-if="route === '/'">
        <b-carousel
          id="carousel-1"
          controls
          indicators
          background="#ababab"
          img-width="1024"
          img-height="480"
          style="text-shadow: 1px 1px 2px #333;"
        >
          <!-- Text slides with image -->
          <b-carousel-slide
            img-height="480"
            text="Your gallery"
            img-src="https://picsum.photos/1024/480/?image=52"
            ><h1>Welcome to Photos' Sea!</h1></b-carousel-slide
          >

          <!-- Slides with custom text -->
          <b-carousel-slide
            img-height="480"
            img-src="https://picsum.photos/1024/480/?image=54"
          >
            <h1>Photos' Sea!</h1>
          </b-carousel-slide>

          <!-- Slides with image only -->
          <b-carousel-slide
            img-height="480"
            img-src="https://picsum.photos/1024/480/?image=58"
            ><h1>Photos' Sea!</h1></b-carousel-slide
          >

          <!-- Slides with img slot -->
          <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
          <b-carousel-slide
            img-height="480"
            img-src="https://picsum.photos/1024/480/?image=55"
            ><h1>Photos' Sea!</h1>
          </b-carousel-slide>
        </b-carousel>
      </div>
      <h3 v-else-if="searchTag" class="search-tag-title my-3">
        Images with tag: {{ searchTag }}
      </h3>
    </transition>
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
        <b-dropdown-item to="?order=recents" :active="sortingBy === 'recents'">
          Most Recents
        </b-dropdown-item>
        <b-dropdown-item
          :to="{ query: { order: 'popular', searchTag: searchTag } }"
          :active="sortingBy === 'popular'"
        >
          Most Popular
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>
    <div :class="active === 'photos' ? 'gallery-container' : 'users-container'">
      <b-overlay
        v-for="element in elements"
        :key="element.id"
        :show="showOverlay"
        rounded="sm"
      >
        <router-link
          :to="(active === 'photos' ? '/images/' : '/profile/') + element.id"
          class="search-item"
        >
          <img
            v-show="active === 'photos'"
            :id="element.id"
            class="photo-image"
            src=""
            :alt="element.id"
            @error="updateImage"
            @load="loaded++"
          />

          <b-card
            v-show="active === 'users'"
            :title="element.username"
            overlay
            bg-variant="dark"
            :img-src="
              element.profilePicURL === '#' ? '' : element.profilePicURL
            "
            img-alt="Image"
            tag="article"
            class="mb-2"
          >
            <div class="card-img-overlay d-flex flex-column">
              <div class="mt-auto">
                {{ element.followers ? element.followers.lenght : 0 }} followers
              </div>
            </div>
          </b-card>
        </router-link>
      </b-overlay>
    </div>
    <section class="next-button">
      <a href="#">Next ></a>
    </section>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Mixins } from "vue-property-decorator";
import { mapState, mapGetters } from "vuex";
import {
  Image,
  orderImagesPopularity,
  orderImagesRecents
} from "../store/modules/images";
import { User, orderUsersPopularity } from "../store/modules/users";
import { ShowErrorMixin } from "@/mixins/showError";
import { Route, NavigationGuardNext } from "vue-router";

Component.registerHooks(["beforeRouteUpdate"]);

@Component({
  computed: {
    ...mapState("auth", ["authUser"]),
    ...mapState("user", ["users"]),
    ...mapGetters("image", ["getImageURL", "getPublicImagesWithTag"])
  }
})
export default class Search extends Mixins(ShowErrorMixin) {
  public users!: Array<User>;
  public authUser!: User | null;
  public getImageURL!: (id: string) => Promise<string>;
  public getPublicImagesWithTag!: (
    images: Image[],
    tagValue: string
  ) => Image[];
  @Prop({ default: "/", type: String }) route!: string;
  @Prop({ default: "recents", type: String }) sortingBy!: string;
  @Prop({ required: false, type: String }) searchTag!: string;

  images: Array<Image> = [];
  publicImages: Array<Image> = [];
  loaded = 0;
  active = "photos";
  imgsSrc: Record<string, string> = {};

  handleActive(id: string) {
    this.active = id;
  }

  created() {
    this.$store
      .dispatch("image/bindPublicImagesRef")
      .then(images => {
        this.publicImages = images;
        if (this.searchTag)
          this.images = this.getPublicImagesWithTag(images, this.searchTag);
        else this.images = images;
      })
      .then(() => {
        this.images.sort(orderImagesRecents).forEach(({ id }) => {
          this.getImageURL(id).then(url => (this.imgsSrc[id] = url));
        });
      })
      .catch(this.showError);
    this.$store.dispatch("user/bindUsersRef").catch(this.showError);
  }

  beforeRouteUpdate(to: Route, from: Route, next: NavigationGuardNext<Vue>) {
    const tag = to.query.searchTag;
    if (tag)
      this.images = this.getPublicImagesWithTag(this.images, tag as string);
    else this.images = this.publicImages;
    next();
  }

  get showOverlay() {
    return (
      this.active === "photos" &&
      this.loaded < Math.floor(this.images.length / 5)
    );
  }

  getImages() {
    return this.sortingBy === "popular"
      ? [...this.images].sort(orderImagesPopularity)
      : this.images;
  }

  getUsers() {
    return this.sortingBy === "popular"
      ? [...this.users].sort(orderUsersPopularity)
      : this.users;
  }

  get elements(): Array<Image | User> {
    if (this.images && this.users)
      return this.active === "photos" ? this.getImages() : this.getUsers();
    return [];
  }

  updateImage(t: Event) {
    const image = t.target as HTMLImageElement;
    image.src = this.imgsSrc[image.id] || "#";
  }
}
</script>

<style scoped>
.next-button {
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
.search-item:hover {
  color: teal;
}

.search-tag-title {
  text-align: center;
  color: azure;
}

.carousel-item {
  height: 300px;
}

.photo-image,
.card-img {
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

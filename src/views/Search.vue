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
        v-for="element in elements"
        :key="element.id"
        :show="loaded < Math.floor(elements.length / 5)"
        rounded="sm"
      >
        <router-link
          :to="(active === 'photos' ? '/images/' : '/profile/') + element.id"
          class="search-item"
        >
          <img
            v-show="active === 'photos'"
            :id="element.id"
            src=""
            alt="image"
            @error="updateImage"
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
    <section>
      <a href="#">Next ></a>
    </section>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { mapState, mapGetters } from "vuex";
import {
  Image,
  orderImagesPopularity,
  orderImagesRecents
} from "../store/modules/images";
import { User, orderUsersPopularity } from "../store/modules/users";

@Component({
  computed: {
    ...mapState("image", ["images"]),
    ...mapState("auth", ["authUser"]),
    ...mapState("user", ["users"]),
    ...mapGetters("image", ["getImageURL"])
  }
})
export default class Search extends Vue {
  public images!: Array<Image>;
  public users!: Array<User>;
  public authUser!: User | null;
  public getImageURL!: (id: string) => Promise<string>;
  @Prop({ default: "recents", type: String }) sortingBy!: string;

  loaded = 30;
  active = "photos";
  imgsSrc!: Record<string, string>;

  handleActive(id: string) {
    this.active = id;
  }

  created() {
    this.imgsSrc = {};
    this.$store
      .dispatch("image/bindPublicImagesRef")
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .then(() => {
        this.images.forEach(({ id }) => {
          this.getImageURL(id).then(url => (this.imgsSrc[id] = url));
        });
      })
      .catch(this.showError);
    this.$store.dispatch("user/bindUsersRef").catch(this.showError);
  }

  getImages() {
    const method =
      this.sortingBy === "recents" ? orderImagesRecents : orderImagesPopularity;
    return this.images.slice().sort(method);
  }

  getUsers() {
    return this.sortingBy === "popular"
      ? this.users.slice().sort(orderUsersPopularity)
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
  showError(error: Error, variant = "danger") {
    this.$bvToast.toast(error.message, {
      title: "Auth error",
      variant: variant,
      solid: true,
      autoHideDelay: 2000
    });
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
.search-item:hover {
  color: teal;
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

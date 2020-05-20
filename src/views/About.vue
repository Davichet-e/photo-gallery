<template>
  <div class="about">
    <b-nav tabs fill class="mx-4 rounded" small>
      <b-button
        v-b-modal.upload-modal
        v-b-tooltip.bottom="'Upload photo'"
        variant="info"
      >
        <b-icon-camera></b-icon-camera>
      </b-button>
      <b-button
        v-b-modal.manage-tags
        v-b-tooltip.bottom="'Manage tags'"
        @click="setManageTags"
        variant="success"
      >
        <b-icon-tag></b-icon-tag>
      </b-button>
      <b-nav-item
        class="border-left border-bottom rounded-left"
        :active="route === 'myphotos'"
        to="/about/myphotos"
        >My Photos</b-nav-item
      >

      <b-nav-item
        class="border-bottom"
        :active="route === 'following'"
        to="/about/following"
        >Following</b-nav-item
      >
      <b-nav-item
        class="border-right border-bottom rounded-right"
        :active="route === 'settings'"
        to="/about/settings"
        >Settings</b-nav-item
      >
    </b-nav>
    <div
      :class="{
        'gallery-container': route === 'myphotos',
        'users-container': route === 'following'
      }"
    >
      <b-overlay
        v-for="(item, i) in items"
        :key="i"
        :show="route !== 'settings' && loaded < Math.floor(items.length / 5)"
        rounded="sm"
      >
        <router-link
          v-show="route === 'myphotos' || route === 'following'"
          :to="(route === 'myphotos' ? '/images/' : '/profile/') + item.id"
          class="item"
        >
          <img
            :id="item.id"
            class="gallery-image"
            v-show="route === 'myphotos'"
            src=""
            alt="image"
            @error="updateImg"
          />
          <b-card
            v-show="route === 'following'"
            :title="item.username"
            :overlay="item.profilePicURL !== '#'"
            bg-variant="dark"
            :img-src="item.profilePicURL === '#' ? '' : item.profilePicURL"
            img-alt="Image"
            tag="article"
            class="mb-2"
          >
            <div class="card-img-overlay d-flex flex-column">
              <div class="mt-auto">
                {{ Math.floor(Math.random() * 100) }} photos uploaded
              </div>
            </div>
          </b-card>
        </router-link>
      </b-overlay>
    </div>
    <!-- Upload Modal -->
    <b-modal
      id="upload-modal"
      class="rounded"
      header-bg-variant="dark"
      header-text-variant="light"
      body-bg-variant="dark"
      body-text-variant="light"
      footer-bg-variant="dark"
      centered
      title="Upload photo"
      @ok="handleUpload"
      footer-text-variant="secondary"
    >
      <b-form>
        <b-input
          required
          class="my-3"
          placeholder="Title"
          v-model="title"
        ></b-input>
        <b-textarea
          required
          class="my-2"
          placeholder="Description"
          v-model="description"
        ></b-textarea>
        <b-file
          id="file-input"
          class="my-4"
          v-model="file"
          accept="image/*"
        ></b-file>
      </b-form>
      <p class="mb-4 constraints-text">
        The file must have 2000px at his minimum side
      </p>

      <p class="tags-text">Select #tags:</p>

      <div class="modal-tags">
        <b-badge
          v-for="{ value, id } of tags"
          :key="id"
          @click="handleActivate(id)"
          class="mx-2 mt-2"
          :variant="tagsSelected[id] ? 'success' : 'secondary'"
          >{{ value }}</b-badge
        >
        <b-badge class="mx-2 mt-2" variant="info">
          <!-- TODO -->
          <b-icon-plus></b-icon-plus>
        </b-badge>
      </div>

      <template v-slot:modal-footer="{ ok }">
        <p class="tags-text mr-auto">
          By uploading it you accept our
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            >Terms and Conditions</a
          >
        </p>

        <b-button size="sm" variant="success" @click="ok()">Upload</b-button>
      </template>
    </b-modal>
    <!-- Manage tags Modal -->
    <b-modal
      id="manage-tags"
      class="rounded"
      header-bg-variant="dark"
      header-text-variant="light"
      body-bg-variant="dark"
      body-text-variant="light"
      footer-bg-variant="dark"
      centered
      title="Manage tags"
      @ok="manageTags"
      footer-text-variant="secondary"
      ok-title="Save"
      ok-variant="success"
      ok-only
    >
      <div class="modal-tags">
        <b-badge
          v-for="tag of manageTags"
          :key="tag.id"
          @click="removeTag(tag)"
          class="editable-tag"
          >{{ tag.value }}</b-badge
        >
        <b-badge class="mx-2 mt-2" variant="info">
          <b-icon-plus></b-icon-plus>
        </b-badge>
      </div>

      <b-form inline size="sm" class="mt-3 w-100" @submit.prevent="addTag">
        <b-input
          size="sm"
          v-model="addTagText"
          placeholder="Add Tags..."
        ></b-input>
        <b-btn type="submit" variant="info" size="sm">Add</b-btn>
      </b-form>
    </b-modal>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Vue, Prop } from "vue-property-decorator";
import { mapState, mapGetters } from "vuex";
import { Image, FirestoreRef } from "../store/modules/images";
import { User } from "../store/modules/users";
import { firestore } from "firebase/app";
import { Tag } from "../store/modules/tags";
import { db } from "../firebase";

@Component({
  computed: {
    ...mapState("auth", ["authUser"]),
    ...mapState("tag", ["tags"]),
    ...mapGetters("image", [
      "getImagesOfUser",
      "getImageURL",
      "numberOfImagesOfUser"
    ]),
    ...mapGetters("auth", ["userReference"]),
    ...mapGetters("user", ["usersFollowedBy"])
  }
})
export default class About extends Vue {
  @Prop({ default: "myphotos" }) route!: string;
  public authUser!: User | null;
  public userReference!: FirestoreRef | null;
  public tags!: Array<Tag>;
  public getImagesOfUser!: (id: string) => Array<Image>;
  public getImageURL!: (id: string) => Promise<string>;
  public numberOfImagesOfUser!: (id: string) => number;
  public usersFollowedBy!: (id: string) => Array<User>;

  loaded = 30;
  followingUsers: Array<User> = [];
  manageTags: Array<Tag> = [];
  addTagText = "";
  tagsSelected: Record<string, boolean> = {};
  file: File | null = null;
  images: Array<Image> = [];
  imgsSrc: Record<string, string> = {};
  tagsToAdd: Array<Tag> = [];
  title = "";
  description = "";
  imagesSrc!: Record<string, string>;
  image!: string;

  created() {
    this.$store
      .dispatch("user/bindUsersRef")
      .then(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        () => (this.followingUsers = this.usersFollowedBy(this.authUser!.id))
      )
      .catch(this.showError);

    this.$store
      .dispatch("tag/bindTagsRef")
      .then(() => {
        this.tags.forEach(({ id }) => (this.tagsSelected[id] = false));
      })
      .catch(this.showError);

    this.$store
      .dispatch("image/bindImagesRef")
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .then(() => this.getImagesOfUser(this.authUser!.id!))
      .then(images => {
        this.images = images;
        images.forEach(({ id }) => {
          this.getImageURL(id).then(url => (this.imgsSrc[id] = url));
        });
      })
      .catch(this.showError);
  }

  get getImages() {
    return this.images;
  }

  get following() {
    return this.authUser ? this.followingUsers : [];
  }

  get items() {
    return this.route === "myphotos" ? this.getImages : this.following;
  }

  showError(error: Error, variant = "danger") {
    this.$bvToast.toast(error.message, {
      title: "Auth error",
      variant: variant,
      solid: true,
      autoHideDelay: 2000
    });
  }

  addTag() {
    this.$store.dispatch("tag/addTag", this.addTagText);
  }

  removeTag(tag: Tag) {
    this.manageTags.splice(this.manageTags.indexOf(tag), 1);
  }

  setManageTags() {
    this.manageTags = this.tags.slice();
  }

  updateImg(t: Event) {
    const image = t.target as HTMLImageElement;
    image.src = this.imgsSrc[image.id] || "#";
  }

  handleManageTags() {
    // this.$store.dispatch()
  }

  handleActivate(tag: string) {
    if (this.tagsSelected[tag]) {
      this.tagsSelected[tag] = false;
    } else {
      this.tagsSelected[tag] = true;
    }
  }

  handleUpload() {
    const tags: Array<FirestoreRef> = [];
    for (const { id } of this.tags) {
      if (this.tagsSelected[id]) {
        tags.push(db.collection("tags").doc(id));
        this.tagsSelected[id] = false;
      }
    }
    if (this.userReference && this.authUser) {
      if (this.numberOfImagesOfUser(this.authUser.id) <= 50) {
        this.$store
          .dispatch("image/addPhoto", {
            image: {
              author: this.userReference,
              title: this.title,
              description: this.description,
              date: firestore.Timestamp.now(),
              comments: [],
              tags,
              likes: 0,
              dislikes: 0
            },
            file: this.file
          })
          .then(() => this.$router.go(0));
      } else
        this.showError(new Error("You have reached the photo upload limit."));
    }
  }
}
</script>

<style scoped>
.modal-tags {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 5px;
}

.constraints-text {
  font-size: 13px;
  color: grey;
}

.tags-text {
  color: #bbbec0;
  font-size: 13px;
  margin-bottom: 3px;
}

div > span:hover {
  cursor: pointer;
}

.settings-header {
  text-align: center;
  color: peru;
}

.editable-tag {
  margin: 0.5em 0.5em 0 0.5em;
}

.editable-tag:hover {
  background-color: brown;
}

.users-container {
  display: grid;
  margin: 35px;
  grid-template-columns: repeat(6, 1fr);
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
  #about > .gallery-container,
  #about > .users-container {
    grid-template-columns: 1fr;
  }
}

@media all and (min-width: 768px) {
  #about > .gallery-container,
  #about > .users-container {
    grid-template-columns: 1fr 1fr;
  }
}

@media all and (min-width: 1024px) {
  #about > .gallery-container {
    grid-template-columns: repeat(3, 1fr);
  }

  #about > .users-container {
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

<template>
  <div class="about">
    <b-nav tabs fill class="mx-4 rounded" small>
      <b-button v-b-modal.upload-modal v-b-tooltip.bottom="'Upload photo'" variant="info">
        <b-icon-camera></b-icon-camera>
      </b-button>
      <b-button v-b-modal.modal- v-b-tooltip.bottom="'Edit photos'" variant="success">
        <b-icon-pencil></b-icon-pencil>
      </b-button>

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
        ok-title="Upload"
        ok-only
        footer-text-variant="secondary"
      >
        <b-form>
          <b-file v-model="file" accept="image/*" id="file-input"></b-file>
        </b-form>
        <p class="mb-4 constraints-text">The file must have 2000px at his minimum side</p>

        <p class="tags-text">Select #tags:</p>

        <div class="modal-tags">
          <b-badge
            v-for="(_i, tag) in tags"
            :key="tag"
            @click="handleActivate(tag)"
            class="mx-2 mt-2"
            :variant="tags[tag] ? 'success' : 'secondary'"
          >{{ tag }}</b-badge>
          <b-badge @click="addTag" class="mx-2 mt-2" variant="info">
            <!-- TODO -->
            <b-icon-plus></b-icon-plus>
          </b-badge>
        </div>

        <template v-slot:modal-footer="{ ok }">
          <p class="tags-text mr-auto">
            By uploading it you accept our
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            >Terms and Conditions</a>
          </p>

          <b-button size="sm" variant="success" @click="ok()">Upload</b-button>
        </template>
      </b-modal>

      <b-nav-item
        class="border-left border-bottom rounded-left"
        @click="handleActive('myphotos')"
        :active="active === 'myphotos'"
        to="/about/myphotos"
      >My Photos</b-nav-item>

      <b-nav-item
        class="border-bottom"
        @click="handleActive('following')"
        :active="active === 'following'"
        to="/about/following"
      >Following</b-nav-item>
      <b-nav-item
        class="border-right border-bottom rounded-right"
        @click="handleActive('settings')"
        :active="active === 'settings'"
        to="/about/settings"
      >Settings</b-nav-item>
    </b-nav>
    <div
      :class="{'gallery-container': active === 'myphotos', 'users-container': active === 'following'}"
    >
      <b-overlay v-for="(image, i) in images" :key="i" :show="loaded < 2" rounded="sm">
        <router-link
          v-show="active === 'myphotos' || active === 'following'"
          :to="active === 'myphotos' ? '/images/' + i : '/profile'"
          class="item"
        >
          <img v-show="active === 'myphotos'" :src="image" alt="image" @load="loaded++" />
          <b-card
            v-show="active === 'following'"
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
        </router-link>
      </b-overlay>
      <h1 v-show="active === 'settings'" style="text-align: center; color: peru">HOLA GUAPETONA</h1>
    </div>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";

import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class About extends Vue {
  @Prop({ default: "myphotos" }) readonly route!: string;

  loaded = 0;
  file: File | null = null;
  active = this.route;
  tags: Record<string, boolean> = {
    dark: false,
    white: false,
    christmas: false,
    love: false,
    trending: false,
    chulipuni: false
  };
  images = [
    "https://picsum.photos/3000/1700",
    "https://picsum.photos/3000/1500",
    "https://picsum.photos/3000/1600",
    "https://picsum.photos/3000/1700",
    "https://picsum.photos/3200/1700",
    "https://picsum.photos/3000/1702",
    "https://picsum.photos/3000/1100",
    "https://picsum.photos/3000/1300"
  ];

  handleActivate(tag: string) {
    if (this.tags[tag]) {
      this.tags[tag] = false;
    } else {
      this.tags[tag] = true;
    }
  }

  handleUpload(/* _bvModalEvt: BvModalEvent*/) {
    for (const tag in this.tags) this.tags[tag] = false;
  }

  handleActive(id: string) {

    this.active = id;
  }

  addTag() {
    // TODO
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

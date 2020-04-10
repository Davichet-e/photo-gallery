<template>
  <div class="about">
    <b-nav tabs fill class="mx-4 rounded">
      <b-button v-b-modal.modal-center v-b-tooltip.bottom="'Upload photo'" variant="success">
        <b-icon-camera></b-icon-camera>
      </b-button>

      <b-modal
        id="modal-center"
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
            @click="handleActivate(tag)"
            :key="tag"
            :variant="tags[tag] ? 'success': 'secondary'"
          >{{ tag }}</b-badge>
        </div>

        <template v-slot:modal-footer="{ ok }">
          <p class="tags-text mr-auto">
            By uploading it you accept our
            <a href="#">Terms and Conditions</a>
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
        class="border-right border-bottom rounded-right"
        @click="handleActive('settings')"
        :active="active === 'settings'"
        to="/about/settings"
      >Settings</b-nav-item>
    </b-nav>
    <div :class="active ==='myphotos' ? 'gallery-container' : ''">
      <b-overlay v-for="(image, i) in images" :key="i" :show="loaded < 2" rounded="sm">
        <a v-show="active === 'myphotos'" href="#" class="item">
          <img :src="image" alt="image" @load="loaded++" />
        </a>
      </b-overlay>
      <h1 v-show="active === 'settings'" style="text-align: center; color: peru">HOLA GUAPETONA</h1>
    </div>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";

import { Component, Vue, Prop } from "vue-property-decorator";
import { BvModalEvent } from "bootstrap-vue";

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

  handleUpload(_bvModalEvt: BvModalEvent) {
    console.log(
      Object.entries(this.tags).forEach(([key, value]) => {
        if (value) console.log(key);
      })
    );
    console.log(this.file);

    for (const tag in this.tags) this.tags[tag] = false;
  }

  handleActive(id: string) {
    console.log(this.route);

    this.active = id;
  }
}
</script>

<style scoped>
div.modal-tags {
  display: flex;
  justify-content: space-evenly;
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

a {
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

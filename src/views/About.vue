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
        v-for="item in items"
        :key="item.id"
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
            :alt="item.id"
            @error="updateImg"
            @load="loaded++"
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
      footer-text-variant="secondary"
      centered
      title="Upload photo"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-form ref="image-form" @submit.stop.prevent="handleUpload">
        <b-input
          required
          class="my-3"
          :state="stateTitle"
          placeholder="Title"
          aria-invalid="title-badword-feedback"
          v-model="title"
          invalid-feedback="Bad words are not allowed"
        ></b-input>
        <b-form-invalid-feedback id="title-badword-feedback">
          Badwords not allowed
        </b-form-invalid-feedback>
        <b-textarea
          required
          class="my-2"
          :state="stateDescription"
          placeholder="Description"
          aria-invalid="description-badword-feedback"
          invalid-feedback="Bad words are not allowed"
          v-model="description"
        ></b-textarea>
        <b-form-invalid-feedback id="description-badword-feedback">
          Badwords not allowed
        </b-form-invalid-feedback>
        <b-file required class="my-4" v-model="file" accept="image/*"></b-file>
      </b-form>
      <p class="mb-4 constraints-text">
        The file must have 2000px at his minimum side
      </p>
      Visibility:
      <b-check switch v-model="visibilitySwitch">
        <small><em>If set, the photo will be public</em></small>
      </b-check>

      <p class="tags-text mt-3">Select #tags:</p>

      <div class="modal-tags">
        <b-badge
          v-for="{ value, id } of tags"
          :key="id"
          @click="handleActivate(id)"
          class="mx-2 mt-2"
          :variant="tagsSelected[id] ? 'success' : 'secondary'"
          >{{ value }}</b-badge
        >
      </div>

      <template v-slot:modal-footer="{ ok }">
        <p class="tags-text mr-auto">
          By uploading it you accept our
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            >Terms and Conditions</a
          >
        </p>

        <b-button
          size="sm"
          type="submit"
          form="photo-form"
          variant="success"
          @click="ok()"
          >Upload</b-button
        >
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
      @ok="handleManageTags"
      footer-text-variant="secondary"
      ok-title="Save"
      ok-variant="success"
      ok-only
    >
      <div class="modal-tags">
        <b-badge
          v-for="(value, i) of getHandleTags"
          :key="i"
          @click="handleTag(value)"
          :class="[
            'tag',
            {
              'editable-tag': tagAction === 'edit',
              'deletable-tag': tagAction === 'delete'
            }
          ]"
          >{{ value }}</b-badge
        >
      </div>

      <b-form
        v-if="tagAction === 'add' || tagAction === 'edit'"
        inline
        size="sm"
        class="mt-3 w-100"
        @submit.prevent="tagAction === 'add' ? addTag() : editTag()"
      >
        <b-input
          v-if="tagAction === 'add'"
          size="sm"
          v-model="addTagText"
          placeholder="Add Tags..."
        ></b-input>
        <b-input
          v-else-if="editTagText"
          size="sm"
          v-model="editTagText"
          placeholder="Editing tag"
        ></b-input>
        <b-btn
          v-show="tagAction === 'add' || editTagText"
          type="submit"
          :variant="tagAction === 'add' ? 'success' : 'info'"
          size="sm"
        >
          {{ tagAction === "add" ? "Add" : "Edit" }}
        </b-btn>
      </b-form>
      <template v-slot:modal-footer="{ ok }">
        <b-button size="sm" variant="info" @click="enableEditTag">
          Edit
        </b-button>
        <b-button size="sm" variant="success" @click="enableAddTag">
          Add
        </b-button>
        <b-button
          size="sm"
          variant="danger"
          class="mr-auto"
          @click="enableDeleteTag"
        >
          Delete
        </b-button>

        <b-button size="sm" variant="success" @click="ok()">Save</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from "vue-property-decorator";
import { mapState, mapGetters } from "vuex";
import { Image, FirestoreRef } from "../store/modules/images";
import { User } from "../store/modules/users";
import { firestore } from "firebase/app";
import { Tag } from "../store/modules/tags";
import { db } from "../firebase";
import { ShowToastMixin } from "../mixins/showToast";
import { BadWordsMixin } from "@/mixins/badWords";
import { BvModalEvent } from "bootstrap-vue";

@Component({
  computed: {
    ...mapState("auth", ["authUser"]),
    ...mapState("tag", ["tags"]),
    ...mapState("image", ["images"]),
    ...mapGetters("image", [
      "getImagesOfUser",
      "getImageURL",
      "numberOfImagesOfUser"
    ]),
    ...mapGetters("auth", ["userReference"]),
    ...mapGetters("user", ["usersFollowedBy"])
  }
})
export default class About extends Mixins(ShowToastMixin, BadWordsMixin) {
  $refs!: {
    "image-form": HTMLFormElement;
  };

  @Prop({ default: "myphotos", type: String }) route!: string;
  public authUser!: User;
  public userReference!: FirestoreRef | null;
  public tags!: Array<Tag>;
  public images!: Array<Image>;
  public getImagesOfUser!: (id: string) => Array<Image>;
  public getImageURL!: (id: string) => Promise<string>;
  public numberOfImagesOfUser!: (id: string) => number;
  public usersFollowedBy!: (id: string) => Array<User>;

  loaded = 0;
  followingUsers: Array<User> = [];
  stateTitle: boolean | null = null;
  stateDescription: boolean | null = null;

  tagAction = "";
  manageTags: Record<string, string> = {};
  visibilitySwitch = true;
  editingTag: string | null = null;
  addTagText = "";
  editTagText = "";
  tagsSelected: Record<string, boolean> = {};
  file: File | null = null;
  imgsSrc: Record<string, string> = {};
  tagsToAdd: Array<Tag> = [];
  title = "";
  description = "";
  imagesSrc!: Record<string, string>;
  image!: string;

  created() {
    this.$store
      .dispatch("image/bindImagesOfUser", this.authUser.id)
      .then(() =>
        this.images.forEach(({ id }) => {
          this.getImageURL(id).then(url => (this.imgsSrc[id] = url));
        })
      )
      .catch(this.fetchingError);
    this.$store
      .dispatch("user/bindUsersRef")
      .then(
        () => (this.followingUsers = this.usersFollowedBy(this.authUser.id))
      )
      .catch(this.fetchingError);

    this.$store
      .dispatch("tag/bindTagsRef")
      .then(() => {
        this.tags.forEach(({ id }) => (this.tagsSelected[id] = false));
      })
      .catch(this.fetchingError);
  }

  get getImages() {
    return this.images ?? [];
  }

  get following() {
    return this.authUser ? this.followingUsers : [];
  }

  get items() {
    return this.route === "myphotos" ? this.getImages : this.following;
  }

  resetModal() {
    this.title = "";
    this.description = "";
    this.file = null;
  }

  handleOk(bvModalEvt: BvModalEvent) {
    // Prevent modal from closing
    bvModalEvt.preventDefault();
    // Trigger submit handler
    this.handleSubmit();
  }

  handleSubmit() {
    this.stateTitle = null;
    this.stateDescription = null;
    // Exit when the form isn't valid
    if (this.$refs["image-form"].reportValidity()) {
      this.stateTitle = this.textIsValid(this.title);
      this.stateDescription = this.textIsValid(this.description);
      // Hide the modal manually
      if (this.stateTitle && this.stateDescription) {
        this.$nextTick(() => {
          this.$bvModal.hide("upload-modal");
          this.handleUpload();
        });
      }
    }
  }

  tagId(value: string) {
    return this.tags.find(({ value: tagValue }) => tagValue === value)?.id;
  }

  enableEditTag() {
    this.showToast("To edit a tag, click one", "Edit tag", "info");
    this.tagAction = "edit";
  }

  enableAddTag() {
    this.tagAction = "add";
  }

  enableDeleteTag() {
    this.showToast("To delete a tag, click one", "Delete tag", "info");
    this.tagAction = "delete";
  }

  handleTag(tagValue: string) {
    switch (this.tagAction) {
      case "edit":
        this.editingTag = tagValue;
        this.editTagText = tagValue;
        break;
      case "delete":
        this.removeTag(tagValue);
        break;
    }
  }

  addTag() {
    if (
      Object.entries(this.manageTags).some(
        ([value]) => value === this.addTagText
      )
    )
      this.showToast("That tag already exists");
    else if (this.addTagText.includes(" "))
      this.showToast("You cannot include spaces");
    else {
      this.$set(this.manageTags, this.addTagText, "added");
    }
  }

  editTag() {
    console.log(3);

    if (!this.editTagText)
      this.showToast("Cannot leave empty the edit tag field");
    else if (this.editTagText.includes(" "))
      this.showToast("Tag value cannot include whitespaces");
    else {
      delete this.manageTags[this.editingTag!];
      this.$set(
        this.manageTags,
        `${this.editingTag} ${this.editTagText}`,
        "modified"
      );
      this.tagAction = "";
      // this.editTagText = ""
    }
  }

  get getHandleTags() {
    return Object.entries(this.manageTags)
      .filter(([, method]) => method !== "deleted")
      .map(([value]) => (value.includes(" ") ? value.split(" ")[1] : value));
  }

  removeTag(tagValue: string) {
    if (this.manageTags[tagValue] === "added") delete this.manageTags[tagValue];
    else this.manageTags[tagValue] = "deleted";
  }

  setManageTags() {
    this.manageTags = Object.fromEntries(
      this.tags.map(({ value }) => [value, "no change"])
    );
  }

  updateImg(t: Event) {
    const image = t.target as HTMLImageElement;
    image.src = this.imgsSrc[image.id] || "#";
  }

  handleManageTags() {
    for (const [value, method] of Object.entries(this.manageTags)) {
      if (method === "added") {
        this.$store.dispatch("tag/addTag", value);
      } else if (method === "deleted") {
        this.$store.dispatch("tag/deleteTag", this.tagId(value));
      } else if (method === "modified") {
        const [oldValue, newValue] = value.split(" ");
        this.$store.dispatch("tag/updateTag", {
          id: this.tagId(oldValue),
          value: newValue
        } as Tag);
      }
    }
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
            public: this.visibilitySwitch,
            likes: [],
            dislikes: []
          },
          file: this.file
        })
        .then(() => this.$router.go(0))
        .catch(({ message }) => this.showToast(message));
    } else this.showToast("You have reached the photo upload limit.");
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

.settings-header {
  text-align: center;
  color: peru;
}

.tag {
  margin: 0.5em 0.5em 0 0.5em;
}

.deletable-tag:hover {
  cursor: pointer;
  background-color: brown;
}

.editable-tag:hover {
  cursor: pointer;
  background-color: rgb(42, 151, 165);
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

.gallery-image {
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

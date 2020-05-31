<template>
  <div id="image">
    <main>
      <b-overlay class="overlay-img" :show="!loaded" rounded="sm">
        <img class="photo" :src="imageURL" @load="loaded = true" alt="image" />
      </b-overlay>
      <h5 class="golden-title mt-5">
        Comments
        <b-icon-chat-dots class="ml-1 mr-3"></b-icon-chat-dots>
        <b-icon-plus-circle-fill
          @click="commentActive = true"
          variant="info"
          class="d-inline-block border-0 add-comment-icon"
        ></b-icon-plus-circle-fill>
      </h5>

      <transition name="slide">
        <div v-show="commentActive" class="mt-4">
          <b-avatar class="mb-5"></b-avatar>
          <b-form @submit.prevent="addComment" class="w-50 ml-3 d-inline-block">
            <b-form-input
              v-model="commentText"
              :state="commentState"
              @keypress="commentState = null"
              type="text"
              size="sm"
              placeholder="Add a comment"
            ></b-form-input>
            <b-form-invalid-feedback :state="commentState">
              The text can't be empty.
            </b-form-invalid-feedback>
            <b-button
              @click="commentActive = false"
              class="ml-auto mt-2 mx-2"
              size="sm"
              >Cancel</b-button
            >
            <b-button
              type="submit"
              class="ml-auto mt-2 mx-2"
              variant="info"
              size="sm"
              >Comment</b-button
            >
          </b-form>
        </div>
      </transition>

      <b-list-group>
        <b-list-group-item
          class="comments-information"
          v-for="[index, { author, date, text }] of comments.entries()"
          :key="index"
        >
          <div class="d-flex">
            <b-avatar
              :to="'/profile/' + author.id"
              size="sm"
              class="mr-2"
            ></b-avatar>
            <h6 class="comment-author mr-2">{{ author.username }}</h6>
            <small>{{ date.toDate().toLocaleString() }}</small>
          </div>

          <div>{{ text }}</div>
        </b-list-group-item>
      </b-list-group>
    </main>
    <b-list-group class="shadow-sm">
      <b-list-group-item class="author-information">
        <b-avatar :to="'/profile/' + imageAuthor.id"></b-avatar>
        <div>
          <h5 class="golden-title">
            {{ imageAuthor.username }} / {{ photosUploaded }} photos
          </h5>
          <template v-if="!authUser || imageAuthor.id !== authUser.id">
            <follow-button :author="imageAuthor" />
            <b-button size="sm" class="rounded-pill mx-2" variant="success"
              >Donate</b-button
            >
          </template>
        </div>
      </b-list-group-item>
      <b-list-group-item class="vote-information">
        <b-button
          @click="handleVote('likes')"
          v-b-tooltip.hover="'Like'"
          size="sm"
          pill
          :variant="selected === 'likes' ? 'info' : 'dark'"
        >
          <b-icon-arrow-up></b-icon-arrow-up>
          <small>
            <b>{{ likes.length }}</b>
          </small>
        </b-button>
        <b-button
          @click="handleVote('dislikes')"
          v-b-tooltip.hover="'Dislike'"
          class="mx-2"
          size="sm"
          pill
          :variant="selected === 'dislikes' ? 'danger' : 'dark'"
        >
          <b-icon-arrow-down></b-icon-arrow-down>
          <small>
            <b>{{ dislikes.length }}</b>
          </small>
        </b-button>
        <b-button
          variant="light"
          v-b-tooltip.hover="'Share'"
          size="sm"
          class="rounded-pill mx-2"
        >
          <b-icon-reply></b-icon-reply>
        </b-button>
      </b-list-group-item>
      <b-list-group-item class="other-information">
        <h4 v-if="!editing" class="img-title">
          {{ imageTitle }}
        </h4>
        <b-input
          v-else
          class="w-50"
          :state="stateEditTitle"
          v-model="imageTitle"
        >
          {{ imageTitle }}
        </b-input>
        <template v-if="authUser && imageAuthor.id === authUser.id">
          <b-button
            v-b-tooltip.hover="'Edit photo'"
            class="edit-button"
            size="sm"
            pill
            variant="info"
            @click.once="$store.dispatch('tag/bindTagsRef')"
            @click="editPhoto"
          >
            <b-icon-screwdriver></b-icon-screwdriver>
          </b-button>
          <b-button
            v-b-tooltip.hover="'Delete photo'"
            class="delete-button"
            size="sm"
            pill
            variant="danger"
            v-b-modal.delete-tags
          >
            <b-icon-x></b-icon-x>
          </b-button>
        </template>
        <p v-if="!editing" class="img-description">
          {{ imageDescription }}
        </p>
        <b-textarea
          v-else
          v-model="imageDescription"
          :state="stateEditDescription"
          class="mt-2"
        ></b-textarea>
        <div class="tags mt-2">
          <b-badge
            v-for="{ id, value } of chooseTags"
            class="mx-2"
            :key="id"
            variant="secondary"
          >
            {{ value }}
          </b-badge>
          <b-badge
            v-if="editing"
            v-b-modal.edit-tags
            class="edit-tag-button"
            variant="info"
          >
            <b-icon-plus></b-icon-plus>
          </b-badge>
        </div>
        <div v-if="editing">
          <div class="visibility-check m-2">
            Visibility:
            <b-check switch v-model="visibilitySwitch">
              <small><em>If set, the photo will be public</em></small>
            </b-check>
          </div>
          <div class="mt-2 ml-2">
            <b-button
              variant="success"
              pill
              class="mr-2"
              size="sm"
              @click="saveEdit"
            >
              Save
            </b-button>
            <b-button variant="dark" pill size="sm" @click="cancelEdit">
              Cancel
            </b-button>
          </div>
        </div>
      </b-list-group-item>
    </b-list-group>
    <b-modal
      id="delete-tags"
      body-bg-variant="dark"
      header-bg-variant="dark"
      footer-bg-variant="dark"
      body-text-variant="white"
      header-text-variant="white"
      footer-text-variant="white"
      title="Delete photo"
      @ok="deletePhoto"
    >
      Are you sure?</b-modal
    >
    <b-modal
      id="edit-tags"
      body-bg-variant="dark"
      header-bg-variant="dark"
      footer-bg-variant="dark"
      body-text-variant="white"
      header-text-variant="white"
      footer-text-variant="white"
      title="Edit tags"
      @cancel="resetEditTags"
      @close="resetEditTags"
      @ok="saveTags"
    >
      <b-badge
        v-for="tag of tagsToAdd"
        class="editable-tag"
        :key="tag.id"
        @click="removeTag(tag)"
        variant="secondary"
      >
        {{ tag.value }}
      </b-badge>
      <hr />
      <h6>Add Tags</h6>
      <b-input type="text" size="sm" v-model="searchTextInput" />
      <b-badge
        v-for="tag of searchTag"
        class="add-tag"
        @click="tagsToAdd.push(tag)"
        :key="tag.id"
        variant="secondary"
      >
        {{ tag.value }}
      </b-badge>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from "vue-property-decorator";
import { firestore } from "firebase/app";

import { Image, Comment, FirestoreRef } from "@/store/modules/images";
import { mapState, mapGetters } from "vuex";
import { User } from "../store/modules/users";
import { Tag } from "../store/modules/tags";
import { ShowToastMixin } from "../mixins/showToast";
import { BadWordsMixin } from "../mixins/badWords";
import FollowButton from "@/components/FollowButton.vue";

@Component({
  components: { FollowButton },
  computed: {
    ...mapState("auth", ["authUser"]),
    ...mapState("image", ["images", "actualImage"]),
    ...mapState("tag", ["tags"]),
    ...mapGetters("auth", ["userReference"]),
    ...mapGetters("image", ["getImageById", "getImageURL"]),
    ...mapGetters("user", ["isBeingFollowed"])
  }
})
export default class ImageDetails extends Mixins(
  ShowToastMixin,
  BadWordsMixin
) {
  public authUser!: User | null;
  public userReference!: FirestoreRef;
  public actualImage!: Image | null;
  public images!: Image;
  public tags!: Array<Tag>;
  public getImageById!: (id: string) => Image;
  public getImageURL!: (id: string) => Promise<string>;
  public isBeingFollowed!: (user: User, followingId: string) => boolean;
  @Prop({ required: true, type: String }) photoId!: string;

  image: Image | null = null;
  loaded = false;
  itFollows = false;
  imageTags: Array<Tag> = [];
  copyImageTags: Array<Tag> = [];
  editing = false;
  tagsToAdd: Array<Tag> = [];
  searchTextInput = "";
  imageTitle = "";
  imageDescription = "";
  imageURL = "#";
  visibilitySwitch = true;
  commentState: boolean | null = null;
  commentText = "";
  commentActive = false;
  photosUploaded = Math.floor(Math.random() * 100);
  likes: Array<string> = [];
  dislikes: Array<string> = [];
  selected: string | null = null;
  stateEditTitle: boolean | null = null;
  stateEditDescription: boolean | null = null;

  async created() {
    const image = this.getImageById(this.photoId);
    if (!image) {
      this.image = (await this.$store
        .dispatch("image/bindImageById", this.photoId)
        .catch(this.fetchingError)) as Image;
    } else {
      this.image = image;
    }
    this.visibilitySwitch = this.image.public;
    this.imageTitle = this.image.title;
    this.imageDescription = this.image.description;

    this.copyImageTags = this.image.tags.filter(tag => tag);
    this.imageTags = this.copyImageTags;

    this.likes = this.image.likes;
    this.dislikes = this.image.dislikes;
    if (this.authUser) {
      if (this.likes.includes(this.authUser.id)) {
        this.selected = "likes";
      } else if (this.dislikes.includes(this.authUser.id)) {
        this.selected = "dislikes";
      }
      this.itFollows = this.isBeingFollowed(
        this.image.author as User,
        this.authUser.id
      );
    }
    this.getImageURL(this.photoId)
      .then(url => (this.imageURL = url))
      .catch(({ message }) => this.showToast(message));
  }

  get imageAuthor() {
    return this.image ? this.image.author : {};
  }

  get comments() {
    return this.image ? this.image.comments : [];
  }

  resetEditTags() {
    this.tagsToAdd = [...this.imageTags];
  }

  get searchTag() {
    return this.tags.filter(
      ({ value, id }) =>
        value.includes(this.searchTextInput) &&
        !this.tagsToAdd.some(({ id: tagId }) => tagId === id)
    );
  }

  removeTag(tag: Tag) {
    this.tagsToAdd.splice(this.tagsToAdd.indexOf(tag), 1);
  }

  handleVote(type: string) {
    if (this.authUser) {
      const indexLikes = this.likes.indexOf(this.authUser.id);
      const indexDisikes = this.likes.indexOf(this.authUser.id);
      if (this.selected === "likes") {
        if (type === "dislikes") {
          this.likes.splice(indexDisikes, 1);
          this.dislikes.push(this.authUser.id);
          this.selected = type;
        } else {
          this.selected = null;
          this.likes.splice(indexLikes, 1);
        }
      } else if (this.selected === "dislikes") {
        if (type === "likes") {
          this.dislikes.splice(indexDisikes, 1);
          this.likes.push(this.authUser.id);
          this.selected = type;
        } else {
          this.selected = null;
          this.dislikes.splice(indexDisikes, 1);
        }
      } else {
        if (type === "likes") this.likes.push(this.authUser.id);
        else this.dislikes.push(this.authUser.id);

        this.selected = type;
      }
      this.$store.dispatch("image/voteImage", {
        photoId: this.photoId,
        likes: this.likes,
        dislikes: this.dislikes
      });
    }
  }

  saveTags() {
    this.imageTags = this.tagsToAdd.slice();
  }

  addComment() {
    if (this.authUser && this.image) {
      if (this.commentText.length) {
        const comment = {
          author: this.userReference,
          date: firestore.Timestamp.now(),
          text: this.commentText
        } as Comment;
        this.image.comments.push({ ...comment, author: this.authUser });

        this.$store
          .dispatch("image/addCommentToImg", {
            photoId: this.photoId,
            comment
          })
          .then(() => {
            this.commentActive = false;
            this.commentText = "";
          })
          .catch(({ message }) => this.showToast(message));
      } else this.commentState = false;
    } else {
      this.showToast("You must be logged in to comment", "Auth error");
    }
  }

  get chooseTags() {
    // FIXME
    return this.editing ? this.imageTags : this.copyImageTags;
  }

  editPhoto() {
    this.editing = true;
    this.stateEditTitle = null;
    this.stateEditDescription = null;
    if (this.image) {
      this.tagsToAdd = [...this.copyImageTags];
      this.imageTags = [...this.copyImageTags];
    }
  }

  deletePhoto() {
    if (this.image?.comments.length === 0)
      this.$store
        .dispatch("image/deleteImage", this.photoId)
        .then(() => this.$router.push("/about"))
        .catch(this.fetchingError);
    else
      this.showToast(
        "You can't delete photos with comments",
        "Delete photo error"
      );
  }

  handleFollow() {
    if (this.authUser) {
      this.$store
        .dispatch("user/followUser", {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          id: this.image!.author.id,
          followingId: this.authUser.id,
          method: this.itFollows ? "unfollow" : "follow"
        })
        .then(() =>
          this.itFollows ? (this.itFollows = false) : (this.itFollows = true)
        )
        .catch(this.fetchingError);
    } else {
      this.showToast(
        "You must be logged in to follow another user",
        "Auth error"
      );
    }
  }

  cancelEdit() {
    this.editing = false;
    if (this.image) {
      this.imageTitle = this.image.title;
      this.imageDescription = this.image.description;
    }
  }

  saveEdit() {
    if (this.image) {
      let error: string | undefined;
      if (this.imageTitle.length > 0)
        if (this.textIsValid(this.imageTitle)) {
          this.stateEditTitle = true;
        } else {
          error = "Bad words are not allowed";
          this.stateEditTitle = false;
        }
      else {
        error = "Title must not be empty";
        this.stateEditTitle = false;
      }

      if (this.imageDescription.length > 0)
        if (this.textIsValid(this.imageDescription)) {
          this.stateEditDescription = true;
        } else {
          error = "Bad words are not allowed";
          this.stateEditDescription = false;
        }
      else {
        error = "Description must not be empty";
        this.stateEditDescription = false;
      }

      if (!error) {
        this.$store
          .dispatch("image/editImage", {
            title: this.imageTitle,
            description: this.imageDescription,
            photoId: this.image.id,
            tags: this.imageTags,
            imageIsPublic: this.visibilitySwitch
          })
          .then(() => {
            this.editing = false;
          })
          .catch(this.fetchingError);
        // this.imageTags =
      } else this.showToast(error, "Invalid edit");
    }
  }
}
</script>

<style scoped>
.comment-author + small {
  color: grey;
}
.add-comment-icon {
  background-color: inherit;
  cursor: pointer;
}

.add-comment-icon:hover {
  opacity: 0.8;
}
.button-up {
  background-color: teal;
}
.button-down {
  background-color: rgb(90, 7, 7);
}

.golden-title {
  color: goldenrod;
  margin-bottom: 10px;
}

.visibility-check {
  color: whitesmoke;
}

.comment-author {
  color: yellowgreen;
}

.photo {
  object-fit: contain;
  max-height: 600px;
  max-width: 100%;
  min-width: 60%;
}

.overlay-img {
  display: flex;
  justify-content: center;
}

#image {
  display: flex;
  flex-wrap: wrap;
}

#image > main {
  padding: 20px;
  width: 100%;
  display: flex;
  flex: 3 1 0;
  flex-direction: column;
  max-width: 1310px;
}

#image > .list-group {
  padding-top: 20px;
  min-width: 300px;
  flex: 1 1 0;
}

main .list-group-item {
  flex-direction: column;
  background-color: inherit;
}

main .list-group-item div:last-child {
  padding-left: 30px;
  color: rgb(165, 158, 158);
}

[class$="-information"] {
  border: 1px solid #181818;
  /* display: flex; */
  background-color: #222222;
}
.author-information {
  display: flex;
}
.author-information > * {
  margin-right: 10px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
}

.edit-tag-button {
  margin-left: 1em;
  cursor: pointer;
}

.edit-button {
  position: absolute;
  top: 5px;
  right: 25px;
}

.delete-button {
  position: absolute;
  top: 5px;
  right: 75px;
}

.img-title {
  width: 50%;
  color: burlywood;
}

.img-description {
  color: rgb(206, 204, 204);
}

.editable {
  background-color: whitesmoke;
  color: black;
}

.editable-tag,
.add-tag {
  margin-right: 2em;
  margin-top: 1em;
  cursor: pointer;
}

.add-tag:hover {
  background-color: cadetblue;
}

.editable-tag:hover {
  background-color: brown;
}
</style>

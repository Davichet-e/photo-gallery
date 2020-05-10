<template>
  <div id="image">
    <main>
      <img class="photo" :src="image ? image.url : '#'" alt />
      <h5 class="mt-5">
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
            <b-form-invalid-feedback :state="commentState"
              >The text can't be empty.</b-form-invalid-feedback
            >
            <b-button
              @click="commentActive = false"
              class="ml-auto mt-2"
              size="sm"
              >Cancel</b-button
            >
            <b-button
              type="submit"
              class="ml-auto mt-2"
              variant="info"
              size="sm"
              >Comment</b-button
            >
          </b-form>
        </div>
      </transition>

      <b-list-group>
        <b-list-group-item
          class="comments-info"
          v-for="[index, { author, date, text }] of comments.entries()"
          :key="index"
        >
          <div class="d-flex">
            <b-avatar to="../profile" size="sm" class="mr-2"></b-avatar>
            <h6 class="mr-2">{{ author.username }}</h6>
            <small>{{ date.toDate().toLocaleString() }}</small>
          </div>

          <div>{{ text }}</div>
        </b-list-group-item>
      </b-list-group>
    </main>
    <b-list-group class="shadow-sm">
      <b-list-group-item class="author-info">
        <b-avatar></b-avatar>
        <div>
          <h5>Author / {{ photosUploaded }} photos</h5>
          <b-button size="sm" class="rounded-pill" variant="dark"
            >Follow</b-button
          >
          <b-button size="sm" class="rounded-pill" variant="success"
            >Donate</b-button
          >
        </div>
      </b-list-group-item>
      <b-list-group-item class="vote-info">
        <b-button
          @click="handleVote('likes')"
          v-b-tooltip.hover="'Like'"
          size="sm"
          pill
          :variant="selected === 'likes' ? 'info' : 'dark'"
        >
          <b-icon-arrow-up></b-icon-arrow-up>
          <small>
            <b>{{ likes }}</b>
          </small>
        </b-button>
        <b-button
          @click="handleVote('dislikes')"
          v-b-tooltip.hover="'Dislike'"
          size="sm"
          pill
          :variant="selected === 'dislikes' ? 'danger' : 'dark'"
        >
          <b-icon-arrow-down></b-icon-arrow-down>
          <small>
            <b>{{ dislikes }}</b>
          </small>
        </b-button>
        <b-button
          variant="light"
          v-b-tooltip.hover="'Share'"
          size="sm"
          class="rounded-pill"
        >
          <b-icon-reply></b-icon-reply>
        </b-button>
      </b-list-group-item>
      <b-list-group-item class="other-info">
        <b-badge
          v-for="tag of tags"
          :key="tag"
          class="mx-2 mt-2"
          variant="secondary"
          >{{ tag }}</b-badge
        >
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import { firestore } from "firebase/app";

import { Image } from "@/store/modules/images";
import { mapState } from "vuex";
import { User } from "../store/modules/users";

@Component({
  computed: mapState("auth", ["authUser"])
})
export default class ImageDetails extends Vue {
  public authUser!: User | null;
  commentState: boolean | null = null;
  commentText = "";
  commentActive = false;
  photosUploaded = Math.floor(Math.random() * 100);
  likes = Math.floor(Math.random() * 10000);
  dislikes = Math.floor(Math.random() * 10000);
  selected: string | null = null;
  tags: Array<string> = [
    "dark",
    "white",
    "christmas",
    "love",
    "trending",
    "chulipuni"
  ];

  created() {
    this.$store.dispatch("image/bindImagesRef");
  }
  get image(): Image {
    return this.$store.getters["image/getImageById"]("juF5H0NKStoC8m5KHQQE");
  }

  get comments() {
    if (this.image) return this.image.comments;
    return [];
  }

  handleVote(type: string) {
    if (this.selected === "likes") {
      if (type === "dislikes") {
        this.likes--;
        this.dislikes++;
        this.selected = type;
      } else {
        this.selected = null;
        this.likes--;
      }
    } else if (this.selected === "dislikes") {
      if (type === "likes") {
        this.dislikes--;
        this.likes++;
        this.selected = type;
      } else {
        this.selected = null;
        this.dislikes--;
      }
    } else {
      if (type === "likes") this.likes++;
      else this.dislikes++;

      this.selected = type;
    }
  }
  addComment(/* evt: Event */) {
    console.log(this.$store.getters["auth/userReference"]);
    if (this.commentText.length) {
      this.$store
        .dispatch("image/addCommentToImg", {
          photoId: this.image.id,
          comment: {
            author: this.$store.getters["auth/userReference"],
            date: firestore.Timestamp.fromDate(new Date()),
            text: this.commentText
          }
        })
        .then(() => {
          this.commentActive = false;
          this.commentText = "";
        });
    } else this.commentState = false;
  }
}
</script>

<style scoped>
h6 + small {
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
hr {
  background-color: whitesmoke;
}

h5 {
  color: goldenrod;
  margin-bottom: 10px;
}

h6 {
  color: yellowgreen;
}

img {
  object-fit: contain;
  max-height: 600px;
  /* width: 100%; */
  max-width: 100%;
  min-width: 60%;
  /* height: auto; */
}

button {
  margin: 0px 5px;
}

#image {
  /* padding-top: 10px; */
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

[class$="-info"] {
  border: 1px solid #181818;
  display: flex;
  background-color: #222222;
}

.author-info > * {
  margin-right: 10px;
}

.other-info {
  display: flex;
  flex-wrap: wrap;
}
</style>

<template>
  <b-button
    size="sm"
    class="rounded-pill mx-2"
    :variant="this.itFollows ? 'info' : 'dark'"
    @click="handleFollow"
  >
    Follow{{ itFollows ? "ed" : "" }}
  </b-button>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from "vue-property-decorator";
import { ShowToastMixin } from "../mixins/showToast";
import { mapState, mapGetters } from "vuex";
import { User } from "../store/modules/users";

@Component({
  computed: {
    ...mapState("auth", ["authUser"]),
    ...mapGetters("user", ["isBeingFollowed"])
  }
})
export default class FollowButton extends Mixins(ShowToastMixin) {
  public authUser!: User | null;
  public isBeingFollowed!: (user: User, followingId: string) => boolean;
  @Prop({ type: Object, required: true }) author!: User;

  itFollows = false;

  created() {
    if (this.authUser)
      this.itFollows = this.isBeingFollowed(this.author, this.authUser.id);
  }

  get userIsLogged() {
    return !!this.authUser;
  }

  get authUserId() {
    return this.authUser?.id;
  }

  handleFollow() {
    if (this.userIsLogged) {
      this.$store
        .dispatch("user/followUser", {
          id: this.author.id,
          followingId: this.authUserId,
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
}
</script>

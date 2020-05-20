<template>
  <b-navbar
    id="nav-bar"
    class="py-lg-0 rounded-bottom"
    type="dark"
    toggleable="lg"
    v-if="this.$route.path !== '/login' && this.$route.path !== '/signup'"
  >
    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-nav-form
        class="mt-lg-0 mt-4 px-3 order-lg-0 order-5"
        @submit.prevent="search"
      >
        <b-input-group size="sm w-100">
          <b-input-group-prepend>
            <b-button type="submit" variant="light">
              <b-icon-search></b-icon-search>
            </b-button>
          </b-input-group-prepend>

          <b-form-input
            v-model="searchTerm"
            placeholder="Search"
          ></b-form-input>

          <b-input-group-append>
            <b-dd size="sm" variant="light" :text="searchSelected">
              <b-dd-item-button @click="searchSelected = 'Images'"
                >Images</b-dd-item-button
              >
              <b-dd-divider></b-dd-divider>
              <b-dd-item-button @click="searchSelected = 'Authors'"
                >Authors</b-dd-item-button
              >
              <b-dd-item-button @click="searchSelected = 'Tags'"
                >Tags</b-dd-item-button
              >
            </b-dd>
          </b-input-group-append>
        </b-input-group>
      </b-nav-form>

      <b-navbar-nav class="ml-lg-auto">
        <b-nav-item
          to="/images/search?order=popular"
          class="align-self-center my-lg-0 my-sm-2 px-3"
        >
          <img
            src="https://marvel-live.freetls.fastly.net/canvas/2020/3/9d8776ef343b49079e13d2c9dc821fe8?quality=95&fake=.png"
            alt="trending"
            height="40px"
          />
        </b-nav-item>

        <b-nav-item
          v-if="!authUser"
          to="/login"
          class="px-4 nav-links align-self-center my-lg-0 my-sm-2"
          >Login
        </b-nav-item>

        <b-nav-item
          v-if="!authUser"
          to="/signup"
          class="px-2 mx-3 nav-links border rounded align-self-center my-lg-0 my-sm-2"
          href="#"
          >Sign Up
        </b-nav-item>

        <b-nav-text v-else class="align-self-center">
          <b-button size="sm" variant="dark" v-b-toggle.sidebar-variant>
            <b-icon-three-dots-vertical></b-icon-three-dots-vertical>
          </b-button>

          <b-sidebar
            id="sidebar-variant"
            title="Account"
            bg-variant="dark"
            text-variant="light"
            right
            shadow
          >
            <b-list-group>
              <b-list-group-item to="/profile/" variant="dark">
                <b-icon-people-circle class="mr-2"></b-icon-people-circle>My
                Profile
              </b-list-group-item>

              <b-list-group-item to="/about/" variant="dark">
                <b-icon-image class="mr-2"></b-icon-image>My Photos
              </b-list-group-item>
              <b-list-group-item
                to="/"
                @click="signOut"
                variant="dark"
                class="danger-item"
              >
                <b-icon-house-door class="mr-2"></b-icon-house-door>Sign Out
              </b-list-group-item>
            </b-list-group>

            <b-list-group class="bottom-list-group">
              <b-list-group-item to="../about/settings" variant="dark">
                <b-icon-gear-fill class="mr-2"></b-icon-gear-fill>Settings
              </b-list-group-item>
            </b-list-group>
          </b-sidebar>
        </b-nav-text>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import { mapState } from "vuex";
import { User } from "firebase";

@Component({
  computed: mapState("auth", ["authUser"])
})
export default class NavBar extends Vue {
  public authUser!: User | null;
  searchSelected = "Images";
  searchTerm = "";

  search(/*evt: Event*/) {
    this.$router.push({ name: "Search", query: { order: "recents" } });
  }

  signOut() {
    this.$store.dispatch("auth/signOut");
    this.$router.push("/");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#nav-bar {
  background-color: #121212;
}

.list-group * {
  background-color: inherit;
}

.list-group:last-child {
  position: relative;
  top: 75%;
}

button.navbar-toggler {
  border: none;
}

button.navbar-toggler:focus {
  outline: solid 1px rgba(141, 168, 159, 0.616);
}

.nav-link:focus {
  outline: 0.1px solid rgba(141, 168, 159, 0.616);
}

.nav-links {
  outline: 1px;
  color: whitesmoke;
}

.nav-links:hover {
  text-decoration: none;
  color: #2d4e91;
  cursor: pointer;
}

.nav-link:active {
  background: radial-gradient(
    ellipse farthest-side,
    rgba(255, 255, 255, 0.144) 30%,
    #121212 90%
  );
}
.form-inline {
  width: 100%;
}
@media screen and (min-width: 994px) {
  .form-inline {
    width: auto;
  }
}

a.danger-item {
  color: #dc3545;
}
</style>

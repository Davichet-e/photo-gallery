<template>
  <b-navbar
    id="nav-bar"
    class="py-lg-0 border-bottom rounded-bottom"
    type="dark"
    toggleable="lg"
    v-if="this.$route.path !== '/login' && this.$route.path !== '/signup'"
  >
    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-nav-form class="mt-lg-0 mt-4 px-3 w-100 order-lg-0 order-5" @submit.prevent="search">
        <b-input-group size="sm w-100">
          <b-input-group-prepend>
            <b-button type="submit" variant="light">
              <b-icon-search></b-icon-search>
            </b-button>
          </b-input-group-prepend>

          <b-form-input placeholder="Search"></b-form-input>

          <b-input-group-append>
            <b-dd size="sm" variant="light" :text="searchSelected">
              <b-dd-item-button @click="searchSelected = 'Images'">Images</b-dd-item-button>
              <b-dd-item-button @click="searchSelected = 'Videos'">Videos</b-dd-item-button>
              <b-dd-item-button @click="searchSelected = 'Authors'">Authors</b-dd-item-button>
            </b-dd>
          </b-input-group-append>
        </b-input-group>
      </b-nav-form>

      <b-navbar-nav class="ml-lg-auto">
        <b-nav-item v-if="!userLogged" href="#" class="h2 align-self-center my-lg-0 my-sm-2 px-3">
          <b-icon-three-dots></b-icon-three-dots>
        </b-nav-item>

        <b-nav-item href="#" class="align-self-center my-lg-0 my-sm-2 px-3">
          <img
            src="https://marvel-live.freetls.fastly.net/canvas/2020/3/9d8776ef343b49079e13d2c9dc821fe8?quality=95&fake=.png"
            alt="trending"
            height="40px"
          />
        </b-nav-item>

        <b-nav-item
          v-if="!userLogged"
          to="/login"
          class="px-4 nav-links align-self-center my-lg-0 my-sm-2"
        >Login</b-nav-item>

        <b-nav-item
          v-if="!userLogged"
          to="/signup"
          class="px-2 mx-3 nav-links border rounded align-self-center my-lg-0 my-sm-2"
          href="#"
        >Sign Up</b-nav-item>

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
              <b-list-group-item to="../profile" variant="dark">
                <b-icon-people-circle class="mr-2"></b-icon-people-circle>My Profile
              </b-list-group-item>

              <b-list-group-item to="../about" variant="dark">
                <b-icon-image class="mr-2"></b-icon-image>My Photos
              </b-list-group-item>

              <!-- <b-list-group-item variant="dark">Morbi leo risus</b-list-group-item>

              <b-list-group-item variant="dark">Porta ac consectetur ac</b-list-group-item>

              <b-list-group-item variant="dark">Vestibulum at eros</b-list-group-item>-->
            </b-list-group>

            <b-list-group class="bottom-list-group">
              <b-list-group-item to="../about/settings" variant="dark">
                <b-icon-gear-fill></b-icon-gear-fill>Settings
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

@Component
export default class NavBar extends Vue {
  userLogged = true;
  searchSelected = "Images";

  search(_evt: Event) {
    console.log(this.searchSelected);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-group * {
  background-color: inherit;
}

.list-group:last-child {
  position: relative;
  top: 75%;
}

#nav-bar {
  background-color: #121212;
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

.nav-links:active {
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
/* @media screen and (min-width: 768px) {
  .form-inline {
    width: 50%;
  }
} */
</style>

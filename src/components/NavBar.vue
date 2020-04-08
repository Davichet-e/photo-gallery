<template>
  <b-navbar
    class="py-lg-0 border-bottom rounded-bottom"
    type="dark"
    toggleable="lg"
    v-if="this.$route.path !== '/login' && this.$route.path !== '/signup'"
  >
    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-nav-form class="mt-lg-0 mt-4 px-3 ml-4" @submit.prevent="search">
        <b-input-group size="md">
          <b-form-input placeholder="Search"></b-form-input>

          <b-input-group-append>
            <b-button type="submit" c variant="outline-light">
              <b-icon-search></b-icon-search>
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-nav-form>

      <b-navbar-nav class="ml-auto">
        <b-nav-item href="#" class="nav-links h2 align-self-center my-lg-0 my-sm-2 pl-1 px-4">
          <b-icon-three-dots></b-icon-three-dots>
        </b-nav-item>

        <b-nav-item href="#" class="nav-links align-self-center my-lg-0 my-sm-2 px-3">
          <img
            src="https://marvel-live.freetls.fastly.net/canvas/2020/3/9d8776ef343b49079e13d2c9dc821fe8?quality=95&fake=.png"
            alt="trending"
            height="50px"
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

        <b-nav-item v-else class="h2 pb-0 ml-lg-3 ml-sm-3">
          <b-dropdown right>
            <template v-slot:button-content>
              <b-icon icon="person-fill" aria-hidden="true"></b-icon>
            </template>

            <b-dropdown-item-button>
              <b-icon icon="lock-fill" aria-hidden="true"></b-icon>Locked
              <span class="sr-only">(Click to unlock)</span>
            </b-dropdown-item-button>

            <b-dropdown-divider></b-dropdown-divider>

            <b-dropdown-group header="Choose options" class="small">
              <b-dropdown-item-button>
                <b-icon icon="blank" aria-hidden="true"></b-icon>Option A
                <span class="sr-only">(Not selected)</span>
              </b-dropdown-item-button>

              <b-dropdown-item-button>
                <b-icon icon="check" aria-hidden="true"></b-icon>Option B
                <span class="sr-only">(Selected)</span>
              </b-dropdown-item-button>

              <b-dropdown-item-button>
                <b-icon icon="blank" aria-hidden="true"></b-icon>Option C
                <span class="sr-only">(Not selected)</span>
              </b-dropdown-item-button>
            </b-dropdown-group>

            <b-dropdown-divider></b-dropdown-divider>

            <b-dropdown-item-button>My photos</b-dropdown-item-button>

            <b-dropdown-item-button>Some other action</b-dropdown-item-button>

            <b-dropdown-divider></b-dropdown-divider>

            <b-dropdown-item-button variant="danger">
              <b-icon icon="trash-fill" aria-hidden="true"></b-icon>Delete
            </b-dropdown-item-button>
          </b-dropdown>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      userLogged: false,
      search() {
        // TODO
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button.navbar-toggler {
  border: none;
}

button.navbar-toggler:focus {
  outline: solid 1px rgba(127, 255, 212, 0.616);
}

.navbar {
  font-size: 18px;
  padding-bottom: 10px;
}

.nav-links {
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
    #161515 90%
  );
}

img:active {
  border: solid 1px;
}
</style>

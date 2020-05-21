<template>
  <div id="auth" :class="route.replace(/ /g, '')">
    <main>
      <h4>{{ route.toUpperCase() }}</h4>
      <hr />

      <b-form class="auth-form" @submit.prevent="onSubmit">
        <b-input-group v-if="route === 'sign up'" class="mb-4">
          <b-form-input
            v-model="username"
            placeholder="Username"
            required
            autofocus
          ></b-form-input>

          <b-input-group-append is-text>
            <b-icon-person-fill></b-icon-person-fill>
          </b-input-group-append>
        </b-input-group>

        <b-input-group class="mb-4">
          <b-form-input
            v-model="email"
            placeholder="Email"
            required
          ></b-form-input>

          <b-input-group-append is-text>
            <b-icon-at></b-icon-at>
          </b-input-group-append>
        </b-input-group>

        <a class="password-reset" v-if="route === 'login'" href="#">
          Forgot your password?
        </a>
        <b-input-group class="mb-4">
          <b-form-input
            v-model="password"
            type="password"
            placeholder="Password"
            required
          ></b-form-input>

          <b-input-group-append is-text>
            <b-icon-lock-fill></b-icon-lock-fill>
          </b-input-group-append>
        </b-input-group>

        <b-form-checkbox
          id="remember-checkbox"
          class="text-light"
          v-model="isClicked"
          switch
        >
          <span v-if="route === 'login'">Remember me</span>

          <span v-else>
            I agree to
            <a href="#">terms of service</a>
          </span>
        </b-form-checkbox>
        <b-button type="submit" variant="light" class="text-capitalize">
          {{ route }}
        </b-button>
      </b-form>
      <aside>
        <aside class="line">OR</aside>
      </aside>
      <a @click="signInGoogle" href="#">
        <img
          :src="routeGoogleImage"
          @mousedown="googleImage = 'pressed'"
          @mouseup="googleImage = 'normal'"
          @focus="googleImage = 'focus'"
          alt="sign in with google"
          height="40px"
        />
      </a>
      <div class="or-container">
        <router-link v-if="route === 'login'" class="or-link" to="signup">
          Or sign up >
        </router-link>
        <router-link v-else class="or-link" to="login">Or login ></router-link>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { AuthUser } from "../store/modules/auth";

@Component
export default class Auth extends Vue {
  @Prop({ required: true, type: String }) readonly route!: string;

  isClicked = false;

  email = "";
  username = "";
  password = "";

  routeGoogleImage: string = require("@/assets/sign-in-google/btn_google_signin_dark_normal_web.png");

  get googleImage(): string {
    return this.routeGoogleImage;
  }
  set googleImage(value: string) {
    this.routeGoogleImage = require(`@/assets/sign-in-google/btn_google_signin_dark_${value}_web.png`);
  }

  showError(error: Error) {
    this.$bvToast.toast(error.message, {
      title: "Auth error",
      variant: "danger",
      solid: true,
      autoHideDelay: 2000
    });
  }

  onSubmit() {
    const action =
      this.route === "login"
        ? "signInWithEmailAndPassword"
        : "registerUserWithEmailAndPassword";
    this.$store
      .dispatch("auth/" + action, {
        email: this.email,
        username: this.username,
        password: this.password
      } as AuthUser)
      .then(() => this.$router.push("/"))
      .catch(this.showError);
  }

  signInGoogle() {
    this.$store
      .dispatch("auth/signInWithGoogle")
      .then(() => this.$router.push("/"))
      .catch(this.showError);
  }
}
</script>

<style scoped>
.login {
  background-image: url("https:///marvel-live.freetls.fastly.net/canvas/2020/2/3873225776594ff7aa5442658a7d4db8?quality=95&fake=.png");
}

.signup {
  background-image: url("../assets/sign-up-background.png");
}

#auth {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position-y: -150px;
  background-size: cover;
}

#auth > main {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: rgba(45, 45, 45, 0.89);
  width: 25em;
  border-radius: 10px;
  margin: 25px;
  text-align: center;
}

img {
  margin: 20px;
}

img:active {
  border: none;
}

img:hover {
  box-shadow: 0 8px 6px -6px black;
}

.auth-form {
  text-align: start;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
h4 {
  color: #b3b3b3;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 30px;
  font-weight: 400;
  margin: 20px;
}

.custom-switch {
  font-size: 15px;
}

a.password-reset {
  font-size: 10px;
}

a {
  text-align: left;
  color: #4f81b3;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

hr {
  background-color: #bce9ec;
  width: 90%;
  height: 1px;
  margin: 0px 0px 30px 0px;
}

input:not([type="checkbox"]) {
  height: 100%;
  width: 13em;
  border-radius: 2.5px 0px 0px 2.5px;
  padding-left: 10px;
}

.auth-form .icon-email {
  margin-bottom: 0px;
  background-image: url("../assets/mail.svg");
}

.auth-form .icon-password {
  background-image: url("../assets/lock.svg");
}

.btn {
  margin: 10px;
  align-self: center;
}

aside {
  width: 100%;
}
.line {
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: #b3b3b3;
  font-family: Arial, Helvetica, sans-serif;
  margin: 8px 0px 0px;
}

.line::before,
.line::after {
  content: "";
  flex-grow: 1;
  background: #b3b3b3;
  height: 1px;
  font-size: 0px;
  line-height: 0px;
  margin: 0px 8px;
}
.or-container {
  width: 100%;
}
.or-link {
  /* color: #4f81b3; */
  position: relative;
  left: 35%;
  top: -10px;
}
</style>

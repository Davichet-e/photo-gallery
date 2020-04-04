<template>
  <transition name="fade">
    <div id="wrap" :class="route === 'login' ? 'login' : 'signup'">
      <section id="auth">
        <h4>{{ route.toUpperCase() }}</h4>
        <hr />

        <b-form class="auth-form" @submit.prevent="onSubmit">
          <b-input-group class="mb-4">
            <b-form-input placeholder="Username" required autofocus></b-form-input>

            <b-input-group-append is-text>
              <b-icon-person-fill></b-icon-person-fill>
            </b-input-group-append>
          </b-input-group>

          <b-input-group class="mb-4">
            <b-form-input placeholder="Email" required></b-form-input>

            <b-input-group-append is-text>
              <b-icon-at></b-icon-at>
            </b-input-group-append>
          </b-input-group>

          <a class="password-reset" v-if="route === 'login'" href="#">Forgot your password?</a>
          <b-input-group class="mb-4">
            <b-form-input placeholder="Password" required></b-form-input>

            <b-input-group-append is-text>
              <b-icon-lock-fill></b-icon-lock-fill>
            </b-input-group-append>
          </b-input-group>
          <!-- <p>
            <b-form-input class="input-password" placeholder="Password" type="password" required />
            <span class="icon-password"></span>
          </p>-->
          <b-form-checkbox
            v-if="route === 'login'"
            id="remember-checkbox"
            class="text-light"
            switch
          >Remember me</b-form-checkbox>
          <b-form-checkbox v-else id="conditions-checkbox" :state="null" class="text-light" switch>
            I agree to
            <a href="#">terms of service</a>
          </b-form-checkbox>
          <b-button type="submit" variant="light">{{ route === "sign up" ? "Sign Up" : "Login" }}</b-button>
          <!-- <img src="../assets/mail.svg" alt="email-icon" height="50px" /> -->
        </b-form>
        <aside>
          <aside class="line">OR</aside>
        </aside>
        <a href="#">
          <img
            :src="routeGoogleImage"
            @mousedown="googleImage = 'pressed'"
            @mouseup="googleImage = 'normal'"
            @focus="googleImage = 'focus'"
            alt="sign in with google"
            height="40px"
          />
        </a>
      </section>
    </div>
  </transition>
</template>

<script lang="ts">
import "reflect-metadata";
import { Prop, Component, Vue } from "vue-property-decorator";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

@Component
export default class Auth extends Vue {
  @Prop() route!: string;

  state: boolean | null = null;
  routeGoogleImage: string = require("@/assets/sign-in-google/btn_google_signin_dark_normal_web.png");

  onSumbit() {
    //
  }

  get googleImage(): string {
    return this.routeGoogleImage;
  }
  set googleImage(value: string) {
    this.routeGoogleImage = require(`@/assets/sign-in-google/btn_google_signin_dark_${value}_web.png`);
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
#wrap {
  height: 100vh;
  width: 100vw;
  display: flex;

  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  /* background-image: url("https:///marvel-live.freetls.fastly.net/canvas/2020/2/3873225776594ff7aa5442658a7d4db8?quality=95&fake=.png"); */
  background-position-y: -150px;
  background-size: cover;
}

#auth {
  display: flex;
  /* box-shadow: 3px 2px 5px 6px rgb(0, 0, 0); */
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

.auth-form .icon-username {
  background-image: url("../assets/user-icon.svg");
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
</style>

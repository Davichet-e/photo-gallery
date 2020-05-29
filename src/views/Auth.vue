<template>
  <div id="auth" :class="route.replace(/ /g, '')">
    <main>
      <h4 class="auth-title">{{ route.toUpperCase() }}</h4>
      <hr class="hr" />

      <b-form class="auth-form" @submit.prevent="onSubmit">
        <b-input-group v-if="route === 'sign up'" class="mb-4">
          <b-form-input
            class="not-chekbox-input"
            v-model="form.username"
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
            class="not-chekbox-input"
            v-model="form.email"
            placeholder="Email"
            required
          ></b-form-input>

          <b-input-group-append is-text>
            <b-icon-at></b-icon-at>
          </b-input-group-append>
        </b-input-group>
        <b-input-group class="mb-4" v-if="route === 'sign up'">
          <b-form-input
            class="not-chekbox-input"
            v-model="form.phoneNumber"
            type="tel"
            placeholder="Phone number"
            pattern="[0-9]{9}"
            required
          ></b-form-input>

          <b-input-group-append is-text>
            <b-icon-phone></b-icon-phone>
          </b-input-group-append>
        </b-input-group>

        <a class="password-reset" v-if="route === 'login'" href="#">
          Forgot your password?
        </a>
        <b-input-group class="mb-4">
          <b-form-input
            class="not-chekbox-input"
            v-model="form.password"
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
      <div class="line-wrapper">
        <div class="line">OR</div>
      </div>
      <a class="auth-link" @click="signInGoogle" href="#">
        <img
          :src="routeGoogleImage"
          class="google-image"
          @mousedown="googleImage = 'pressed'"
          @mouseup="googleImage = 'normal'"
          @focus="googleImage = 'focus'"
          alt="sign in with google"
          height="40px"
        />
      </a>
      <div class="or-container">
        <a class="or-link" @click="changeAuthType">
          Or {{ this.route === "login" ? "sign up" : "login" }} >
        </a>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Mixins } from "vue-property-decorator";
import { AuthUser } from "../store/modules/auth";
import { ShowToastMixin } from "../mixins/showToast";

@Component
export default class Auth extends Mixins(ShowToastMixin) {
  @Prop({ required: true, type: String }) readonly route!: string;

  isClicked = false;

  form = { email: "", username: "", password: "" };

  routeGoogleImage: string = require("@/assets/sign-in-google/btn_google_signin_dark_normal_web.png");

  get googleImage(): string {
    return this.routeGoogleImage;
  }
  set googleImage(value: string) {
    this.routeGoogleImage = require(`@/assets/sign-in-google/btn_google_signin_dark_${value}_web.png`);
  }

  onSubmit() {
    const action =
      this.route === "login"
        ? "signInWithEmailAndPassword"
        : "registerUserWithEmailAndPassword";
    this.$store
      .dispatch("auth/" + action, {
        email: this.form.email,
        username: this.form.username,
        password: this.form.password
      } as AuthUser)
      .then(() => this.$router.push("/"))
      .catch(({ message }) => this.showToast(message));
  }

  changeAuthType() {
    this.form = { email: "", username: "", password: "" };
    this.$router.push(this.route === "login" ? "/signup" : "/login");
  }

  signInGoogle() {
    this.$store
      .dispatch("auth/signInWithGoogle")
      .then(() => this.$router.push("/"))
      .catch(({ message }) => this.showToast(message));
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

.google-image {
  margin: 20px;
}

.google-image:active {
  border: none;
}

.google-image:hover {
  box-shadow: 0 8px 6px -6px black;
}

.auth-form {
  text-align: start;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.auth-title {
  color: #b3b3b3;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 30px;
  font-weight: 400;
  margin: 20px;
}

.custom-switch {
  font-size: 15px;
}

.password-reset {
  font-size: 10px;
  text-align: left;
  color: #4f81b3;
  text-decoration: none;
}

.password-reset:hover {
  text-decoration: underline;
}

.hr {
  background-color: #bce9ec;
  width: 90%;
  height: 1px;
  margin: 0px 0px 30px 0px;
}

.not-checkbox-input {
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

.line,
.line-wrapper {
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
  color: #4f81b3;
  position: relative;
  left: 35%;
  top: -10px;
}

.or-link:hover {
  color: #4f81b3;
  cursor: pointer;
  text-decoration: underline;
}
</style>

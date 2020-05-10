import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations } from "vuexfire";

import { user, UserState } from "./modules/users";
import { image, ImageState } from "./modules/images";
import { auth, AuthState } from "./modules/auth";

Vue.use(Vuex);

export interface State {
  users: UserState;
  images: ImageState;
  auth: AuthState;
}

export default new Vuex.Store({
  modules: { user, image, auth },
  mutations: vuexfireMutations
});

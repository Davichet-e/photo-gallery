import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations } from "vuexfire";

import { user, UserState } from "./modules/users";
import { image, ImageState } from "./modules/images";
import { auth, AuthState } from "./modules/auth";
import { tag, TagState } from "./modules/tags";

Vue.use(Vuex);

export interface State {
  users: UserState;
  images: ImageState;
  auth: AuthState;
  tags: TagState;
}

export default new Vuex.Store({
  modules: { user, image, auth, tag },
  mutations: vuexfireMutations
});

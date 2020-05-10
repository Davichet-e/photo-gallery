import { vuexfireMutations, firestoreAction } from "vuexfire";
import "firebase/firestore";

import { db } from "@/firebase";

export interface User {
  username: string;
  email: string;
  followers: Array<User>;
}

export interface UserState {
  users: Array<User>;
}

export const user = {
  namespaced: true,

  state: {
    users: []
  },

  getters: {
    getUsers(state: UserState) {
      return state.users;
    },
    getUsersUsernames(state: UserState) {
      return state.users.map(({ username }) => username);
    },

    getUsersEmail(state: UserState) {
      return state.users.map(({ email }) => email);
    }
  },

  mutations: vuexfireMutations,

  actions: {
    bindUsersRef: firestoreAction(context =>
      context.bindFirestoreRef("users", db.collection("users"))
    ),
    addUser: firestoreAction(
      (_context, { user, id }: { user: User; id: string }) =>
        db
          .collection("users")
          .doc(id)
          .set(user)
    )
  }
};

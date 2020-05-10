import firebase from "firebase/app";
import "firebase/auth";

import { Module } from "vuex";
import { User } from "./users";
import { db } from "@/firebase";

export interface AuthState {
  authUser: User | null;
  authUserId: string | null;
}

export interface AuthUser {
  username: string;
  email: string;
  password: string;
}

export const auth: Module<AuthState, unknown> = {
  namespaced: true,

  state: {
    authUser: null,
    authUserId: null
  },

  getters: {
    userIsLogged({ authUser }) {
      return authUser !== null;
    },
    userReference: ({ authUserId }) =>
      authUserId ? db.collection("users").doc(authUserId) : null
  },

  actions: {
    authUser({ commit }) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          const { uid, email, displayName } = user;
          commit("SET_AUTH_USER", {
            user: {
              email,
              username: displayName,
              followers: []
            } as User,
            id: uid
          });
        }
      });
    },

    async registerUserWithEmailAndPassword(
      { dispatch },
      { email, username, password }: AuthUser
    ) {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          console.log(user);

          return dispatch(
            "user/addUser",
            {
              user: { email, username, followers: [] } as User,
              id: user.user?.uid
            },
            { root: true }
          );
        })
        .then(() => dispatch("authUser"));
    },

    signInWithEmailAndPassword(_context, { email, password }: AuthUser) {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    },

    async signInWithGoogle({ dispatch }) {
      const provider = new firebase.auth.GoogleAuthProvider();
      return firebase
        .auth()
        .signInWithPopup(provider)
        .then(data => {
          if (data.user) {
            const { uid, email, displayName } = data.user;
            if (data.additionalUserInfo?.isNewUser) {
              dispatch(
                "user/addUser",
                {
                  user: {
                    email,
                    username: displayName,
                    followers: []
                  } as User,
                  id: uid
                },
                { root: true }
              );
            }
          }
        })
        .then(() => dispatch("authUser"))
        .catch(console.log);
    },

    async signOut({ commit }) {
      await firebase.auth().signOut();
      commit("SET_AUTH_USER", { user: null, id: null });
    }
  },
  mutations: {
    SET_AUTH_USER(state: AuthState, { user, id }: { user: User; id: string }) {
      state.authUser = user;
      state.authUserId = id;
    }
  }
};

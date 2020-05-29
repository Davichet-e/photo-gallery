import firebase from "firebase/app";
import "firebase/auth";

import { Module } from "vuex";
import { User } from "./users";
import { db } from "@/firebase";
import { State } from "..";

export interface AuthState {
  authUser: User | null;
}

export interface AuthUser {
  username: string;
  email: string;
  password: string;
}

export const auth: Module<AuthState, State> = {
  namespaced: true,

  state: {
    authUser: null
  },

  getters: {
    userIsLogged: () => firebase.auth().onAuthStateChanged,
    userReference: ({ authUser }) =>
      authUser ? db.collection("users").doc(authUser.id) : null
  },

  actions: {
    async authUser({ commit }) {
      return new Promise(resolve =>
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            const { uid, email, displayName } = user;
            commit("SET_AUTH_USER", {
              id: uid,
              email,
              username: displayName,
              followers: [],
              profilePicURL: "#"
            } as User);
            resolve(true);
          } else resolve(false);
        })
      );
    },

    async registerUserWithEmailAndPassword(
      { dispatch },
      { email, username, password }: AuthUser
    ) {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
          if (user) {
            user.updateProfile({ displayName: username });
            return dispatch(
              "user/addUser",
              {
                id: user.uid,
                email,
                username,
                followers: [],
                profilePicURL: "#"
              } as User,
              { root: true }
            );
          }
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
                  id: uid,
                  email,
                  username: displayName,
                  followers: [],
                  profilePicURL: "#"
                } as User,

                { root: true }
              );
            }
          }
        })
        .then(() => dispatch("authUser"));
    },

    async signOut({ commit }) {
      await firebase.auth().signOut();

      commit("SET_AUTH_USER", null);
    }
  },
  mutations: {
    SET_AUTH_USER(state: AuthState, user: User | null) {
      state.authUser = user;
    }
  }
};

import { vuexfireMutations, firestoreAction } from "vuexfire";
import "firebase/firestore";

import { db } from "@/firebase";
import { firestore } from "firebase/app";
import { Module } from "vuex";
import { State } from "..";

export interface User {
  id: string;
  username: string;
  email: string;
  followers: Array<string>;
  profilePicURL: string;
}

export interface UserState {
  users: Array<User>;
  actualUser: User | null;
}

export const orderUsersPopularity = (a: User, b: User) =>
  b.followers.length - a.followers.length;

export const user: Module<UserState, State> = {
  namespaced: true,

  state: {
    users: [],
    actualUser: null
  },

  getters: {
    getUserScore(_state, _getters, { image }: State) {
      return (id: string) => {
        const votes = image.images
          .filter(
            // For unknown reasons, the author is a string with the shape users/{id}
            ({ author }) => ((author as unknown) as string).split("/")[1] === id
          )
          .map(({ likes, dislikes }) => likes.length - dislikes.length);

        return votes.reduce((prev, curr) => prev + curr, 0) / votes.length || 0;
      };
    },
    getUserById(state: UserState) {
      return (userId: string) => state.users.find(({ id }) => id === userId);
    },
    isBeingFollowed() {
      return (user: User, followingId: string) =>
        user.followers.includes(followingId);
    },

    usersFollowedBy(state: UserState) {
      return (id: string) =>
        state.users.filter(({ followers }) =>
          followers.some(userId => userId === id)
        );
    }
  },

  mutations: vuexfireMutations,

  actions: {
    bindUsersRef: firestoreAction(({ bindFirestoreRef }) =>
      bindFirestoreRef("users", db.collection("users"))
    ),
    bindUserById: firestoreAction(({ bindFirestoreRef }, userId: string) =>
      bindFirestoreRef("actualUser", db.collection("users").doc(userId))
    ),
    addUser: firestoreAction((_context, user: User) =>
      db
        .collection("users")
        .doc(user.id)
        .set(user)
    ),
    followUser: firestoreAction(
      (
        _context,
        {
          id,
          followingId,
          method
        }: { id: string; followingId: string; method: string }
      ) =>
        db
          .collection("users")
          .doc(id)
          .update({
            followers:
              method === "follow"
                ? firestore.FieldValue.arrayUnion(followingId)
                : firestore.FieldValue.arrayRemove(followingId)
          })
    )
  }
};

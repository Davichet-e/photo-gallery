import { vuexfireMutations, firestoreAction } from "vuexfire";
import "firebase/firestore";

import { db } from "@/firebase";
import { firestore } from "firebase/app";

export interface User {
  id: string;
  username: string;
  email: string;
  followers: Array<string>;
  profilePicURL: string;
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
    getUserById(state: UserState) {
      return (userId: string) => state.users.find(({ id }) => id === userId);
    },
    isBeingFollowed(_state: UserState) {
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

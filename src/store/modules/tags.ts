import { vuexfireMutations, firestoreAction } from "vuexfire";
import "firebase/firestore";

import { db } from "@/firebase";
import { State } from "..";
import { Module } from "vuex";

export interface Tag {
  id: string;
  value: string;
}

export interface TagState {
  tags: Array<Tag>;
}

export const tag: Module<TagState, State> = {
  namespaced: true,

  state: {
    tags: []
  },

  getters: {},

  mutations: vuexfireMutations,

  actions: {
    bindTagsRef: firestoreAction(({ bindFirestoreRef }) =>
      bindFirestoreRef("tags", db.collection("tags"))
    ),
    addTag: firestoreAction((_context, value: string) =>
      db
        .collection("tags")
        .doc()
        .set({ value })
    ),
    deleteTag: firestoreAction((_context, id: string) =>
      db
        .collection("tags")
        .doc(id)
        .delete()
    ),
    // TODO
    updateTag: firestoreAction((_context, { id, value }: Tag) =>
      db
        .collection("tags")
        .doc(id)
        .update({ value })
    )
  }
};

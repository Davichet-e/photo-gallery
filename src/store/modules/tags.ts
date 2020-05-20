import { vuexfireMutations, firestoreAction } from "vuexfire";
import "firebase/firestore";

import { db } from "@/firebase";

export interface Tag {
  id: string;
  value: string;
}

export interface TagState {
  tags: Array<Tag>;
}

export const tag = {
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
    // TODO
    updateTag: firestoreAction((_context, tags: Array<Tag>) => {
      const ref = db.collection("tags");
      tags.forEach(({ id }) => ref.doc(id));
    })
  }
};

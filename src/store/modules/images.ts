import { vuexfireMutations, firestoreAction } from "vuexfire";
import "firebase/firestore";
import { firestore } from "firebase/app";

import { db } from "@/firebase";
import { User } from "./users";
import { ActionContext } from "vuex";

export interface Comment {
  author: User;
  date: Date;
  text: string;
}

export interface Image {
  id: string;
  author: User;
  comments: Array<Comment>;
  photoId: string;
}

export interface ImageState {
  images: Array<Image>;
}

export const image = {
  namespaced: true,

  state: {
    images: []
  },

  getters: {
    getImagesAuthor(state: ImageState) {
      return state.images.map(({ author }) => author);
    },

    getImageById(state: ImageState) {
      return (id: string) =>
        state.images.find(photo => {
          return photo.id === id;
        });
    }
  },

  actions: {
    bindImagesRef: firestoreAction(context =>
      context.bindFirestoreRef("images", db.collection("photos"))
    ),
    addCommentToImg: firestoreAction(
      (_state, { photoId, comment }: { photoId: string; comment: Comment }) => {
        db.collection("photos")
          .doc(photoId)
          .update({
            comments: firestore.FieldValue.arrayUnion(comment)
          });
      }
    )
  },

  mutations: vuexfireMutations
};

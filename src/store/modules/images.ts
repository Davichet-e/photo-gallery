import { vuexfireMutations, firestoreAction } from "vuexfire";
import firebase, { firestore } from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import { db } from "@/firebase";
import { User } from "./users";
import { Tag } from "./tags";

export type FirestoreRef = firestore.DocumentReference<firestore.DocumentData>;

export interface Comment {
  author: User | FirestoreRef;
  date: firestore.Timestamp;
  text: string;
}

export interface Image {
  id: string;
  author: User | FirestoreRef;
  title: string;
  description: string;
  date: firestore.Timestamp;
  comments: Array<Comment>;
  tags: Array<Tag>;
  public: boolean;
  likes: number;
  dislikes: number;
}

export const orderImagesPopularity = (a: Image, b: Image) =>
  b.likes - b.dislikes - (a.likes - a.dislikes);

export const orderImagesRecents = (a: Image, b: Image) =>
  b.date.seconds - a.date.seconds;

export interface ImageState {
  images: Array<Image>;
  actualImage: Image | null;
}

export function sortImagesByPopularity(images: Array<Image>) {
  return images.slice().sort(orderImagesPopularity);
}

export const image = {
  namespaced: true,

  state: {
    images: [],
    actualImage: null
  },

  getters: {
    getImagesAuthor(state: ImageState) {
      return state.images.map(({ author }) => author);
    },

    getImageById(state: ImageState) {
      return (imageId: string) => state.images.find(({ id }) => id === imageId);
    },

    getImagesOfUser(state: ImageState) {
      return (id: string) =>
        state.images.filter(({ author }) => author.id === id);
    },

    getImagesByPopularity(state: ImageState) {
      return state.images.sort(orderImagesPopularity);
    },

    getImageURL: () => (id: string) =>
      firebase
        .storage()
        .ref()
        .child(id)
        .getDownloadURL(),

    getImagesURL(state: ImageState) {
      return state.images.map(({ id }) => ({
        id: this.getImageURL()(id)
      }));
    },

    numberOfImagesOfUser(state: ImageState) {
      return (id: string) =>
        state.images.filter(({ author }) => author.id === id).length;
    }
  },

  actions: {
    bindImagesRef: firestoreAction(({ bindFirestoreRef }) =>
      bindFirestoreRef("images", db.collection("photos").orderBy("date"))
    ),
    bindImagesOfUser: firestoreAction(({ bindFirestoreRef }, userId: string) =>
      bindFirestoreRef(
        "images",
        db
          .collection("photos")
          .where("author", "==", db.collection("users").doc(userId))
      )
    ),
    bindImageById: firestoreAction(({ bindFirestoreRef }, imageId: string) =>
      bindFirestoreRef("actualImage", db.collection("photos").doc(imageId))
    ),
    bindPublicImagesRef: firestoreAction(
      ({ bindFirestoreRef, unbindFirestoreRef }) => {
        unbindFirestoreRef("actualImage");
        return bindFirestoreRef(
          "images",
          db.collection("photos").where("public", "==", true)
        );
      }
    ),
    addPhoto: firestoreAction(
      async (_state, { image, file }: { image: Image; file: File }) => {
        const ref = db.collection("photos").doc();
        return firebase
          .storage()
          .ref()
          .child(ref.id)
          .put(file, { contentType: file.type })
          .then(() => ref.set(image));
      }
    ),
    addCommentToImg: firestoreAction(
      (_state, { photoId, comment }: { photoId: string; comment: Comment }) => {
        db.collection("photos")
          .doc(photoId)
          .update({
            comments: firestore.FieldValue.arrayUnion(comment)
          });
      }
    ),
    voteImage: firestoreAction(
      (
        _state,
        {
          photoId,
          likes,
          dislikes
        }: { photoId: string; likes: number; dislikes: number }
      ) => {
        db.collection("photos")
          .doc(photoId)
          .update({
            likes,
            dislikes
          });
      }
    ),
    editImage: firestoreAction(
      (
        _state,
        {
          photoId,
          title,
          description,
          tags
        }: {
          photoId: string;
          title: number;
          description: number;
          tags: Array<Tag>;
        }
      ) => {
        db.collection("photos")
          .doc(photoId)
          .update({
            title,
            description,
            tags: tags.map(tag => db.collection("tags").doc(tag.id))
          });
      }
    ),
    deleteImage: firestoreAction((_state, photoId: string) => {
      firebase
        .storage()
        .ref()
        .child(photoId)
        .delete();
      db.collection("photos")
        .doc(photoId)
        .delete();
    })
  },

  mutations: vuexfireMutations
};

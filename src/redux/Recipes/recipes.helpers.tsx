import firebase from "firebase/app";
import { db, storage } from "../../firebase/utils";
import { Query } from "@firebase/firestore-types";

interface Filters {
  authorFilter: string;
  queryFilter: string;
  favoriteFilter: string;
  popularFilter: true;
  counter: number;
  startAfterDoc: any;
  persistProducts?: any[];
}

export const handleFetchRecipes = (filters: Filters) => {
  return new Promise((resolve, reject) => {
    let ref: Query = db.collection("recipes");
    let {
      authorFilter,
      queryFilter,
      favoriteFilter,
      popularFilter,
      counter,
      startAfterDoc,
      persistProducts = [],
    } = filters;

    if (queryFilter) {
      ref = ref.where("tags", "array-contains", queryFilter);
    }

    if (authorFilter) {
      ref = ref.where("authorId", "==", authorFilter);
    }

    if (popularFilter) {
      ref = ref.orderBy("likesQuantity", "desc");
    } else {
      ref = ref.orderBy("timestamp", "desc");
    }

    if (favoriteFilter) {
      ref = ref.where("likesUsers", "array-contains", favoriteFilter);
    }

    if (startAfterDoc) ref = ref.startAfter(startAfterDoc);

    ref
      .limit(counter)
      .get()
      .then((snapshot) => {
        const totalCount = snapshot.size;

        const data = [
          ...persistProducts,
          ...snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              data: doc.data(),
            };
          }),
        ];

        resolve({
          data,
          queryDoc: snapshot.docs[totalCount - 1],
          isLastPage: totalCount < counter,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleLikeRecipe = (userId, recipeId) => {
  db.collection("recipes")
    .doc(recipeId)
    .update({
      likesUsers: firebase.firestore.FieldValue.arrayUnion(userId),
      likesQuantity: firebase.firestore.FieldValue.increment(1),
    });
};

export const handleDislikeRecipe = (userId, recipeId) => {
  db.collection("recipes")
    .doc(recipeId)
    .update({
      likesUsers: firebase.firestore.FieldValue.arrayRemove(userId),
      likesQuantity: firebase.firestore.FieldValue.increment(-1),
    });
};

export const handleDeleteRecipe = (storageRef: string, recipeId: string) => {
  db.collection("recipes").doc(recipeId).delete();
  storage.refFromURL(storageRef).delete();
};

export const handleCreateRecipe = ({ payload }) => {
  return new Promise((resolve, reject) => {
    const {
      authorId,
      authorProfilePic,
      authorName,
      type,
      title,
      tags,
      ingredients,
      method,
      timestamp,
      likesUsers,
      likesQuantity,
      portions,
      img,
      handleProgress,
    } = payload;
    const imageName = new Date().getTime() + img.name;

    storage
      .ref(`recipeImages/${authorId}/${title}/${imageName}`)
      .put(img)
      .on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          handleProgress(progress);
        },
        (error) => {
          alert(error.message);
        },
        () => {
          storage
            .ref(`recipeImages/${authorId}/${title}`)
            .child(imageName)
            .getDownloadURL()
            .then((url) => {
              db.collection("recipes").add({
                authorId: authorId,
                authorProfilePic: authorProfilePic,
                authorName: authorName,
                type: type,
                title: title,
                tags: tags,
                ingredients: ingredients,
                method: method,
                timestamp: timestamp,
                likesUsers: likesUsers,
                likesQuantity: likesQuantity,
                portions: portions,
                image: url,
              });
              resolve(true);
            });
        }
      );
  });
};

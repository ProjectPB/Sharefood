import { db, storage } from "./../../firebase/utils";
import firebase from "firebase/app";

export const handleFetchRecipes = ({
  authorFilter,
  queryFilter,
  favoriteFilter,
  popularFilter,
}) => {
  return new Promise((resolve, reject) => {
    let ref = db.collection("recipes");

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

    ref
      .get()
      .then((snapshot) => {
        const data = [
          ...snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              data: doc.data(),
            };
          }),
        ];

        resolve(data);
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

export const handleDeleteRecipe = (storageRef, recipeId) => {
  db.collection("recipes").doc(recipeId).delete();
  storage.refFromURL(storageRef).delete();
};

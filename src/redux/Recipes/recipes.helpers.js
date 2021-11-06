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
      .ref(`recipeImages/${imageName}`)
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
            .ref("recipeImages")
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

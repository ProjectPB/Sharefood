import firebase from "firebase/app";
import { db, storage } from "../../firebase/utils";
import { Query } from "@firebase/firestore-types";
import { Filters } from "../../shared/types";
import { createRecipeStart } from "./recipes.actions";

export const handleGetUserData = (userId: string): Promise<{ profilePic: string, username: string }> => {
  return new Promise((resolve, reject) => {
    db.collection('users').doc(userId).get().then((doc) => {
      resolve({ profilePic: doc.data().profilePic, username: doc.data().displayName })
    })
      .catch(err => {
        reject(err.message);
      })
  })
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
        const queryDoc = snapshot.docs[totalCount - 1];
        const isLastPage = totalCount < counter;

        const data = [
          ...persistProducts,
          ...snapshot.docs.map(async (doc) => {
            let { profilePic, username } = await handleGetUserData(doc.data().authorId);
            return {
              id: doc.id,
              data: { ...doc.data(), profilePic, username },
            }
          })
        ];

        Promise.all(data).then((value) => resolve({
          data: value,
          queryDoc,
          isLastPage,
        }));
      })
      .catch(err => {
        reject(err.message);
      })
  }
  )
};

export const handleLikeRecipe = (userId: string, recipeId: string) => {
  db.collection("recipes")
    .doc(recipeId)
    .update({
      likesUsers: firebase.firestore.FieldValue.arrayUnion(userId),
      likesQuantity: firebase.firestore.FieldValue.increment(1),
    });
};

export const handleDislikeRecipe = (userId: string, recipeId: string) => {
  db.collection("recipes")
    .doc(recipeId)
    .update({
      likesUsers: firebase.firestore.FieldValue.arrayRemove(userId),
      likesQuantity: firebase.firestore.FieldValue.increment(-1),
    });
};

export const handleDeleteRecipe = (storageRef: string, recipeId: string) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection("recipes").doc(recipeId).delete()
        .then(() => {
          storage.refFromURL(storageRef).delete()
            .then(() => {
              resolve(true)
            })
        })
    } catch (err) {
      reject(err.message)
    }
  })
};

export const handleCreateRecipe = ({ payload }: ReturnType<typeof createRecipeStart>) => {
  return new Promise((resolve, reject) => {
    const {
      authorId,
      type,
      authorProfilePic,
      authorName,
      title,
      tags,
      ingredients,
      method,
      timestamp,
      likesUsers,
      likesQuantity,
      portions,
      imgFile,
      handleProgress,
    } = payload;
    const imageName = new Date().getTime() + imgFile.name;

    storage
      .ref(`recipeImages/${authorId}/${title}/${imageName}`)
      .put(imgFile)
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
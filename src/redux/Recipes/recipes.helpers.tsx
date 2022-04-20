import firebase from "firebase/compat/app";
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

export const checkIfLiked = (userId: string, data: firebase.firestore.DocumentData) => {
  return new Promise<boolean>((resolve, reject) => {
    try {
      if (data?.likesUsers?.includes(userId)) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error.message)
    }

  })
}

export const handleFetchRecipes = (filters: Filters) => {
  return new Promise((resolve, reject) => {
    let ref: Query = db.collection("recipes");
    let {
      authorFilter,
      favoriteFilter,
      popularFilter,
      counter,
      startAfterDoc,
      persistProducts = [],
    } = filters;

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
  })
};

export const handleFetchRecipeData = (recipeId: string, userId?: string) => {
  return new Promise((resolve, reject) => {
    db.collection("recipes")
      .doc(recipeId)
      .get()
      .then(async (doc) => {
        if (doc.data()) {
          let { profilePic, username } = await handleGetUserData(doc.data()?.authorId);
          let liked = await checkIfLiked(userId, doc.data());
          resolve({ ...doc.data(), profilePic, username, liked });
        }
        else {
          resolve(null);
        }
      })
      .catch(err => {
        reject(err.message)
      })
  })
}

export const handleLikeRecipe = (userId: string, recipeId: string) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection("recipes")
        .doc(recipeId)
        .update({
          likesUsers: firebase.firestore.FieldValue.arrayUnion(userId),
          likesQuantity: firebase.firestore.FieldValue.increment(1),
        });
      resolve(true);
    } catch (err) {
      reject(err.message)
    }
  })
};

export const handleDislikeRecipe = (userId: string, recipeId: string) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection("recipes")
        .doc(recipeId)
        .update({
          likesUsers: firebase.firestore.FieldValue.arrayRemove(userId),
          likesQuantity: firebase.firestore.FieldValue.increment(-1),
        })
      resolve(true);
    } catch (err) {
      reject(err.message)
    }
  })
};

export const handleDeleteRecipe = (imageRef: string, imageLowRef: string, recipeId: string) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection("recipes").doc(recipeId).delete()
        .then(() => {
          storage.refFromURL(imageRef).delete()
          storage.refFromURL(imageLowRef).delete()
            .then(() => {
              resolve(true)
            })
        })
    } catch (err) {
      reject(err.message);
    }
  })
};

const putImgToStorage = (file: any, refString: string) => {
  return new Promise((resolve, reject) => {
    try {
      let ref = storage.ref(refString)
      ref.put(file).then(() => resolve(ref.getDownloadURL()))
    } catch (error) {
      reject(error.message)
    }
  })
}

export const handleCreateRecipe = ({ payload }: ReturnType<typeof createRecipeStart>) => {
  return new Promise((resolve, reject) => {
    const {
      authorId,
      type,
      title,
      ingredients,
      method,
      timestamp,
      likesUsers,
      likesQuantity,
      portions,
      imgFileHigh,
      imgFileLow,
      handleAdd,
      description
    } = payload;
    const imageName_highRes: string = new Date().getTime() + imgFileHigh.name + '_HIGH';
    const imageName_lowRes: string = new Date().getTime() + imgFileLow.name + "_LOW";

    const urls: { highResImg: string, lowResImg: string } = {
      highResImg: "", lowResImg: ""
    };
    const putHighResImg = putImgToStorage(imgFileHigh, `recipeImages/${authorId}/${title}/${imageName_highRes}`).then((res: string) => (urls.highResImg = res));
    const putLowResImg = putImgToStorage(imgFileLow, `recipeImages/${authorId}/${title}/${imageName_lowRes}`).then((res: string) => (urls.lowResImg = res));

    Promise.all([putHighResImg, putLowResImg])
      .then(() => {
        handleAdd(true);
      })
      .then(() => {
        db.collection('recipes').add({
          authorId: authorId,
          type: type,
          description: description,
          title: title,
          ingredients: ingredients,
          method: method,
          timestamp: timestamp,
          likesUsers: likesUsers,
          likesQuantity: likesQuantity,
          portions: portions,
          image: urls.highResImg,
          imageLow: urls.lowResImg,
        });
        resolve(true);
      }).catch(err => {
        reject(err.message);
      });
  });
};
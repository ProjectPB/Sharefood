import firebase from "firebase/compat/app";
import { db, storage } from "../../firebase/utils";
import { handleGetUserData } from './../Recipes/recipes.helpers'
import { createRecipeStart } from "./recipe.actions";

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

export const handleLikeRecipe = (userId: string, recipeId: string) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection("recipes")
        .doc(recipeId)
        .update({
          // eslint-disable-next-line 
          ['stats.likesQuantity']: firebase.firestore.FieldValue.increment(1),
          likesUsers: firebase.firestore.FieldValue.arrayUnion(userId),
        });
      resolve(true);
    } catch (err) {
      reject(err.message)
    }
  })
};

export const handleViewRecipe = (recipeId: string) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection("recipes")
        .doc(recipeId)
        .update({
          // eslint-disable-next-line 
          ['stats.views']: firebase.firestore.FieldValue.increment(1),
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
          // eslint-disable-next-line 
          ['stats.likesQuantity']: firebase.firestore.FieldValue.increment(-1),
          likesUsers: firebase.firestore.FieldValue.arrayRemove(userId),
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
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          likesUsers: [],
          portions: portions,
          image: urls.highResImg,
          imageLow: urls.lowResImg,
          stats: {
            likesQuantity: 0,
            views: 0,
          }
        });
        resolve(true);
      }).catch(err => {
        console.log(err.message);
        reject(err.message);
      });
  });
};
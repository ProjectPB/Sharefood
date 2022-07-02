import firebase from "firebase/compat/app";
import { db } from "../../firebase/utils";
import { Query } from "@firebase/firestore-types";
import { FiltersTypes } from "../../shared/types";

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

export const handleFetchRecipes = (filters: FiltersTypes) => {
  return new Promise((resolve, reject) => {
    let ref: Query = db.collection("recipes");
    let {
      authorFilter,
      userId,
      favoriteFilter,
      statsFilter,
      typeFilter,
      counter,
      excludeId,
      startAfterDoc,
      persistProducts = [],
    } = filters;

    if (excludeId) {
      ref = ref.where(firebase.firestore.FieldPath.documentId(), '!=', excludeId)
    }

    if (authorFilter) {
      ref = ref.where("authorId", "==", authorFilter);
    }

    if (statsFilter === 'likes') {
      ref = ref.orderBy("stats.likesQuantity", "desc");
    } else if (statsFilter === 'views') {
      ref = ref.orderBy('stats.views', 'desc')
    } else if (excludeId) {
      ref = ref.orderBy(firebase.firestore.FieldPath.documentId());
    } else {
      ref = ref.orderBy("timestamp", "desc");
    }

    if (favoriteFilter) {
      ref = ref.where("likesUsers", "array-contains", favoriteFilter);
    }

    if (typeFilter && typeFilter !== 'all') {
      ref = ref.where("type", "==", typeFilter);
    }

    if (userId) {
      ref = ref.where('authorId', '==', userId)
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
        console.log(err.message);
        reject(err.message);
      })
  })
};

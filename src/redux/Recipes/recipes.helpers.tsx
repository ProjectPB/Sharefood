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
      sortFilter,
      typeFilter,
      tagFilter,
      counter,
      excludeId,
      language,
      startAfterDoc,
      persistRecipes = [],
    } = filters;

    if (excludeId) {
      ref = ref.where(firebase.firestore.FieldPath.documentId(), '!=', excludeId)
    }

    if (authorFilter) {
      ref = ref.where("authorId", "==", authorFilter);
    }

    if (sortFilter === 'likes') {
      ref = ref.orderBy("stats.likesQuantity", "desc");
    } else if (sortFilter === 'views') {
      ref = ref.orderBy('stats.views', 'desc')
    } else if (sortFilter === 'recent') {
      ref = ref.orderBy("timestamp", "desc");
    } else if (sortFilter === 'oldest') {
      ref = ref.orderBy('timestamp', 'asc');
    } else if (excludeId) {
      ref = ref.orderBy(firebase.firestore.FieldPath.documentId());
    }

    if (favoriteFilter) {
      ref = ref.where("likesUsers", "array-contains", favoriteFilter);
    }

    if (typeFilter && typeFilter !== 'all') {
      ref = ref.where("type", "==", typeFilter);
    }

    if (tagFilter && tagFilter !== 'all') {
      ref = ref.where('tags', "array-contains", tagFilter)
    }

    if (userId) {
      ref = ref.where('authorId', '==', userId)
    }

    if (language) {
      ref = ref.where('language', '==', language);
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
          ...persistRecipes,
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

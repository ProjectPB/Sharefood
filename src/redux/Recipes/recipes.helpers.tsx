import { db } from "../../firebase/utils";
import { Query } from "@firebase/firestore-types";
import { Filters } from "../../shared/types";

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
      favoriteFilter,
      popularFilter,
      typeFilter,
      counter,
      startAfterDoc,
      persistProducts = [],
    } = filters;

    if (authorFilter) {
      ref = ref.where("authorId", "==", authorFilter);
    }

    if (popularFilter) {
      ref = ref.orderBy("stats.likesQuantity", "desc");
    } else {
      ref = ref.orderBy("timestamp", "desc");
    }

    if (favoriteFilter) {
      ref = ref.where("likesUsers", "array-contains", favoriteFilter);
    }

    if (typeFilter) {
      ref = ref.where("type", "==", typeFilter);
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

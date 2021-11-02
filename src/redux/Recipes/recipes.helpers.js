import { db } from "./../../firebase/utils";

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

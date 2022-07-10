import { db } from "../../firebase/utils";
import { CollectionData, Recipe } from "../../shared/types";
import { handleFetchSelectedRecipe } from "../Recipe/recipe.helpers";

export const handleFetchCollectionData = (collectionId: string) => {
  return new Promise((resolve, reject) => {
    db.collection("collections")
      .doc(collectionId)
      .get()
      .then((doc) => {
        resolve(doc.data());
      })
      .catch(error => {
        console.log(error);
        reject(error);
      })
  })
}

export const handleFetchBanner = (ids: string[]) => {
  return new Promise((resolve, reject) => {
    const recipes = ids.map(async (id) => (
      await handleFetchCollectionData(id)
    ))
    Promise.all(recipes).then((value) => {
      resolve(value);
    }).catch((err) => {
      reject(err)
    })
  })
}

export const handleFetchCollectionRecipes = (ref: string[]) => {
  return new Promise((resolve, reject) => {
    try {
      const recipes = ref.map(async (id) => (
        await handleFetchSelectedRecipe(id)
      ))
      Promise.all(recipes).then((value) => {
        resolve(value);
      })
    } catch (error) {
      console.log(error);
      reject(error);
    }
  })
}

export const handleFetchCollection = ({ collectionId, language }: { collectionId: string, language: string }) => {
  return new Promise((resolve, reject) => {
    try {
      if (language === 'english') {
        handleFetchCollectionData(collectionId).then((data: CollectionData) => {
          if (data) {
            handleFetchCollectionRecipes(data.eng_recipes).then((recipes: Recipe[]) => {
              resolve({
                data: data,
                recipes: {
                  data: recipes,
                  queryDoc: null,
                  isLastPage: null,
                },
              })
            })
          } else {
            resolve({
              data: null,
              recipes: {
                data: [],
                queryDoc: null,
                isLastPage: null,
              },
            });
          }
        })
      }

      if (language === 'polish') {
        handleFetchCollectionData(collectionId).then((data: CollectionData) => {
          if (data) {
            handleFetchCollectionRecipes(data.pl_recipes).then((recipes: Recipe[]) => {
              resolve({
                data: data,
                recipes: {
                  data: recipes,
                  queryDoc: null,
                  isLastPage: null,
                },
              })
            })
          } else {
            resolve({
              data: null,
              recipes: {
                data: [],
                queryDoc: null,
                isLastPage: null,
              },
            });
          }
        })
      }
    } catch (error) {
      reject(error);
      console.log(error);
    }
  })
}
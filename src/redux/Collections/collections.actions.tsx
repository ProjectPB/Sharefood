import collectionsTypes from "./collections.types";
import { CollectionData, Recipe } from "../../shared/types";

export const fetchCollectionStart = (data: { collectionId: string, language: string }) => ({
  type: collectionsTypes.FETCH_COLLECTION,
  payload: data,
})

export const setCollection = (data: CollectionData) => ({
  type: collectionsTypes.SET_COLLECTION,
  payload: data,
})

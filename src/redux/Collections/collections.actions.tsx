import collectionsTypes from "./collections.types";
import { CollectionData } from "../../shared/types";

export const fetchCollectionStart = (data: { collectionId: string, language: string }) => ({
  type: collectionsTypes.FETCH_COLLECTION,
  payload: data,
})

export const setCollection = (data: CollectionData) => ({
  type: collectionsTypes.SET_COLLECTION,
  payload: data,
})

export const fetchBannerDataStart = (ids: string[]) => ({
  type: collectionsTypes.FETCH_BANNER_DATA,
  payload: ids,
})

export const setBanner = (data: CollectionData[]) => ({
  type: collectionsTypes.SET_BANNER,
  payload: data,
})
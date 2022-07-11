import collectionsTypes from "./collections.types";
import { CollectionData, User } from "../../shared/types";

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

export const fetchTopUsersStart = (filters: { topFilter: string; activeFilter: string; }) => ({
  type: collectionsTypes.FETCH_TOP_USERS,
  payload: filters,
})

export const setTopUsers = (data: User[]) => ({
  type: collectionsTypes.SET_TOP_USERS,
  payload: data,
})

export const setActiveUsers = (data: User[]) => ({
  type: collectionsTypes.SET_ACTIVE_USERS,
  payload: data,
})
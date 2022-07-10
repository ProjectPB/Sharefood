import { Collections } from "../../shared/types";
import collectionsTypes from "./collections.types";

const INITIAL_STATE: Collections = {
  collection: {
    id: "",
    pl_title: '',
    eng_title: '',
    color: '',
    img: '',
    eng_recipes: [],
    pl_recipes: [],
  },
  banner: [],
}

const collectionsReducer = (state = INITIAL_STATE, action: { type: string; payload: any }) => {
  switch (action.type) {
    case collectionsTypes.SET_COLLECTION:
      return {
        ...state,
        collection: action.payload
      }
    case collectionsTypes.SET_BANNER:
      return {
        ...state,
        banner: action.payload
      }
    default: return state;
  }
}

export default collectionsReducer;
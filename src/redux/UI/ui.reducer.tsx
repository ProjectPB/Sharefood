import uiTypes from "./ui.types";
import { State } from "../../shared/types";

const INITIAL_STATE: State["ui"] = {
  sidebarOpen: true,
  lastDisplayedProfile: "",
  language: 'english',
  lastDisplayedCollection: "",
};

const uiReducer = (state = INITIAL_STATE, action: { type: string, payload: string }) => {
  switch (action.type) {
    case uiTypes.OPEN_SIDEBAR:
      return {
        ...state,
        sidebarOpen: true,
      };
    case uiTypes.CLOSE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: false,
      };
    case uiTypes.SET_LAST_DISPLAYED_PROFILE:
      return {
        ...state,
        lastDisplayedProfile: action.payload,
      };
    case uiTypes.SET_LAST_DISPLAYED_COLLECTION:
      return {
        ...state,
        lastDisplayedCollection: action.payload,
      }
    case uiTypes.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      }
    default:
      return state;
  }
};

export default uiReducer;

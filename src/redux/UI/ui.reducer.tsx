import uiTypes from "./ui.types";
import { State } from "../../shared/types";

const INITIAL_STATE: State["ui"] = {
  sidebarOpen: true,
};

const uiReducer = (state = INITIAL_STATE, action: { type: string }) => {
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
    default:
      return state;
  }
};

export default uiReducer;

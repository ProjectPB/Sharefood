import uiTypes from "./ui.types";

const INITIAL_STATE = {
  sidebarOpen: true,
};

const uiReducer = (state = INITIAL_STATE, action) => {
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

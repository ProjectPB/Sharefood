import uiTypes from "./ui.types";

export const openSidebar = () => ({
  type: uiTypes.OPEN_SIDEBAR,
});

export const closeSidebar = () => ({
  type: uiTypes.CLOSE_SIDEBAR,
});

export const setLastDisplayedProfile = (id: string) => ({
  type: uiTypes.SET_LAST_DISPLAYED_PROFILE,
  payload: id
})
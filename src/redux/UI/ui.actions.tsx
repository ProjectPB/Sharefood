import uiTypes from "./ui.types";

export const openSidebar = () => ({
  type: uiTypes.OPEN_SIDEBAR,
});

export const closeSidebar = () => ({
  type: uiTypes.CLOSE_SIDEBAR,
});

export const setLastDisplayedProfile = (id: string) => ({
  type: uiTypes.SET_LAST_DISPLAYED_PROFILE,
  payload: id,
})

export const setLastDisplayedCollection = (id: string) => ({
  type: uiTypes.SET_LAST_DISPLAYED_COLLECTION,
  payload: id,
})

export const changeLanguageStart = (lang: string) => ({
  type: uiTypes.CHANGE_LANGUAGE,
  payload: lang,
})

export const setLanguage = (lang: string) => ({
  type: uiTypes.SET_LANGUAGE,
  payload: lang,
})
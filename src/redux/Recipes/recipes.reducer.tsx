import recipesTypes from "./recipes.types";
import { Recipes } from "../../shared/types";

const INITIAL_STATE: Recipes = {
  recipes: {
    homeRecentRecipes: {
      data: [],
      queryDoc: null,
      isLastPage: false,
    },
    homePopularRecipes: {
      data: [],
      queryDoc: null,
      isLastPage: false,
    },
    allRecipes: {
      data: [],
      queryDoc: null,
      isLastPage: false,
    },
    myRecipes: {
      data: [],
      queryDoc: null,
      isLastPage: false,
    },
    favoriteRecipes: {
      data: [],
      queryDoc: null,
      isLastPage: false,
    },
    userRecipes: {
      data: [],
      queryDoc: null,
      isLastPage: false,
    },
    relatedRecipes: {
      data: [],
      queryDoc: null,
      isLastPage: false,
    }
  },
  scrollDistance: {
    home: 0,
    all: 0,
    my: 0,
    favorite: 0,
    user: 0,
  },
  filters: {
    sort: "recent",
    type: "all",
    tag: "all",
  }
};

const recipesReducer = (state = INITIAL_STATE, action: { type: string; payload: Recipes }) => {
  switch (action.type) {
    case recipesTypes.SET_HOME_RECENT_RECIPES:
      return {
        ...state,
        recipes: { ...state.recipes, homeRecentRecipes: action.payload, }
      };
    case recipesTypes.SET_HOME_POPULAR_RECIPES:
      return {
        ...state,
        recipes: { ...state.recipes, homePopularRecipes: action.payload, },
      };
    case recipesTypes.SET_ALL_RECIPES:
      return {
        ...state,
        recipes: { ...state.recipes, allRecipes: action.payload },
      };
    case recipesTypes.SET_MY_RECIPES:
      return {
        ...state,
        recipes: { ...state.recipes, myRecipes: action.payload },
      };
    case recipesTypes.SET_FAVORITE_RECIPES:
      return {
        ...state,
        recipes: { ...state.recipes, favoriteRecipes: action.payload },
      };
    case recipesTypes.SET_USER_RECIPES:
      return {
        ...state,
        recipes: { ...state.recipes, userRecipes: action.payload },
      };
    case recipesTypes.SET_RELATED_RECIPES:
      return {
        ...state,
        recipes: { ...state.recipes, relatedRecipes: action.payload },
      };
    case recipesTypes.SET_HOME_SCROLL_DISTANCE:
      return {
        ...state,
        scrollDistance: { ...state.scrollDistance, home: action.payload }
      }
    case recipesTypes.SET_ALL_SCROLL_DISTANCE:
      return {
        ...state,
        scrollDistance: { ...state.scrollDistance, all: action.payload }
      }
    case recipesTypes.SET_MY_SCROLL_DISTANCE:
      return {
        ...state,
        scrollDistance: { ...state.scrollDistance, my: action.payload }
      }
    case recipesTypes.SET_FAVORITE_SCROLL_DISTANCE:
      return {
        ...state,
        scrollDistance: { ...state.scrollDistance, favorite: action.payload }
      }
    case recipesTypes.SET_USER_SCROLL_DISTANCE:
      return {
        ...state,
        scrollDistance: { ...state.scrollDistance, user: action.payload }
      }
    case recipesTypes.SET_SORT_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters, sort: action.payload,
        }
      }
    case recipesTypes.SET_TYPE_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters, type: action.payload,
        }
      }
    case recipesTypes.SET_TAG_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters, tag: action.payload,
        }
      }
    default:
      return state;
  }
};

export default recipesReducer;

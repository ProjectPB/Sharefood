import recipesTypes from "./recipes.types";
import { Recipes } from "../../shared/types";

const INITIAL_STATE: Recipes = {
  recipes: {
    mainRecipes: {
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
    main: 0,
    all: 0,
    my: 0,
    favorite: 0,
    user: 0,
  },
  filters: {
    type: "all",
    stats: "views",
  }
};

const recipesReducer = (state = INITIAL_STATE, action: { type: string; payload: Recipes }) => {
  switch (action.type) {
    case recipesTypes.SET_MAIN_RECIPES:
      return {
        ...state,
        recipes: { ...state.recipes, mainRecipes: action.payload },
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
    case recipesTypes.SET_MAIN_SCROLL_DISTANCE:
      return {
        ...state,
        scrollDistance: { ...state.scrollDistance, main: action.payload }
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
    case recipesTypes.SET_STATS_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters, stats: action.payload,
        }
      }
    case recipesTypes.SET_TYPE_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters, type: action.payload,
        }
      }
    default:
      return state;
  }
};

export default recipesReducer;

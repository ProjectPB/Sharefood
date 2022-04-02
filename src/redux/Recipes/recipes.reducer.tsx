import recipesTypes from "./recipes.types";
import { Recipes } from "../../shared/types";

const INITIAL_STATE: Recipes = {
  recipes: {
    queryRecipes: {
      data: [],
      queryDoc: null,
      isLastPage: false,
    },
    mainRecipes: {
      data: [],
      queryDoc: null,
      isLastPage: false,
    },
    popularRecipes: {
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
  },
  recipeData: undefined,
  scrollDistance: {
    main: 0,
    popular: 0,
    my: 0,
    favorite: 0,
  }
};

const recipesReducer = (state = INITIAL_STATE, action: { type: string; payload: Recipes }) => {
  switch (action.type) {
    case recipesTypes.SET_QUERY_RECIPES:
      return {
        ...state,
        recipes: { ...state.recipes, queryRecipes: action.payload },
      };
    case recipesTypes.SET_MAIN_RECIPES:
      return {
        ...state,
        recipes: { ...state.recipes, mainRecipes: action.payload },
      };
    case recipesTypes.SET_POPULAR_RECIPES:
      return {
        ...state,
        recipes: { ...state.recipes, popularRecipes: action.payload },
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
    case recipesTypes.SET_RECIPE_DATA:
      return {
        ...state,
        recipeData: action.payload
      }
    case recipesTypes.SET_MAIN_SCROLL_DISTANCE:
      return {
        ...state,
        scrollDistance: { ...state.scrollDistance, main: action.payload }
      }
    case recipesTypes.SET_POPULAR_SCROLL_DISTANCE:
      return {
        ...state,
        scrollDistance: { ...state.scrollDistance, popular: action.payload }
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
    default:
      return state;
  }
};

export default recipesReducer;

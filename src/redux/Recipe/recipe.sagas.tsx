import { takeLatest, call, all, put } from "redux-saga/effects";
import { Comments, RecipeData } from "../../shared/types";
import { addCommentStart, addStoreCommentStart, createRecipeStart, deleteCommentStart, deleteStoreCommentStart, dislikeRecipeStart, fetchCommentsStart, fetchRecipeDataStart, likeRecipeStart, setComments, setRecipeData } from "./recipe.actions";
import { handleAddComment, handleCreateRecipe, handleDeleteComment, handleDislikeRecipe, handleFetchComments, handleFetchRecipeData, handleLikeRecipe, handleViewRecipe } from "./recipe.helpers";
import { setFavoriteRecipes } from './../Recipes/recipes.actions'
import { loadRecipeData } from "../Loading/loading.actions";
import recipeTypes from "./recipe.types";

export function* fetchRecipeData({ payload }: ReturnType<typeof fetchRecipeDataStart>) {
  try {
    const data: RecipeData = yield handleFetchRecipeData(payload.recipeId, payload.userId);
    yield handleViewRecipe(payload.recipeId);
    yield put(setRecipeData(data));
    yield put(loadRecipeData(true));
  } catch (err) {
    // console.log(err.message) 
  }
}

export function* onFetchRecipeDataStart() {
  yield takeLatest(recipeTypes.FETCH_RECIPE_DATA, fetchRecipeData);
}

export function* createRecipe(payload: ReturnType<typeof createRecipeStart>) {
  try {
    yield handleCreateRecipe(payload);
  } catch (err) {
    console.log(err.message);
  }
}

export function* onCreateRecipeStart() {
  yield takeLatest(recipeTypes.CREATE_RECIPE, createRecipe);
}

export function* likeRecipe({ payload }: ReturnType<typeof likeRecipeStart>) {
  try {
    yield put(setRecipeData({ ...payload.data, liked: true, stats: { ...payload.data.stats, likesQuantity: payload.data.stats.likesQuantity += 1 } }));
    yield handleLikeRecipe(payload.userId, payload.recipeId, payload.data.authorId);
    yield put(setFavoriteRecipes({
      data: [],
      queryDoc: null,
      isLastPage: false,
    }));
  } catch (error) {
    console.log(error.message)
  }
}

export function* onLikeRecipeStart() {
  yield takeLatest(recipeTypes.LIKE_RECIPE, likeRecipe);
}

export function* dislikeRecipe({ payload }: ReturnType<typeof dislikeRecipeStart>) {
  try {
    handleDislikeRecipe(payload.userId, payload.recipeId, payload.data.authorId);
    yield put(setRecipeData({ ...payload.data, liked: false, stats: { ...payload.data.stats, likesQuantity: payload.data.stats.likesQuantity -= 1 } }));
    yield put(setFavoriteRecipes({
      data: [],
      queryDoc: null,
      isLastPage: false,
    }));
  } catch (error) {
    console.log(error.message)
  }
}

export function* onDislikeRecipeStart() {
  yield takeLatest(recipeTypes.DISLIKE_RECIPE, dislikeRecipe);
}

export function* addComment({ payload: { text, authorId, recipeId, profilePic, username } }: ReturnType<typeof addCommentStart>) {
  try {
    const commentId: string = yield handleAddComment(text, authorId, recipeId);
    yield put(addStoreCommentStart({ text, authorId, profilePic, username, commentId }));
  } catch (error) {
    console.log(error.message)
  }
}

export function* onAddCommentStart() {
  yield takeLatest(recipeTypes.ADD_COMMENT, addComment);
}

export function* fetchComments({ payload }: ReturnType<typeof fetchCommentsStart>) {
  try {
    const commentsData: Comments = yield handleFetchComments(payload);
    yield put(setComments(commentsData));
  } catch (error) {
    console.log(error.message)
  }
}

export function* onFetchCommentsStart() {
  yield takeLatest(recipeTypes.FETCH_COMMENTS, fetchComments);
}

export function* deleteComment({ payload }: ReturnType<typeof deleteCommentStart>) {
  try {
    const resolve: boolean = yield handleDeleteComment(payload.commentId, payload.recipeId);
    if (resolve) {
      yield put(deleteStoreCommentStart(payload.commentId));
      alert(payload.alert);
    }
  } catch (error) {
    console.log(error.message)
  }
}

export function* onDeleteCommentStart() {
  yield takeLatest(recipeTypes.DELETE_COMMENT, deleteComment);
}

export default function* recipeSagas() {
  yield all([
    call(onCreateRecipeStart),
    call(onFetchRecipeDataStart),
    call(onFetchCommentsStart),
    call(onLikeRecipeStart),
    call(onDislikeRecipeStart),
    call(onAddCommentStart),
    call(onDeleteCommentStart),
  ]);
}
import { takeLatest, call, all, put } from "redux-saga/effects";
import { Comments, RecipeData } from "../../shared/types";
import { addCommentStart, addStoreCommentReplyStart, addStoreCommentStart, createRecipeStart, deleteCommentStart, deleteStoreCommentReplyStart, deleteStoreCommentStart, dislikeCommentStart, dislikeRecipeStart, fetchCommentsStart, fetchRecipeDataStart, likeCommentStart, likeRecipeStart, setComments, setRecipeData, setReplies } from "./recipe.actions";
import { handleAddComment, handleCreateRecipe, handleDeleteAllReplies, handleDeleteComment, handleDislikeComment, handleDislikeRecipe, handleFetchComments, handleFetchRecipeData, handleLikeComment, handleLikeRecipe, handleReplyCounter, handleViewRecipe } from "./recipe.helpers";
import { setFavoriteRecipes } from './../Recipes/recipes.actions'
import { loadRecipeData } from "../Loading/loading.actions";
import recipeTypes from "./recipe.types";
import { handleUserActivity } from "../User/user.helpers";

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

export function* createRecipe({ payload }: ReturnType<typeof createRecipeStart>) {
  try {
    const created: boolean = yield handleCreateRecipe(payload);
    if (created) {
      yield handleUserActivity(payload.authorId, 2)
    };
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

export function* fetchComments({ payload }: ReturnType<typeof fetchCommentsStart>) {
  try {
    const commentsData: Comments = yield handleFetchComments(payload);
    yield put(setComments(commentsData));
    yield payload.handleSuccess();
  } catch (error) {
    console.log(error.message)
  }
}

export function* onFetchCommentsStart() {
  yield takeLatest(recipeTypes.FETCH_COMMENTS, fetchComments);
}

export function* addComment({ payload: { text, parentId, replyToId, authorId, recipeId, profilePic, username, handleSuccess } }: ReturnType<typeof addCommentStart>) {
  try {
    const commentId: string = yield handleAddComment(text, authorId, recipeId, parentId, replyToId);
    if (!parentId) {
      yield put(addStoreCommentStart({ text, authorId, parentId, replyToId, profilePic, username, commentId, repliesQuantity: 0 }));
    } else if (parentId) {
      yield put(addStoreCommentReplyStart({ text, authorId, parentId, replyToId, profilePic, username, commentId, repliesQuantity: 0, isNewReply: true }));
      yield handleReplyCounter(recipeId, parentId, 1);
    }
    yield handleUserActivity(authorId, 0.25);

    yield handleSuccess();

  } catch (error) {
    console.log(error.message)
  }
}

export function* onAddCommentStart() {
  yield takeLatest(recipeTypes.ADD_COMMENT, addComment);
}

export function* deleteComment({ payload: { commentId, recipeId, parentId, authorId, recipeAuthorId, repliesQuantity, handleSuccess } }: ReturnType<typeof deleteCommentStart>) {
  try {
    yield handleDeleteComment(commentId, recipeId);

    if (repliesQuantity > 0) {
      yield handleDeleteAllReplies({ recipeId: recipeId, commentId: commentId });
    }

    yield handleUserActivity(authorId, -0.25);

    if (!parentId) {
      yield put(deleteStoreCommentStart(commentId));
    } else if (parentId) {
      yield handleReplyCounter(recipeId, parentId, -1);
      yield put(deleteStoreCommentReplyStart({ parentId: parentId, commentId: commentId }));
    }

    yield handleSuccess();
  } catch (error) {
    console.log(error.message)
  }
}

export function* onDeleteCommentStart() {
  yield takeLatest(recipeTypes.DELETE_COMMENT, deleteComment);
}

export function* likeComment({ payload }: ReturnType<typeof likeCommentStart>) {
  try {
    yield handleLikeComment(payload.userId, payload.recipeId, payload.commentId);
  } catch (error) {
    console.log(error.message)
  }
}

export function* onLikeCommentStart() {
  yield takeLatest(recipeTypes.LIKE_COMMENT, likeComment);
}

export function* dislikeComment({ payload }: ReturnType<typeof dislikeCommentStart>) {
  try {
    yield handleDislikeComment(payload.userId, payload.recipeId, payload.commentId,);
  } catch (error) {
    console.log(error.message)
  }
}

export function* onDislikeCommentStart() {
  yield takeLatest(recipeTypes.DISLIKE_COMMENT, dislikeComment);
}

export function* fetchReplies({ payload }: ReturnType<typeof fetchCommentsStart>) {
  try {
    const commentsData: Comments = yield handleFetchComments(payload);
    yield put(setReplies({ commentsData: commentsData, parentId: payload.parentId }));

    yield payload.handleSuccess();
  } catch (error) {
    console.log(error.message)
  }
}

export function* onFetchRepliesStart() {
  yield takeLatest(recipeTypes.FETCH_REPLIES, fetchReplies);
}

export default function* recipeSagas() {
  yield all([
    call(onCreateRecipeStart),
    call(onFetchRecipeDataStart),
    call(onFetchCommentsStart),
    call(onFetchRepliesStart),
    call(onLikeRecipeStart),
    call(onDislikeRecipeStart),
    call(onAddCommentStart),
    call(onDeleteCommentStart),
    call(onLikeCommentStart),
    call(onDislikeCommentStart)
  ]);
}
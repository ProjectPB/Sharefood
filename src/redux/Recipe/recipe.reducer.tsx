import recipeTypes from "./recipe.types";
import { Comments, RecipeData } from "../../shared/types";
import { handleAddStoreCommentReply, handleCommentsLikes, handleRemoveStoreComment, handleRemoveStoreCommentReply, handleSetRepliesData } from "./recipe.helpers";

const INITIAL_STATE: { recipeData: RecipeData, comments: Comments } = {
  recipeData: null,
  comments: {
    data: [],
    queryDoc: null,
    isLastPage: false,
    amount: 0,
    repliesFetched: [],
  }
};

const recipeReducer = (state = INITIAL_STATE, action: { type: string; payload: any }) => {
  switch (action.type) {
    case recipeTypes.SET_RECIPE_DATA:
      return {
        ...state,
        recipeData: action.payload,
      }
    case recipeTypes.SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      }
    case recipeTypes.SET_REPLIES:
      return {
        ...state,
        comments: {
          ...state.comments,
          repliesFetched: [...state.comments.repliesFetched, action.payload.parentId],
          data: handleSetRepliesData({ prevData: state.comments.data, newData: action.payload.commentsData.data, parentId: action.payload.parentId })
        }
      }
    case recipeTypes.ADD_STORE_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          amount: state.comments.amount + 1,
          data: [{
            id: action.payload.commentId,
            data: action.payload
          }, ...state.comments.data]
        },
      }
    case recipeTypes.ADD_STORE_COMMENT_REPLY:
      return {
        ...state,
        comments: {
          ...state.comments,
          data: handleAddStoreCommentReply({ prevComments: state.comments.data, data: action.payload })
        },
      }
    case recipeTypes.DELETE_STORE_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          amount: state.comments.amount - 1,
          data: handleRemoveStoreComment({ prevComments: state.comments.data, commentToRemove: action.payload })
        }
      }
    case recipeTypes.DELETE_STORE_COMMENT_REPLY:
      return {
        ...state,
        comments: {
          ...state.comments,
          data: handleRemoveStoreCommentReply({ prevComments: state.comments.data, parentId: action.payload.parentId, commentToRemove: action.payload.commentId })
        }
      }
    case recipeTypes.LIKE_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          data: handleCommentsLikes({ prevComments: state.comments.data, commentId: action.payload.commentId, likeStatus: true })
        }
      }
    case recipeTypes.DISLIKE_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          data: handleCommentsLikes({ prevComments: state.comments.data, commentId: action.payload.commentId, likeStatus: false, })
        }
      }
    default:
      return state;
  }
};

export default recipeReducer;

import firebase from "firebase/compat/app";

export interface CurrentUser {
  uid: string;
  displayName: string;
  profilePic: string;
  email: string;
  userRoles: string[];
}

export interface User {
  uid?: string;
  objectID?: string,
  profilePic: string;
  displayName: string;
  stats?: {
    recipesAdded?: number
    likesQuantity?: number
  }
}

export interface Credentials {
  displayName?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
}

export interface Loading {
  recipesLoaded: boolean;
  recipeDataLoaded: boolean;
  relatedRecipesLoaded: boolean;
  authLoading: boolean;
  homeRecentRecipesLoaded: boolean,
  homePopularRecipesLoaded: boolean,
  collectionLoaded: boolean,
  bannerLoaded: boolean,
  topUsersLoaded: boolean,
  profilePicLoading: boolean,
  deleteAccountLoading: boolean,
  usernameLoading: boolean,
}

export interface RecipeData {
  objectID?: string;
  authorId: string;
  description?: string,
  username?: string;
  profilePic?: string;
  image?: string;
  imageLow?: string;
  ingredients: string;
  tags: string[];
  likesUsers?: string[];
  liked?: boolean;
  method: string;
  portions: number;
  timestamp?: any;
  title: string;
  type: string;
  stats?: {
    likesQuantity: number;
    views: number;
  }
}

export interface NewRecipeData extends RecipeData {
  handleAdd: (val: boolean) => void;
  imgFileHigh: any;
  imgFileLow: any;
  tags: string[],
  language: string,
}

export interface FiltersTypes {
  lastDisplayedProfile?: string;
  queryFilter?: string;
  counter?: number;
  sortFilter?: string;
  userId?: string;
  typeFilter?: string,
  language?: string,
  tagFilter?: string,
  authorFilter?: string;
  favoriteFilter?: string;
  startAfterDoc?: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
  persistRecipes?: Recipe[];
  persistComments?: CommentType[];
  store?: string,
  rendered?: boolean;
  excludeId?: string;
  recipeId?: string;
  parentId?: string;
  commentsQuantity?: number;
  handleSuccess?: () => void;
}

export interface Recipe {
  id?: string;
  data?: RecipeData;
}

export interface SingleRecipes {
  data: Recipe[] | [];
  queryDoc: firebase.firestore.QueryDocumentSnapshot | undefined;
  isLastPage: boolean;
}

export interface Comments {
  data: CommentType[] | [];
  queryDoc: firebase.firestore.QueryDocumentSnapshot | undefined;
  isLastPage: boolean;
  amount: number;
  repliesFetched?: string[];
}

export interface CommentType {
  id: string,
  data: {
    commentId?: string,
    authorId: string,
    timestamp: any,
    text: string,
    likesUsers: [],
    profilePic?: string,
    username: string,
    liked?: boolean,
    parentId?: string,
    repliesQuantity?: number,
    repliesFetched?: boolean,
    isNewReply?: boolean,
  }
}

export interface Recipes {
  recipes: {
    homeRecentRecipes: SingleRecipes
    homePopularRecipes: SingleRecipes,
    allRecipes: SingleRecipes,
    myRecipes: SingleRecipes,
    favoriteRecipes: SingleRecipes,
    userRecipes: SingleRecipes,
    relatedRecipes: SingleRecipes,
    collectionRecipes: SingleRecipes,
  }
  scrollDistance: {
    home: number;
    all: number;
    my: number;
    favorite: number;
    user: number;
    collection: number;
  }
  filters: {
    type: string,
    sort: string,
    tag: string,
  }
}

export interface State {
  user: {
    currentUser: CurrentUser;
    signUpErrors: string[];
    passwordErrors: string[],
    usernameErrors: string[],
    resetPasswordErrors: string[];
    deleteAccountErrors: string[];
    resetPasswordSuccess: boolean;
  };
  ui: {
    sidebarOpen: boolean;
    lastDisplayedProfile: string;
    lastDisplayedCollection: string;
    language: string,
  };
  recipes: Recipes;
  loading: Loading;
  recipe: {
    recipeData: RecipeData,
    comments: Comments,
  };
  collections: Collections
}

export interface Collections {
  collection: CollectionData,
  banner: CollectionData[],
  topUsers: User[],
  activeUsers: User[],
}

export interface Option {
  label: string,
  value: string,
}

export interface CollectionData {
  pl_title?: string,
  eng_title?: string,
  color?: string,
  img?: string,
  eng_recipes?: string[],
  pl_recipes?: string[],
  id: string,
}

export interface Handler {
  form: React.FormEvent<HTMLFormElement>;
  change: React.ChangeEvent<HTMLInputElement>;
  input: React.InputHTMLAttributes<HTMLInputElement>;
  file: { target: { files: any[] } };
  string: { target: { value: React.SetStateAction<string> } };
  number: { target: { value: React.SetStateAction<number> } };
  void: { preventDefault: () => void };
}

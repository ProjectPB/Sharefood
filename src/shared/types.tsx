import firebase from "firebase";

export interface CurrentUser {
  uid: string;
  profilePic: string;
  displayName: string;
  email: string;
  userRoles: string[];
}

export interface Credentials {
  displayName?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
}

export interface Loading {
  homepageLoaded: boolean;
  recipesLoaded: boolean;
  recipeDataLoaded: boolean;
  authLoading: boolean;
}

export interface RecipeData {
  authorId: string;
  username?: string;
  profilePic?: string;
  image?: string;
  ingredients: string[];
  likesQuantity: number;
  likesUsers: string[];
  liked?: boolean;
  method: string[];
  portions: number;
  tags: string[];
  timestamp: any;
  title: string;
  type: string;
}

export interface NewRecipeData extends RecipeData {
  handleProgress: (val: number) => void;
  imgFile: any;
}

export interface Filters {
  queryFilter?: string;
  counter?: number;
  popularFilter?: boolean;
  authorFilter?: string;
  favoriteFilter?: string;
  startAfterDoc?: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
  persistProducts?: Recipe[];
}

export interface Recipe {
  id: string;
  data: RecipeData;
}

export interface Recipes {
  recipes: {
    data: Recipe[];
    queryDoc: firebase.firestore.QueryDocumentSnapshot;
    isLastPage: boolean;
  }
  recipeData: RecipeData,
}

export interface State {
  user: {
    currentUser: CurrentUser;
    signUpErrors: string[];
    resetPasswordSuccess: boolean;
    resetPasswordErrors: string[];
  };
  ui: {
    sidebarOpen: boolean;
  };
  recipes: Recipes;
  loading: Loading;
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

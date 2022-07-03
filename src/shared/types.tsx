import firebase from "firebase/compat/app";

export interface CurrentUser {
  uid: string;
  displayName: string;
  profilePic: string;
  email: string;
  userRoles: string[];
}

export interface User {
  objectID: string,
  profilePic: string;
  displayName: string;
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
  special: string[];
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
  special: string[],
}

export interface FiltersTypes {
  queryFilter?: string;
  counter?: number;
  sortFilter?: string;
  userId?: string;
  typeFilter?: string,
  authorFilter?: string;
  favoriteFilter?: string;
  startAfterDoc?: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
  persistProducts?: Recipe[];
  store?: string,
  rendered?: boolean;
  excludeId?: string;
}

export interface Recipe {
  id: string;
  data: RecipeData;
}

export interface SingleRecipes {
  data: Recipe[] | [];
  queryDoc: firebase.firestore.QueryDocumentSnapshot | undefined;
  isLastPage: boolean;
}

export interface Recipes {
  recipes: {
    mainRecipes: SingleRecipes,
    allRecipes: SingleRecipes,
    myRecipes: SingleRecipes,
    favoriteRecipes: SingleRecipes,
    userRecipes: SingleRecipes,
    relatedRecipes: SingleRecipes,
  }
  scrollDistance: {
    main: number;
    all: number;
    my: number;
    favorite: number;
    user: number;
  }
  filters: {
    type: string,
    sort: string,
  }
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
    lastDisplayedProfile: string;
    language: string,
  };
  recipes: Recipes;
  loading: Loading;
  recipe: {
    recipeData: RecipeData
  };
}

export interface Option {
  label: string,
  value: string,
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

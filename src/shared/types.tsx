import firebase from "firebase/compat/app";

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
  recipesLoaded: boolean;
  recipeDataLoaded: boolean;
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
}

export interface Filters {
  queryFilter?: string;
  counter?: number;
  popularFilter?: boolean;
  typeFilter?: string,
  authorFilter?: string;
  favoriteFilter?: string;
  startAfterDoc?: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
  persistProducts?: Recipe[];
  store?: string,
  rendered?: boolean;
}

export interface Recipe {
  id: string;
  data: RecipeData;
}

export interface SingleRecipes {
  data: Recipe[] | [];
  queryDoc: firebase.firestore.QueryDocumentSnapshot | undefined;
  isLastPage: boolean;
  filter?: string,
}

export interface Recipes {
  recipes: {
    queryRecipes: SingleRecipes,
    mainRecipes: SingleRecipes,
    popularRecipes: SingleRecipes,
    myRecipes: SingleRecipes,
    favoriteRecipes: SingleRecipes,
  }
  scrollDistance: {
    main: number;
    popular: number;
    my: number;
    favorite: number;
  }
  filters: {
    popularType: string,
    recentType: string,
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
  };
  recipes: Recipes;
  loading: Loading;
  recipe: {
    recipeData: RecipeData
  };
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

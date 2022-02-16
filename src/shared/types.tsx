export interface Handler {
  form: React.FormEvent<HTMLFormElement>;
  change: React.ChangeEvent<HTMLInputElement>;
  file: { target: { files: any[] } };
  string: { target: { value: React.SetStateAction<string> } };
  number: { target: { value: React.SetStateAction<number> } };
  void: { preventDefault: () => void };
}

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
  recipes: {};
  loading: Loading;
}

import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkUserSessionStart } from "./redux/User/user.actions";
import { RootState } from "./redux/rootReducer";
import { CurrentUser } from "./shared/types";

import FullscreenLayout from './layouts/FullscreenLayout';
import MainLayout from './layouts/MainLayout';
import WideLayout from './layouts/WideLayout';

import AuthenticationPage from "./pages/Authentication";
import NewPasswordPage from "./pages/NewPassword";
import RecipePage from "./pages/RecipePage";
import UserPage from "./pages/User";
import EmptyPage from "./pages/Empty";
import HomePage from './pages/Home';
import AllRecipesPage from './pages/All';
import FavoriteRecipesPage from './pages/Favorite';
import MyRecipesPage from './pages/My';
import CollectionPage from './pages/Collection';
import SettingsPage from './pages/Settings';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const currentUserData: CurrentUser = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    dispatch(checkUserSessionStart(currentUserData));
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="all" element={<AllRecipesPage />} />
            <Route path="favorite" element={<FavoriteRecipesPage />} />
            <Route path="my" element={<MyRecipesPage />} />
            <Route path="collection/:collectionId" element={<CollectionPage />} />
          </Route>
          <Route element={<WideLayout />}>
            <Route path="recipe/:recipeId" element={<RecipePage />} />
            <Route path="user">
              <Route path=":userId" element={<UserPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<EmptyPage />} />
          </Route>
          <Route element={<FullscreenLayout />}>
            <Route path="auth" element={<AuthenticationPage />} />
            <Route path="reset" element={<NewPasswordPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App; 

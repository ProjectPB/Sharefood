import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import FullscreenLayout from './layouts/FullscreenLayout';
import MainLayout from './layouts/MainLayout';

import AuthenticationPage from "./pages/Authentication";
import NewPasswordPage from "./pages/NewPassword";
import RecipePage from "./pages/RecipePage";
import EmptyPage from "./pages/Empty";
import MainPage from './pages/Main';
import PopularRecipesPage from './pages/Popular';
import FavoriteRecipesPage from './pages/Favorite';
import MyRecipesPage from './pages/My';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route element={<MainLayout />}>
            <Route index element={<MainPage />} />
            <Route path="popular" element={<PopularRecipesPage />} />
            <Route path="favorite" element={<FavoriteRecipesPage />} />
            <Route path="my" element={<MyRecipesPage />} />
            <Route path="recipe/:recipeId" element={<RecipePage />}>
            </Route>
            <Route path="*" element={<EmptyPage />} />
          </Route>
          <Route element={<FullscreenLayout />}>
            <Route path="auth" element={<AuthenticationPage />} />
            <Route path="reset" element={<NewPasswordPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter >
  );
};

export default App; 

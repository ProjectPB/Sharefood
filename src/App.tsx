import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import FullscreenLayout from './layouts/FullscreenLayout';
import MainLayout from './layouts/MainLayout';

import RenderRecipes from "./components/RenderRecipes";
import Authentication from "./components/Authentication";
import NewPassword from "./components/NewPassword";
import Recipe from "./components/Recipe";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route element={<MainLayout />}>
            <Route index element={<RenderRecipes />} />
            <Route path="favorite" element={<RenderRecipes />} />
            <Route path="my" element={<RenderRecipes />} />
            <Route path="popular" element={<RenderRecipes />} />
            <Route path="results" element={<RenderRecipes />}>
              <Route path=":query" element={<RenderRecipes />} />
            </Route>
            <Route path="recipe/:recipeId" element={<Recipe />}>
            </Route>
            <Route path="*" element={<RenderRecipes />} />
          </Route>
          <Route element={<FullscreenLayout />}>
            <Route path="auth" element={<Authentication />} />
            <Route path="reset" element={<NewPassword />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter >
  );
};

export default App; 

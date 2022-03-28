import { useSelector } from "react-redux";
import { State } from '../shared/types'

const mapState = ({ recipes }: State) => ({
  recipes: recipes.recipes,
});

const useRecipeType = (store: string) => {
  const { recipes } = useSelector(mapState);

  switch (store) {
    case "main": {
      return (recipes.mainRecipes);
    }
    case "query": {
      return (recipes.queryRecipes)
    }
    case "popular": {
      return (recipes.popularRecipes)
    }
    case "my": {
      return (recipes.myRecipes)
    }
    case "favorite": {
      return (recipes.favoriteRecipes)
    }
    default: {
      return;
    }
  }
}

export default useRecipeType;
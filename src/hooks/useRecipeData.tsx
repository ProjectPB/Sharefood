import { useSelector } from "react-redux";
import { State } from '../shared/types'

const mapState = ({ recipes }: State) => ({
  recipes: recipes.recipes,
  scrollDistance: recipes.scrollDistance,
});

const useRecipeData = (store: string) => {
  const { recipes, scrollDistance } = useSelector(mapState);

  switch (store) {
    case "main": {
      return ({ ...recipes.mainRecipes, scrollDistance: scrollDistance.main });
    }
    case "all": {
      return ({
        ...recipes.allRecipes, scrollDistance: scrollDistance.all
      })
    }
    case "my": {
      return ({
        ...recipes.myRecipes, scrollDistance: scrollDistance.my
      })
    }
    case "favorite": {
      return ({
        ...recipes.favoriteRecipes, scrollDistance: scrollDistance.favorite
      })
    }
    case 'user': {
      return ({
        ...recipes.userRecipes, scrollDistance: scrollDistance.user
      })
    }
    default: {
      return;
    }
  }
}

export default useRecipeData;
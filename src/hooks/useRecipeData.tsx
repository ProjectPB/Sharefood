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
    case "query": {
      return ({ ...recipes.queryRecipes, scrollDistance: null })
    }
    case "popular": {
      return ({
        ...recipes.popularRecipes, scrollDistance: scrollDistance.popular
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
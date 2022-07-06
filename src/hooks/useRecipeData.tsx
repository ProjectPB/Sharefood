import { useSelector } from "react-redux";
import { State } from '../shared/types'

const mapState = ({ recipes }: State) => ({
  recipes: recipes.recipes,
  scrollDistance: recipes.scrollDistance,
});

const useRecipeData = (store: string) => {
  const { recipes, scrollDistance } = useSelector(mapState);

  switch (store) {
    case "homeRecent": {
      return ({
        ...recipes.homeRecentRecipes, scrollDistance: null,
      })
    }
    case "homePopular": {
      return ({
        ...recipes.homePopularRecipes, scrollDistance: null,
      })
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
    case 'related': {
      return ({
        ...recipes.relatedRecipes, scrollDistance: null,
      })
    }
    default: {
      return;
    }
  }
}

export default useRecipeData;
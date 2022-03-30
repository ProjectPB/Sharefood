import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFavoriteRecipes, setMyRecipes } from "../redux/Recipes/recipes.actions";
import { State } from "../shared/types";

const mapState = ({ user }: State) => ({
  currentUser: user.currentUser,
});

const useAuth = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
      dispatch(setMyRecipes({ data: [], queryDoc: undefined, isLastPage: true }))
      dispatch(setFavoriteRecipes({ data: [], queryDoc: undefined, isLastPage: true }))
    }

  }, [currentUser, navigate, dispatch]);

  return currentUser;
};

export default useAuth;
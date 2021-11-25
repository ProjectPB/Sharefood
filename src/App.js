import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkUserSession } from "./redux/User/user.actions";
import Authpage from "./pages/Authpage";
import Recipepage from "./pages/Recipepage";
import Homepage from "./pages/Homepage";
import Loadingpage from "./pages/Loadingpage";
import NewPasswordpage from "./pages/NewPasswordpage";

const mapState = ({ loading }) => ({
  loaded: loading.homepageLoaded,
});

const App = () => {
  const dispatch = useDispatch();
  const { loaded } = useSelector(mapState);

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <Router>
      {!loaded ? (
        <Loadingpage />
      ) : (
        <Switch>
          <Route
            path={["/results/:query", "/favorite", "/my", "/popular"]}
            exact
          >
            <Homepage />
          </Route>
          <Route path="/recipe/:recipeId">
            <Recipepage />
          </Route>
          <Route path="/auth">
            <Authpage />
          </Route>
          <Route path="/reset">
            <NewPasswordpage />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      )}
    </Router>
  );
};

export default App;

import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkUserSession } from "./redux/User/user.actions";
import Authpage from "./pages/Authpage";
import Recipepage from "./pages/Recipepage";
import Homepage from "./pages/Homepage";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route path={["/results/:query", "/favorite", "/my", "/popular"]} exact>
          <Homepage />
        </Route>
        <Route path="/recipe/:recipeId">
          <Recipepage />
        </Route>
        <Route path="/auth">
          <Authpage />
        </Route>
        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

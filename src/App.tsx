import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Authpage from "./pages/Authpage";
import Recipepage from "./pages/Recipepage";
import Homepage from "./pages/Homepage";
import NewPasswordpage from "./pages/NewPasswordpage";

const App: React.FC = () => {
  return (
    <Router>
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
    </Router>
  );
};

export default App;

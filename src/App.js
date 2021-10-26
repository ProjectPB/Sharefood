import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "./redux/features/userSlice";
import { auth } from "./firebase/firebase";
import { CircularProgress } from "@material-ui/core";
import Authpage from "./pages/Authpage";
import Recipepage from "./pages/Recipepage";
import Homepage from "./pages/Homepage";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            profilePic: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <div className="app__processing">
      <h1>Sharefood</h1>
      <CircularProgress size={60} />
    </div>
  ) : (
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

import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Main from "./Main";

const App = () => {
  const isLoggedIn = false;
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return isLoggedIn ? (
              <Redirect to="/app" />
            ) : (
              <Redirect to="/login" />
            );
          }}
        />
        <Route
          path="/login"
          render={(props) => {
            return isLoggedIn ? <Redirect to="/app" /> : <Login />;
          }}
        />
        <Route
          path="/app"
          render={(props) => {
            return isLoggedIn ? <Main /> : <Redirect to="/login" />;
          }}
        />
      </Switch>
    </div>
  );
};

export default App;

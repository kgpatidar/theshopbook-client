import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthComponent from "./Pages/Auth/AuthPage";
import Main from "./Main";
import { useUser } from "./Hooks/Auth";
import NotificationPermission from "./Components/Util/NotificationPermission";
import { isWholesaler } from "./Helpers/account";

const App = () => {
  const { isLoggedIn, data } = useUser();

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          return isLoggedIn ? <Redirect to="/app" /> : <Redirect to="/login" />;
        }}
      />
      <Route
        path="/login"
        render={(props) => {
          return isLoggedIn ? <Redirect to="/app" /> : <AuthComponent />;
        }}
      />
      <Route
        path="/app"
        render={(props) => {
          return !isLoggedIn ? (
            <Redirect to="/login" />
          ) : Notification.permission !== "granted" ? (
            <NotificationPermission />
          ) : (
            <>
              <Main />
              <Redirect
                to={
                  isWholesaler(data)
                    ? "/app/wholesaler/home"
                    : "/app/retailer/home"
                }
              />
            </>
          );
        }}
      />
    </Switch>
  );
};

export default App;

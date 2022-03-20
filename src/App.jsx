import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import AuthComponent from "./Pages/Auth/AuthPage";
import Main from "./Main";
import { useUser } from "./Hooks/Auth";
import NotificationPermission from "./Components/Util/NotificationPermission";
import { isWholesaler } from "./Helpers/account";
import { Brand } from "./Components/Brand";

const getRedirectingURL = (pathname, isWholesaler) => {
  if (isWholesaler) {
    if (pathname.includes("wholesaler")) return pathname;
    return "/app/wholesaler/home";
  } else {
    if (pathname.includes("retailer")) return pathname;
    return "/app/retailer/home";
  }
};

const App = () => {
  const { pathname } = useLocation();
  const { isLoggedIn, isLoading } = useUser();
  console.log(pathname);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Brand className="w-36 h-36 animate-spin" name={false} />
      </div>
    );
  }

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          return isLoggedIn ? <Redirect to="/app" /> : <Redirect to="/login" />;
        }}
      />
      <Route path="/login" render={(props) => <AuthComponent />} />
      <Route path="/app" render={(props) => <Main />} />
    </Switch>
  );
};

export default App;

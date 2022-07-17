import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthComponent from "./Pages/Auth/AuthPage";
import Main from "./Main";
import { useUser } from "./Hooks/Auth";
import { Brand } from "./Components/Brand";

const App = () => {
  const { isLoggedIn, isLoading } = useUser();

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

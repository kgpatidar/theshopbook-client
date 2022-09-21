import React from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import WholesalerLayout from "./Pages/Wholesaler";
import RetailerLayout from "./Pages/Retailer";
import { useUser } from "./Hooks/Auth";
import { isWholesaler } from "./Helpers/account";
import NotificationPermission from "./Components/Util/NotificationPermission";

const getRedirectingURL = (pathname, isWholesaler) => {
  if (isWholesaler) {
    if (pathname.includes("wholesaler")) return pathname;
    return "/app/wholesaler/home";
  } else {
    if (pathname.includes("retailer")) return pathname;
    return "/app/retailer/home";
  }
};

const Main = () => {
  const { data, isLoggedIn } = useUser();
  const { pathname } = useLocation();

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  } else if (Notification.permission !== "granted") {
    return <NotificationPermission />;
  }

  return (
    <>
      <Switch>
        <Route
          path="/app/wholesaler"
          render={(props) => {
            return <WholesalerLayout user={data} />;
          }}
        />
        <Route
          path="/app/retailer"
          render={(props) => {
            return <RetailerLayout user={data} />;
          }}
        />
      </Switch>
      <Redirect to={getRedirectingURL(pathname, isWholesaler(data))} />
    </>
  );
};

export default Main;

import React from "react";
import { Route, Switch } from "react-router-dom";
import WholesalerLayout from "./Pages/Wholesaler";
import RetailerLayout from "./Pages/Retailer";

const Main = () => {
  return (
    <Switch>
      <Route
        path="/app/wholesaler"
        render={(props) => {
          return <WholesalerLayout />;
        }}
      />
      <Route
        path="/app/retailer"
        render={(props) => {
          return <RetailerLayout />;
        }}
      />
    </Switch>
  );
};

export default Main;

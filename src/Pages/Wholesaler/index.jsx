import { map } from "lodash";
import React from "react";
import { Route, Switch } from "react-router-dom";
import BottomNav from "../../Components/Layout/BottomNav";
import Sidebar from "../../Components/Layout/Sidebar";
import {
  getWholesalerDesktopRoutes,
  getWholesalerPhoneRoutes,
} from "../../Helpers/routes";
import Home from "./Home/Home";
import Retailers from "./Retailers/Retailers";
import Stocks from "./Stocks/Stocks";

const screenRoutes = [
  { path: "/app/wholesaler/home", main: Home },
  { path: "/app/wholesaler/retailers", main: Retailers },
  { path: "/app/wholesaler/stocks", main: Stocks },
];

const WholesalerLayout = () => {
  return (
    <div>
      <div className="w-screen h-screen md:w-0 md:h-0 md:hidden flex bg-white flex flex-col">
        <section className="p-2  flex-grow overflow-y-auto">
          <Switch>
            {React.Children.toArray(
              map(screenRoutes, ({ path, main, exact }) => {
                return <Route path={path} exact={exact} component={main} />;
              })
            )}
          </Switch>
        </section>
        <BottomNav routes={getWholesalerPhoneRoutes()} />
      </div>
      <div className="w-0 h-0 hidden md:w-screen md:h-screen md:flex bg-white">
        <Sidebar routes={getWholesalerDesktopRoutes()} />
        <div className="w-full flex flex-col overflow-x-hidden overflow-y-hidden">
          <section className="px-4 flex-grow overflow-y-auto">
            <Switch>
              {React.Children.toArray(
                map(screenRoutes, ({ path, main, exact }) => {
                  return <Route path={path} exact={exact} component={main} />;
                })
              )}
            </Switch>
          </section>
        </div>
      </div>
    </div>
  );
};

export default WholesalerLayout;

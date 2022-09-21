import React, { useMemo } from "react";
import { map } from "lodash";
import { Route, Switch } from "react-router-dom";
import BottomNav from "../../Components/Layout/BottomNav";
import Sidebar from "../../Components/Layout/Sidebar";
import Home from "./Home/Home";
import { getRetailerRoutes } from "../../Helpers/routes";
import MyOrders from "./MyOrders/MyOrders";
import RetailerReport from "./RetailerReport/RetailerReport";

/**Pages */

const screenRoutes = [
  { path: "/app/retailer/home", main: Home },
  { path: "/app/retailer/my-orders", main: MyOrders },
  { path: "/app/retailer/my-report", main: RetailerReport },
];

const RetailerLayout = ({ user }) => {
  const isPhone = window.innerWidth <= 768;
  const routes = useMemo(() => getRetailerRoutes(isPhone), [isPhone]);

  return isPhone ? (
    <div className="w-screen h-full lg:w-0 lg:h-0 lg:hidden bg-white flex flex-col">
      <div className="px-2" style={{ height: window.innerHeight - 55 }}>
        <Switch>
          {React.Children.toArray(
            map(screenRoutes, ({ path, main, exact = false }) => {
              return <Route path={path} exact={exact} component={main} />;
            })
          )}
        </Switch>
      </div>
      <BottomNav routes={routes} user={user} />
    </div>
  ) : (
    <div className="w-0 h-0 hidden md:w-screen md:h-screen md:flex bg-white">
      <Sidebar routes={routes} user={user} />
      <div className="w-full flex flex-col overflow-x-hidden overflow-y-hidden">
        <section className="px-4 w-full overflow-y-auto">
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
  );
};

export default RetailerLayout;

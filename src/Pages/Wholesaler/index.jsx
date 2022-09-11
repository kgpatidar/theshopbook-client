import React, { useMemo } from "react";
import { map } from "lodash";
import { Route, Switch } from "react-router-dom";
import BottomNav from "../../Components/Layout/BottomNav";
import Sidebar from "../../Components/Layout/Sidebar";
import { getWholesalerRoutes } from "../../Helpers/routes";

/**Pages */
import Home from "./Home/Home";
import PhoneMore from "./More/PhoneMore";
import Retailers from "./Retailers/Retailers";
import Stocks from "./Stocks/Stocks";
import Orders from "./Orders/Orders";
import WholesalerReport from "./WholesalerReport/WholesalerReport";

const screenRoutes = [
  { path: "/app/wholesaler/home", main: Home },
  { path: "/app/wholesaler/retailers", main: Retailers },
  { path: "/app/wholesaler/stocks", main: Stocks },
  { path: "/app/wholesaler/orders", main: Orders },
  { path: "/app/wholesaler/reports/:id?", main: WholesalerReport },
  { path: "/app/wholesaler/more", main: PhoneMore },
];

const WholesalerLayout = () => {
  const isPhone = window.innerWidth <= 768;
  const routes = useMemo(() => getWholesalerRoutes(isPhone), [isPhone]);

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
      <BottomNav routes={routes} />
    </div>
  ) : (
    <div className="w-0 h-0 hidden md:w-screen md:h-screen md:flex bg-white">
      <Sidebar routes={routes} />
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

export default WholesalerLayout;

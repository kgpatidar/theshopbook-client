import { map } from "lodash";
import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { isWholesaler } from "../../Helpers/account";
import { Brand } from "../Brand";
import LogoutModal from "../Modal/LogoutModal";

const Sidebar = ({ routes, user }) => {
  const { pathname } = useLocation();
  const checkIsActive = (path) => pathname.includes(path);

  const redirectTo = (path) => {
    if (!isWholesaler(user)) return `/app/retailer/${path}`;
    return `/app/wholesaler/${path}`;
  };

  return (
    <div className="h-0 md:h-full w-0 invisible md:visible md:w-16 flex flex-col justify-between items-center border-r">
      <div className="py-4">
        <Brand className="w-8 h-8" name={false} />
      </div>
      <div className="w-full">
        {React.Children.toArray(
          map(routes, ({ path, Icon, name }) => {
            const isActive = checkIsActive(path);
            return (
              <div className="py-2 hover:bg-blue-50">
                <Link
                  to={redirectTo(path)}
                  className="flex flex-col items-center"
                >
                  <Icon
                    className={`h-5 w-5 ${
                      isActive ? "text-app-primary" : "text-app-text1"
                    }`}
                  />
                  <small
                    className={`${
                      isActive ? "text-app-primary" : "text-app-text1"
                    }`}
                    style={{ fontSize: "9px" }}
                  >
                    {name}
                  </small>
                </Link>
              </div>
            );
          })
        )}
      </div>
      <div className="py-4 w-full">
        <LogoutModal />
      </div>
    </div>
  );
};

export default Sidebar;

import { map } from "lodash";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = ({ routes }) => {
  const { pathname } = useLocation();
  const checkIsActive = (path) => pathname.includes(path);
  return (
    <nav
      style={{ height: "50px" }}
      className="w-full bg-gray-50 items-center flex justify-around fixed bottom-0"
    >
      {React.Children.toArray(
        map(routes, ({ path, Icon, name }) => {
          const isActive = checkIsActive(path);
          return (
            <div className="transition-all duration-300 hover:bg-blue-50 w-full py-3">
              <Link
                to={`/app/wholesaler/${path}`}
                className="transition-all flex flex-col items-center"
              >
                <Icon
                  className={`h-5 w-5 ${
                    isActive ? "text-app-primary border" : "text-app-text1"
                  }`}
                />
                <small
                  className={`font-medium ${
                    isActive ? "text-app-primary" : "text-app-text1"
                  }`}
                  style={{ fontSize: "10px" }}
                >
                  {name}
                </small>
              </Link>
            </div>
          );
        })
      )}
    </nav>
  );
};

export default BottomNav;

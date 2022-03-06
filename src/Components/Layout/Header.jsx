import { ChevronRightIcon } from "@heroicons/react/solid";
import { get, map } from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../Hooks/Auth";
import { useBreadcrumb } from "../../Hooks/Header";

const Breadcumb = () => {
  const breadcrumb = useBreadcrumb();

  return (
    <div className="flex items-center text-app-text2 text-lg font-medium">
      {React.Children.toArray(
        map(breadcrumb, ({ name, path }) => {
          return path ? (
            <div className="flex items-center">
              <Link to={path} className="">
                {name}
              </Link>
              <ChevronRightIcon className="w-6 h-6 text-gray-400" />
            </div>
          ) : (
            <div className="">{name}</div>
          );
        })
      )}
    </div>
  );
};

const Header = () => {
  const { data } = useUser();
  const name = get(data, "name", "Unknown");
  const email = get(data, "email", "abc123@gmail.com");

  return (
    <nav className="h-10 flex justify-between items-center py-8 pl-4 pr-8">
      <Breadcumb />
      <div className="flex">
        <div className="flex flex-col text-app-text2 text-right">
          <span className="text-sm font-medium">{name}</span>
          <span className="text-xs font-thin">{email}</span>
        </div>
        &nbsp; &nbsp;
        <div className="w-8 h-8 rounded-full bg-app-primary uppercase text-white font-bold flex items-center justify-center">
          {name.charAt(0)}
        </div>
      </div>
    </nav>
  );
};

export default Header;

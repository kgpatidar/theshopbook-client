import { PlusCircleIcon } from "@heroicons/react/solid";
import React from "react";
import className from "../../Constant/className";

const Header = ({ title }) => {
  return (
    <div className="fixed left-2 md:left-20 top-0 right-2 md:right-4">
      <div className="w-full bg-white grid grid-cols-2 border-b md:border-0 border-b-gray-400">
        <h1 className="text-xl font-bold md:font-semibold leading-1 py-2">
          {title}
        </h1>
        <div className="flex justify-end">
          <div className="flex items-center">
            <button className={className.activeBtn + "flex items-center"}>
              <PlusCircleIcon className="text-white w-5 h-5 mr-3" />
              <span>Add New</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

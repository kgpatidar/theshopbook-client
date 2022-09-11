import { PlusCircleIcon } from "@heroicons/react/solid";
import React from "react";
import className from "../../Constant/className";
const isPhone = window.innerWidth <= 768;

const HeaderButton = (
  <div className="flex items-center">
    <button className={className.activeBtn + "flex items-center"}>
      <PlusCircleIcon className="text-white w-5 h-5 mr-1" />
      <span>{isPhone ? "Add" : "Add New"}</span>
    </button>
  </div>
);

export default HeaderButton;

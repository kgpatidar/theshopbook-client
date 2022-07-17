import React from "react";

const Header = ({ title, rightChild = <></> }) => {
  return (
    <div className="fixed left-2 md:left-20 top-0 right-2 md:right-4 z-40">
      <div className="w-full bg-white grid grid-cols-2 border-b md:border-0 border-b-gray-400">
        <h1 className="text-xl font-bold md:font-semibold leading-1 py-2">
          {title}
        </h1>
        <div className="flex justify-end">{rightChild}</div>
      </div>
    </div>
  );
};

export default Header;

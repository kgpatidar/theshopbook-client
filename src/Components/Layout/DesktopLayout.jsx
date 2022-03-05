import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const DesktopLayout = ({ routes, header, children }) => {
  return (
    <div className="w-screen h-screen flex bg-white">
      <Sidebar routes={routes} />
      <div className="w-full">
        <Header />
        <div className="px-4">{children}</div>
      </div>
    </div>
  );
};

export default DesktopLayout;

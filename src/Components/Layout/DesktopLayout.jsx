import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const DesktopLayout = ({ routes, header, children }) => {
  return (
    <div className="w-screen h-screen flex bg-white">
      <Sidebar routes={routes} />
      <div className="w-full flex flex-col overflow-x-hidden overflow-y-hidden">
        <Header />
        <section className="px-4 flex-grow overflow-y-auto">{children}</section>
      </div>
    </div>
  );
};

export default DesktopLayout;

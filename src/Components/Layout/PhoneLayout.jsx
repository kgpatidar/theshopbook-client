import React from "react";
import BottomNav from "./BottomNav";

const PhoneLayout = ({ children, routes }) => {
  return (
    <div className="w-screen h-screen flex bg-white flex flex-col">
      <section className="p-2  flex-grow overflow-y-auto">{children}</section>
      <BottomNav routes={routes} />
    </div>
  );
};

export default PhoneLayout;

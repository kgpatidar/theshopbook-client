import React from "react";

const Spinner = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="border-app-primary border-t-2 border-l-2 rounded-full w-4 h-4 animate-spin"></div>
    </div>
  );
};

export default Spinner;

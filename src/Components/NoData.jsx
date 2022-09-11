import React from "react";
import { CollectionIcon } from "@heroicons/react/outline";

const NoData = () => {
  return (
    <div className="w-full h-full flex flex-col  items-center justify-center pt-4">
      <CollectionIcon className="w-8 h-8 text-gray-600" />
      <h1 className="text-gray-600">No Data</h1>
    </div>
  );
};

export default NoData;

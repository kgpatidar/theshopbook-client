import { get } from "lodash";
import React from "react";
import LineChart from "../../../Components/Charts/LineChart";
import { useUser } from "../../../Hooks/Auth";

const Home = () => {
  const { data } = useUser();
  const name = get(data, "name", "Unknown");
  return (
    <div className="p-4 h-full">
      <div>
        <h1 className="text-xl">
          Hi, <strong>{name}</strong>
        </h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-5">
        <div className="flex items-center justify-center rounded-xl border-2 border-lime-300 h-36 w-full mr-8 bg-lime-100">
          <div className="flex flex-col items-center text-center text-lime-900">
            <span className="text-5xl font-bold">25</span>
            <span className="font-medium">Retailers</span>
          </div>
        </div>
        <div className="flex items-center justify-center rounded-xl border-2 border-fuchsia-300 h-36 w-full mr-8 bg-fuchsia-100">
          <div className="flex flex-col text-center text-fuchsia-900">
            <span className="text-5xl font-bold">221</span>
            <span className="font-medium">Stocks</span>
          </div>
        </div>
        <div className="flex items-center justify-center rounded-xl border-2 border-orange-300 h-36 w-full mr-8 bg-orange-100">
          <div className="flex flex-col text-center text-orange-900">
            <span className="text-5xl font-bold">121</span>
            <span className="font-medium">Orders</span>
          </div>
        </div>
        <div className="flex items-center justify-center rounded-xl border-2 border-cyan-300 h-36 w-full mr-8 bg-cyan-100">
          <div className="flex flex-col text-center text-cyan-900">
            <span className="text-5xl font-bold">3</span>
            <span className="font-medium">Notification</span>
          </div>
        </div>
      </div>

      <div className="p-2 md:p-8 border rounded-lg  h-1/2 lg:h-2/3">
        <LineChart />
      </div>
    </div>
  );
};

export default Home;

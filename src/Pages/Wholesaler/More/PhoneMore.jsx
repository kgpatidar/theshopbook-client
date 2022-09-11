import {
  DocumentReportIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/solid";
import { get } from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth, useUser } from "../../../Hooks/Auth";

const PhoneMore = () => {
  const { logoutUser } = useAuth();
  const { data } = useUser();

  return (
    <div className="p-2">
      <div className="w-full text-center">
        <h1 className="text-xl font-bold border-b border-b-gray-400 leading-1 py-2">
          More
        </h1>
      </div>
      <br />

      {/* USER INFORMATION */}
      <div className="bg-gray-100 rounded flex flex-col items-center justify-center p-3">
        <div className="text-white font-bold text-3xl uppercase bg-app-primary rounded-full w-16 h-16 flex items-center justify-center">
          {get(data, "name", "No name").charAt(0)}
        </div>
        <h1 className="text-lg font-semibold text-app-primary">
          {get(data, "buisnessName", "No name")}
        </h1>
        <div className="border-b-2 w-4 border-app-primary" />
        <h1 className="font-medium text-app-text2 flex items-center">
          <UserIcon className="h-5 w-5" />
          &nbsp;
          {get(data, "name", "No name")}
        </h1>
        <h1 className="font-medium text-app-text2 flex items-center">
          <MailIcon className="h-5 w-5" />
          &nbsp;
          {get(data, "email", "No name")}
        </h1>
        <h1 className="font-medium text-app-text2 flex items-center">
          <PhoneIcon className="h-5 w-5" />
          &nbsp;
          {get(data, "phoneNo", "XXXXXXXXXX")}
        </h1>
      </div>
      <br />

      {/* EXTRA BUTTON */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-5">
        <Link
          to={"/app/wholesaler/reports"}
          className="flex items-center justify-center rounded-xl border-2 border-lime-300 h-28 w-full mr-8 bg-lime-100"
        >
          <div className="flex flex-col items-center text-center text-lime-900">
            <DocumentReportIcon className="w-8 h-8" />
            <button className="font-medium">Report</button>
          </div>
        </Link>
        <Link
          to={"/app/wholesaler/reports"}
          className="flex items-center justify-center rounded-xl border-2 border-orange-300 h-28 w-full mr-8 bg-orange-100"
        >
          <div className="flex flex-col items-center text-center text-orange-900">
            <DocumentReportIcon className="w-8 h-8" />
            <button className="font-medium">Report</button>
          </div>
        </Link>
      </div>

      {/* LOGOUT BTN */}
      <div>
        <button
          onClick={logoutUser}
          className="bg-red-100 text-red-900 border border-red-900 font-semibold w-full rounded p-1"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default PhoneMore;

import {
  HomeIcon,
  LocationMarkerIcon,
  MailIcon,
  PhoneIcon,
} from "@heroicons/react/solid";
import { get, map } from "lodash";
import React from "react";

const retailers = map([1, 2, 3, 4, 5, 6, 7, 8, 9], (i) => {
  return {
    id: i,
    name: "Manoj Kumar Sharma",
    email: "manojkumar123@gmail.com",
    phoneNo: "9876543210",
    buisnessName: "New Printing Shop",
    address: "21 Shastri Nagar, Ratlam, MP",
    orders: 5,
  };
});

const Retailers = () => {
  return (
    <div className="p-4 h-full">
      <div className="w-full text-center md:text-left fixed top-0 bg-white">
        <h1 className="text-xl font-bold md:font-normal border-b md:border-0 border-b-gray-400 leading-1 py-2">
          Retailers
        </h1>
      </div>

      <div className="pt-8 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-y-auto">
        {React.Children.toArray(
          map(retailers, (retailer) => {
            return (
              <div key={retailer.id} className="bg-gray-50 p-2 flex rounded">
                <div className="flex items-center justify-center font-semibold text-white bg-app-primary rounded-full w-8 h-8">
                  {get(retailer, "name", "None").charAt(0)}
                </div>
                &nbsp; &nbsp; &nbsp;
                <div>
                  <h1 className="font-medium text-app-primary">
                    {get(retailer, "name", "No name")}
                  </h1>
                  <h1 className="font-medium text-sm text-app-text2 flex items-center">
                    <HomeIcon className="h-3 w-3" />
                    &nbsp; &nbsp;
                    {get(retailer, "buisnessName", "No name")}
                  </h1>
                  <h1 className="font-thin text-sm text-app-text2 flex items-center">
                    <MailIcon className="h-3 w-3" />
                    &nbsp; &nbsp;
                    {get(retailer, "email", "No name")}
                  </h1>
                  <h1 className="font-thin text-sm text-app-text2 flex items-center">
                    <PhoneIcon className="h-3 w-3" />
                    &nbsp; &nbsp;
                    {get(retailer, "phoneNo", "XXXXXXXXXX")}
                  </h1>
                  <h1 className="font-thin text-sm text-app-text2 flex items-center">
                    <LocationMarkerIcon className="h-3 w-3" />
                    &nbsp; &nbsp;
                    {get(retailer, "address", "No Location")}
                  </h1>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Retailers;

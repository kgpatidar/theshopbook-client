import { CurrencyRupeeIcon } from "@heroicons/react/outline";
import { CollectionIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { get, map } from "lodash";
import React from "react";
import Header from "../../../Components/Layout/Header";

const data = map([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], (i) => {
  return {
    id: i,
    name: "ABC-" + i,
    quantity: i + i,
    price: i * i,
  };
});

const Stocks = () => {
  return (
    <div className="w-full">
      <Header title="Stocks" />

      <div className="pt-12 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-y-auto">
        {React.Children.toArray(
          map(data, (item, index) => {
            return (
              <div
                key={item.id}
                className="bg-gray-50 border border-gray-200 flex items-center relative"
              >
                <TrashIcon className="w-6 h-6 absolute right-2 top-2 text-red-500 bg-gray-50 p-1 rounded-full cursor-pointer hover:bg-gray-200" />
                <PencilIcon className="w-6 h-6 absolute right-8 top-2 text-blue-700 bg-gray-50 p-1 rounded-full cursor-pointer hover:bg-gray-200" />
                <div className="text-2xl h-full w-2/12 flex items-center justify-center font-thin text-app-text1">
                  #{index + 1}
                </div>
                &nbsp; &nbsp; &nbsp;
                <div className="py-4">
                  <div>
                    <h1 className="underline font-semibold text-sm text-app-primary flex items-center">
                      {get(item, "name", 100000000)}
                    </h1>
                  </div>
                  <h1 className="font-normal text-sm text-app-text2 flex items-center">
                    <CurrencyRupeeIcon className="h-3 w-3" />
                    &nbsp; &nbsp; Rs.&nbsp;
                    <strong>{get(item, "price", 100000000)}</strong>/per piece
                  </h1>
                  <h1 className="font-normal text-sm text-app-text2 flex items-center">
                    <CollectionIcon className="h-3 w-3" />
                    &nbsp; &nbsp;
                    <strong>{get(item, "quantity", 0)} </strong> &nbsp;Pieces
                    available
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

export default Stocks;

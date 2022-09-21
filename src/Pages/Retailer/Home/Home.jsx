import {
  CurrencyRupeeIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import { CollectionIcon, PencilIcon } from "@heroicons/react/solid";
import { filter, get, includes, isEmpty, map, toLower } from "lodash";
import React from "react";
import { useState } from "react";
import Header from "../../../Components/Layout/Header";
import Spinner from "../../../Components/Spinner";
import { useStocks } from "../../../Hooks/Stocks";
import Modal from "../../../Components/Modal/Modal";
import NoData from "../../../Components/NoData";
import HeaderButton from "../../../Components/Layout/HeaderButton";
import className from "../../../Constant/className";
import { useUser } from "../../../Hooks/Auth";
import { getWholesalerId } from "../../../Helpers/account";
import { usePlaceOrder } from "../../../Hooks/Orders";
import { refechQuery } from "../../../Helpers/queryClient";
import toast from "react-hot-toast";

const BookOrder = ({ data = {}, close }) => {
  const { data: userData } = useUser();
  const { mutate: placeOrder, isLoading: isPlacingOrder } = usePlaceOrder();
  const CHANGE_VALUE = 100;
  const [quantity, setQunatity] = useState(100);

  const updateQty = (type) => {
    if (type === "INC") {
      if (quantity + CHANGE_VALUE <= get(data, "quantity", 100))
        setQunatity(quantity + CHANGE_VALUE);
    } else {
      if (quantity - CHANGE_VALUE >= 100) setQunatity(quantity - CHANGE_VALUE);
    }
  };

  const onConfirm = () => {
    const wholesellerId = getWholesalerId(userData);
    const stockId = get(data, "id", -1);
    const payload = { wholesellerId, stockId, quantity };
    placeOrder(payload, {
      onSuccess: () => {
        refechQuery("fetchRetailerOrders");
        toast.success("New Order requested to wholeseller!");
        close();
      },
      onError: () => {
        toast.error("Oh! Something went wrong.");
      },
    });
  };

  return (
    <div>
      {isPlacingOrder && (
        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50">
          <Spinner />
        </div>
      )}
      <div className="flex flex-col text-center px-12">
        <small className="text-xs">Stock Name</small>
        <span className="font-bold">{get(data, "name", "N/A")}</span>
      </div>
      <div className="flex flex-col text-center pt-2">
        <small className="text-xs">Stock Price Per Piece</small>
        <span className="font-bold">Rs.{get(data, "price", "N/A")}</span>
      </div>
      <div className="flex flex-col text-center pt-2">
        <small className="text-xs">Available Quantity</small>
        <span className="font-bold">{get(data, "quantity", "N/A")}</span>
      </div>
      <div className="text-center py-2 border-b">
        <small className="text-xs">Order Quantity</small>
        <div className="font-bold flex items-center justify-center">
          <MinusIcon
            className="cursor-pointer w-5 h-5 flex justify-center items-center bg-red-50 text-red-500 font-bold rounded-full"
            onClick={() => updateQty("DEC")}
          />
          &nbsp;&nbsp;&nbsp;{quantity}&nbsp;&nbsp;&nbsp;
          <PlusIcon
            className="cursor-pointer w-5 h-5 flex justify-center items-center bg-blue-50 text-blue-500 font-bold rounded-full"
            onClick={() => updateQty("INC")}
          />
        </div>
      </div>
      <div className="flex flex-col text-center pt-2">
        <small className="text-xs">Your Total Pay Amount</small>
        <span className="font-bold">Rs.{get(data, "price", 0) * quantity}</span>
      </div>
      <button
        className={className.activeBtn + "w-full mt-2"}
        onClick={onConfirm}
      >
        Book Now
      </button>
    </div>
  );
};

const Home = () => {
  const { data: stocks, isLoading } = useStocks();
  const [searchText, setSearchText] = useState("");

  const filtredStocks = filter(stocks, ({ name }) =>
    includes(toLower(name), toLower(searchText))
  );

  return (
    <div className="w-full">
      <Header
        title="Stocks"
        searchText={searchText}
        setSearchText={setSearchText}
      />

      {isLoading ? (
        <div className="w-full h-screen">
          <Spinner />
        </div>
      ) : isEmpty(filtredStocks) ? (
        <div className="w-full h-screen">
          <NoData />
        </div>
      ) : (
        <div className="pt-14 pb-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto">
          {React.Children.toArray(
            map(filtredStocks, (item, index) => {
              return (
                <div
                  key={item.id}
                  className="w-full rounded-md bg-gray-50 border border-gray-200 flex items-center relative"
                >
                  <div className="text-2xl h-full w-3/12 flex items-center justify-center font-thin text-app-text1">
                    #{index + 1}
                  </div>
                  &nbsp; &nbsp; &nbsp;
                  <div className="pt-4 pr-3 w-full">
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
                    <div className="py-2 flex justify-end w-full">
                      <Modal
                        heading="Book Order"
                        trigger={
                          <button className={className.activeBtn}>Book</button>
                        }
                      >
                        <BookOrder data={item} />
                      </Modal>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Home;

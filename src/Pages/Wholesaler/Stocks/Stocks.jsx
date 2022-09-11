import { CurrencyRupeeIcon } from "@heroicons/react/outline";
import {
  CollectionIcon,
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import { filter, get, includes, isEmpty, map, toLower } from "lodash";
import React from "react";
import { useState } from "react";
import Input from "../../../Components/Form/Input";
import Header from "../../../Components/Layout/Header";
import Spinner from "../../../Components/Spinner";
import { useAddStocks, useStocks } from "../../../Hooks/Stocks";
import className from "../../../Constant/className";
import Modal from "../../../Components/Modal/Modal";
import toast from "react-hot-toast";
import { refechQuery } from "../../../Helpers/queryClient";
import { useEffect } from "react";
import NoData from "../../../Components/NoData";
import HeaderButton from "../../../Components/Layout/HeaderButton";

const ACTION_TYPE = {
  ADD: "ADD",
  EDIT: "EDIT",
};

const AddStocks = ({ close, type = ACTION_TYPE.ADD, stockData = {} }) => {
  const { addNewStock, isAdding, editStock, isEditing } = useAddStocks();
  const [data, setData] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (ACTION_TYPE.EDIT === type) {
      setData(stockData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (type === ACTION_TYPE.ADD) {
      addNewStock(data, {
        onSuccess: (res) => {
          refechQuery("fetchStocks");
          close();
          toast.success("Stock added succesfully.");
        },
        onError: (error) => {
          toast.error(error.response.data.msg);
        },
      });
    } else if (type === ACTION_TYPE.EDIT) {
      editStock(data, {
        onSuccess: (res) => {
          refechQuery("fetchStocks");
          close();
          toast.success("Stock updated succesfully.");
        },
        onError: (error) => {
          toast.error(error.response.data.msg);
        },
      });
    }
  };

  return (
    <div className="relative">
      {(isAdding || isEditing) && (
        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50">
          <Spinner />
        </div>
      )}
      <form
        action=""
        method="POST"
        onSubmit={onSubmit}
        className="flex flex-col"
      >
        <Input
          type="text"
          label="Name of piece"
          name="name"
          value={data.name}
          onChange={handleChange}
          required
        />
        <Input
          type="number"
          label="Price per piece"
          name="price"
          value={data.price}
          onChange={handleChange}
          required
          extraProps={{ min: 0 }}
        />
        <Input
          type="number"
          label="Quantity available"
          name="quantity"
          value={data.quantity}
          onChange={handleChange}
          required
          extraProps={{ min: 0 }}
        />

        <input
          type="submit"
          value={type}
          className="w-full bg-app-primary rounded text-white cursor-pointer mt-2 p-1 hover:bg-blue-500"
        />
      </form>
    </div>
  );
};

const Stocks = () => {
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
        rightChild={
          <Modal heading="Add Stocks" trigger={HeaderButton}>
            <AddStocks type={ACTION_TYPE.ADD} />
          </Modal>
        }
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
        <div className="pt-12 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-y-auto">
          {React.Children.toArray(
            map(filtredStocks, (item, index) => {
              return (
                <div
                  key={item.id}
                  className="bg-gray-50 border border-gray-200 flex items-center relative"
                >
                  {/* <TrashIcon className="w-6 h-6 absolute right-2 top-2 text-red-500 bg-gray-50 p-1 rounded-full cursor-pointer hover:bg-gray-200" /> */}
                  <Modal
                    heading="Edit Stocks"
                    trigger={
                      <PencilIcon className="w-6 h-6 absolute right-2 top-2 text-blue-700 bg-gray-50 p-1 rounded-full cursor-pointer hover:bg-gray-200" />
                    }
                  >
                    <AddStocks type={ACTION_TYPE.EDIT} stockData={item} />
                  </Modal>
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
      )}
    </div>
  );
};

export default Stocks;

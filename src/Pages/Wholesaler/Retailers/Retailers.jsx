import {
  HomeIcon,
  LocationMarkerIcon,
  MailIcon,
  PhoneIcon,
  PlusCircleIcon,
} from "@heroicons/react/solid";
import { get, isEmpty, map } from "lodash";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Input from "../../../Components/Form/Input";
import Header from "../../../Components/Layout/Header";
import Modal from "../../../Components/Modal/Modal";
import Spinner from "../../../Components/Spinner";
import className from "../../../Constant/className";
import { refechQuery } from "../../../Helpers/queryClient";
import { useWholesellerId } from "../../../Hooks/Auth";
import { useAddRetailer, useRetailers } from "../../../Hooks/Retailers";

const ACTION_TYPE = {
  ADD: "ADD",
  EDIT: "EDIT",
};

const AddRetailer = ({ close, type = ACTION_TYPE.ADD, stockData = {} }) => {
  const { addNewRetailer, isAdding } = useAddRetailer();
  const wholesellerId = useWholesellerId();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    buisnessName: "",
    phoneNo: "",
    address: "",
    wholesellerId: "",
  });

  useEffect(() => {
    setData({ ...data, wholesellerId });
  }, [wholesellerId]);

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
      addNewRetailer(data, {
        onSuccess: (res) => {
          refechQuery("fetchRetailers");
          close();
          toast.success("Dealers added succesfully.");
        },
        onError: (error) => {
          toast.error(error.response.data.msg);
        },
      });
    } else if (type === ACTION_TYPE.EDIT) {
    }
  };

  return (
    <div className="relative">
      {isAdding && (
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
          label="Name"
          name="name"
          value={data.name}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          label="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          label="Buisness Name"
          name="buisnessName"
          value={data.buisnessName}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          label="Password"
          name="password"
          value={data.password}
          onChange={handleChange}
          required
        />
        <Input
          type="number"
          label="Phone Number"
          name="phoneNo"
          value={data.phoneNo}
          onChange={handleChange}
          required
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

const Retailers = () => {
  const { data = [], isLoading } = useRetailers();
  return (
    <div className="p-4 h-full">
      <Header
        title="Dealers"
        rightChild={
          <Modal
            heading="Add Dealer"
            trigger={
              <div className="flex items-center">
                <button className={className.activeBtn + "flex items-center"}>
                  <PlusCircleIcon className="text-white w-5 h-5 mr-3" />
                  <span>Add New</span>
                </button>
              </div>
            }
          >
            <AddRetailer type={ACTION_TYPE.ADD} />
          </Modal>
        }
      />

      <div className="pt-8 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-y-auto">
        {React.Children.toArray(
          map(data, (retailer) => {
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
                    {isEmpty(get(retailer, "address", "No Location"))
                      ? " --"
                      : get(retailer, "address", "No Location")}
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

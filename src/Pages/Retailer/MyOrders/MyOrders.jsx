import { LocationMarkerIcon } from "@heroicons/react/solid";
import {
  filter,
  get,
  includes,
  isEmpty,
  keys,
  map,
  replace,
  toLower,
  values,
} from "lodash";
import React from "react";
import { useState } from "react";
import { useMemo } from "react";
import toast from "react-hot-toast";
import Header from "../../../Components/Layout/Header";
import Modal from "../../../Components/Modal/Modal";
import NoData from "../../../Components/NoData";
import Spinner from "../../../Components/Spinner";
import { toHumanize } from "../../../Helpers/global";
import { refechQuery } from "../../../Helpers/queryClient";
import { useUser } from "../../../Hooks/Auth";
import { useOrdersActions, useRetailerOrder } from "../../../Hooks/Orders";
import { useStocks } from "../../../Hooks/Stocks";
import {
  getDateTime,
  getMappedOrdersData,
  ORDER_PAYMENT_STATUS,
  ORDER_STATUS,
  ORDER_UI_COLOR,
  ORDER_UI_ICON,
  PAYMENT_STATUS_COLOR,
  PAYMENT_STATUS_UI_ICON,
} from "./orders.helper";

const CancelOrderConfirmation = ({ close, data = {} }) => {
  const { cancelOrderStatus, isCanceling } = useOrdersActions();

  const cancelOrder = () => {
    cancelOrderStatus(get(data, "id", null), {
      onSuccess: (res) => {
        refechQuery("fetchRetailerOrders");
        toast.success(get(res, "data.msg", "Success!"));
        close();
      },
      onError: (error) => {
        toast.error(error.response.data.msg);
      },
    });
  };

  return (
    <div className="p-4">
      {isCanceling && (
        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50">
          <Spinner />
        </div>
      )}
      <p>Are you sure you want to cancel order?</p>
      <div className="flex items-center justify-between py-2">
        <div className="text-left">
          <small className="text-gray-500">ORDER ID</small>
          <h3 className="leading-3 font-medium">{get(data, "id", "")}</h3>
        </div>
        <div className="text-right">
          <small className="text-gray-500">ORDER NAME</small>
          <h3 className="leading-3 font-medium">
            {get(data, "stock.name", "")}
          </h3>
        </div>
      </div>

      <div className="py-3 flex items-center justify-center">
        <button className="text-xs w-16 rounded-lg p-1 border" onClick={close}>
          No
        </button>
        &nbsp;&nbsp;
        <button
          className="text-xs w-16 rounded-lg p-1 border border-red-500 text-red-500"
          onClick={cancelOrder}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

const OrderCard = ({ data }) => {
  const {
    id,
    payment,
    price,
    quantity,
    retailer = {},
    stock = {},
    status,
    time,
  } = data;
  const OrderStatusIcon = ORDER_UI_ICON[status];
  const PaymentStatusIcon = PAYMENT_STATUS_UI_ICON[payment];
  const color = ORDER_UI_COLOR[status];
  const statusTextColor = `text-${color}-600`;
  const paymentStatusTextColor = `text-${PAYMENT_STATUS_COLOR[payment]}-600`;

  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-lg hover:shadow-xl hover:bg-gray-50">
      <div className="flex items-start justify-between">
        <div className="text-left">
          <small className="text-gray-500">ORDER NAME</small>
          <h3 className="leading-3 font-medium">{get(stock, "name", "")}</h3>
          <small
            className="leading-3 text-gray-600"
            style={{ fontSize: "10px" }}
          >
            Total Qty Now left: {get(stock, "quantity", "")}
          </small>
        </div>
        {status === ORDER_STATUS.PENDING && (
          <Modal
            heading="Order Cancel"
            trigger={
              <button className="text-xs bg-red-100 text-red-500 py-1 px-2 rounded-lg">
                Cancel Order
              </button>
            }
          >
            <CancelOrderConfirmation data={data} />
          </Modal>
        )}
      </div>
      <div className="leading-3 flex items-center justify-center pt-2 font-bold text-lg">
        <h1>Order ID : #{id}</h1>
      </div>

      <div className="flex items-center justify-between py-2">
        <div className="text-left">
          <small className="text-gray-500">ORDER STATUS</small>
          <h3
            className={`flex items-center leading-3 font-medium ${statusTextColor}`}
          >
            <OrderStatusIcon className={`w-4 h-4 ${statusTextColor}`} />
            {status}
          </h3>
        </div>
        <div className="text-right">
          <small className="text-gray-500">PAYMENT STATUS</small>
          <h3
            className={`flex items-center justify-end leading-3 font-medium ${paymentStatusTextColor}`}
          >
            <PaymentStatusIcon
              className={`w-4 h-4 ${paymentStatusTextColor}`}
            />
            {payment}
          </h3>
        </div>
      </div>

      <div className="flex items-center justify-between py-2">
        <div className="text-left">
          <small className="text-gray-500">PRICE PER PIECE</small>
          <h3 className="leading-3 font-medium text-sm">Rs.{price}</h3>
        </div>
        <div className="text-right">
          <small className="text-gray-500">ORDER QUANTITY</small>
          <h3 className="leading-3 font-medium text-sm">{quantity} pieces</h3>
        </div>
      </div>

      <div className="flex items-center justify-between py-2">
        <div className="text-left">
          <small className="text-gray-500">ORDER TIME</small>
          <h3 className="leading-3 font-medium text-sm">{getDateTime(time)}</h3>
        </div>
        <div className="text-right">
          <small className="text-gray-500">TOTAL AMOUNT</small>
          <h3 className="leading-3 font-medium text-sm">
            Rs.{price * quantity}
          </h3>
        </div>
      </div>

      <div className="border-t pt-1">
        <h5 className="text-xs flex items-center">
          <LocationMarkerIcon className="h-3 w-3" />
          &nbsp;&nbsp;
          {get(retailer, "address", "")}
        </h5>
      </div>
    </div>
  );
};

const OrderStatusFilter = ({ allStatus, orderStatus, onChange }) => {
  const isActive = (sts) => orderStatus === sts;

  return (
    <div className="sticky top-0 flex pt-14 pb-2 overflow-x-auto bg-white no-scrollbar">
      {values(allStatus).map((sts) => (
        <div
          key={sts}
          className={`py-1 px-2 border rounded mx-0.5 cursor-pointer text-xs ${
            isActive(sts)
              ? "bg-app-primary text-white disable"
              : "hover:bg-blue-50"
          }`}
          onClick={() => onChange(sts)}
        >
          {toHumanize(sts)}
        </div>
      ))}
    </div>
  );
};

const MyOrders = () => {
  const [orderStatus, setOrderStatus] = useState(ORDER_STATUS.ALL);
  const [paymentStatus, setPaymentStatus] = useState(ORDER_STATUS.ALL);
  const [searchText, setSearchText] = useState("");

  const { data: userData } = useUser();
  const { data: orderData, isLoading } = useRetailerOrder(userData);
  const { data: stocksData } = useStocks();
  const mappedOrderData = useMemo(
    () =>
      getMappedOrdersData(orderData, stocksData, orderStatus, paymentStatus),
    [orderData, stocksData, orderStatus, paymentStatus]
  );

  const filtredOrders = filter(
    mappedOrderData,
    ({ id, stock: { name: stockName = "" } }) => {
      const text = toLower(searchText);
      return (
        includes(id.toString(), text) || includes(toLower(stockName), text)
      );
    }
  );

  return (
    <div className="w-full">
      <Header
        searchText={searchText}
        setSearchText={setSearchText}
        placeholderText="Search id, stock name or retailer name"
        title="Orders"
      />
      <div className="flex items-center">
        <OrderStatusFilter
          allStatus={ORDER_STATUS}
          orderStatus={orderStatus}
          onChange={(sts) => setOrderStatus(sts)}
        />
        <div className="w-2" />
        <OrderStatusFilter
          allStatus={[
            ORDER_STATUS.ALL,
            ORDER_PAYMENT_STATUS.DUE,
            ORDER_PAYMENT_STATUS.PAID,
          ]}
          orderStatus={paymentStatus}
          onChange={(sts) => setPaymentStatus(sts)}
        />
      </div>

      {isLoading ? (
        <div className="w-full h-screen">
          <Spinner />
        </div>
      ) : isEmpty(filtredOrders) ? (
        <div className="w-full h-full">
          <NoData />
        </div>
      ) : (
        <div className="pt-2 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
          {React.Children.toArray(
            map(filtredOrders, (item) => <OrderCard data={item} />)
          )}
        </div>
      )}
    </div>
  );
};

export default MyOrders;

import { ArrowNarrowRightIcon } from "@heroicons/react/outline";
import { filter, find, get, map, sum, toUpper } from "lodash";
import moment from "moment";
import React, { useState } from "react";
import Header from "../../../Components/Layout/Header";
import Spinner from "../../../Components/Spinner";
import { checkIsPhone } from "../../../Helpers/global";
import { useRetailerReport } from "../../../Hooks/Reports";
import { useStocks } from "../../../Hooks/Stocks";
import { ORDER_PAYMENT_STATUS, ORDER_STATUS } from "../MyOrders/orders.helper";
const DATE_FORMATE = "YYYY-MM-DD";

const RangePicker = ({ dateRange, setDateRange }) => {
  const { from, to } = dateRange;
  const changeRange = (e) => {
    const name = e.target.name;
    const date = e.target.value;
    if (toUpper(name) === "FROM") {
      setDateRange({ from: moment(date, "YYYY-MM-DD").startOf("day"), to });
    } else {
      setDateRange({ from, to: moment(date, "YYYY-MM-DD").endOf("day") });
    }
  };
  return (
    <div className="w-full pt-12 flex items-center justify-center md:justify-start">
      <input
        type="date"
        id="start"
        name="from"
        value={from.format(DATE_FORMATE)}
        max={to.format(DATE_FORMATE)}
        onChange={changeRange}
        className="border px-1 w-40"
        required
      />
      <ArrowNarrowRightIcon className="w-4 h-4" />
      <input
        type="date"
        id="end"
        name="to"
        value={to.format(DATE_FORMATE)}
        min={from.format(DATE_FORMATE)}
        onChange={changeRange}
        className="border px-1 w-40"
        required
      />
    </div>
  );
};

const getStockName = (stocks, order) => {
  const { stockId } = order;
  return get(find(stocks, { id: stockId }), "name", "---");
};

const RetailerReport = () => {
  const isPhone = checkIsPhone();
  const { data: stockData } = useStocks();
  const [dateRange, setDateRange] = useState({
    from: moment().subtract(4, "day").startOf("day"),
    to: moment().endOf("day"),
  });
  const { data: report, isLoading } = useRetailerReport(dateRange);

  const tableData = filter(
    report,
    ({ status }) => status !== ORDER_STATUS.CANCELED
  );

  const amountDue = sum(
    map(
      filter(tableData, ({ payment }) => payment === ORDER_PAYMENT_STATUS.DUE),
      ({ price, quantity }) => price * quantity
    )
  );

  const amountPaid = sum(
    map(
      filter(tableData, ({ payment }) => payment === ORDER_PAYMENT_STATUS.PAID),
      ({ price, quantity }) => price * quantity
    )
  );

  return (
    <div className="w-full pt-2">
      <Header title="Amount Report" hideSearchBar />
      <RangePicker dateRange={dateRange} setDateRange={setDateRange} />
      <div className="relative w-full h-full">
        {isLoading && (
          <div className="absolute  top-0 left-0 flex justify-center items-center h-full w-full">
            <Spinner />
          </div>
        )}
        <div className="py-3 flex">
          <div className="border p-2 rounded-lg w-28">
            <small className="text-xs">Payment left</small>
            <h1 className="font-bold">Rs.{amountDue}</h1>
          </div>
          &nbsp;
          <div className="border p-2 rounded-lg w-28">
            <small className="text-xs">Payment Done</small>
            <h1 className="font-bold">Rs.{amountPaid}</h1>
          </div>
        </div>
        <table className="w-full">
          <thead
            className={`text-left border-black ${
              isPhone ? "text-xs border-b" : "border-b-2"
            }`}
          >
            <th>{isPhone ? "ID" : "Order ID"}</th>
            <th>Name</th>
            <th>{isPhone ? "Time" : "Date & Time"}</th>
            <th>Qty</th>
            <th>Price</th>
            <th>{isPhone ? "Amt" : "Payment"}</th>
          </thead>
          {React.Children.toArray(
            map(tableData, (order) => {
              if (isPhone) {
                return (
                  <tbody className="border-b text-sm h-10">
                    <td>
                      <small>{get(order, "id", "")}</small>
                    </td>
                    <td>
                      <small>{getStockName(stockData, order)}</small>
                    </td>
                    <td>
                      <small>
                        {moment(get(order, "time", "")).format(
                          "DD/MM/YY hh:mm A"
                        )}
                      </small>
                    </td>
                    <td>
                      <small>{get(order, "quantity", "")}pcs</small>
                    </td>
                    <td>
                      <small>
                        Rs.
                        {get(order, "quantity", 0) * get(order, "price", 0)}
                      </small>
                    </td>
                    <td>
                      <small>{get(order, "payment", "")}</small>
                    </td>
                  </tbody>
                );
              }
              return (
                <tbody className="border-b text-sm h-10">
                  <td>{get(order, "id", "")}</td>
                  <td>{getStockName(stockData, order)}</td>
                  <td>
                    {moment(get(order, "time", "")).format("DD-MMM-YY hh:mm A")}
                  </td>
                  <td>{get(order, "quantity", "")} Pieces</td>
                  <td>
                    Rs.{get(order, "quantity", 0) * get(order, "price", 0)}
                  </td>
                  <td
                    className={`${
                      get(order, "payment", "") === ORDER_PAYMENT_STATUS.DUE
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {get(order, "payment", "")}
                  </td>
                </tbody>
              );
            })
          )}
        </table>
      </div>
    </div>
  );
};

export default RetailerReport;

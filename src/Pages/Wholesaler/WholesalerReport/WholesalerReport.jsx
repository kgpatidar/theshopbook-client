import { ArrowLeftIcon, ArrowNarrowRightIcon } from "@heroicons/react/outline";
import { find, get, map, toUpper } from "lodash";
import moment from "moment";
import React from "react";
import { useMemo } from "react";
import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Header from "../../../Components/Layout/Header";
import Spinner from "../../../Components/Spinner";
import { checkIsPhone } from "../../../Helpers/global";
import { useOrders } from "../../../Hooks/Orders";
import { useWholesalerReport } from "../../../Hooks/Reports";
import { useRetailers } from "../../../Hooks/Retailers";
import { useStocks } from "../../../Hooks/Stocks";
import { ORDER_STATUS, ORDER_PAYMENT_STATUS } from "../Orders/orders.helper";
import { getColumns, getMappedReportData } from "./wholesalerReport.helper";
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

const WholesalerReport = () => {
  const isPhone = checkIsPhone();
  const history = useHistory();
  const { id = null } = useParams();
  const [dateRange, setDateRange] = useState({
    from: moment().subtract(4, "day").startOf("day"),
    to: moment().endOf("day"),
  });
  const {
    data: reportData,
    isLoading: loadingReportData,
  } = useWholesalerReport(dateRange);
  const { data: retailerData, isLoading: loadingRetailerData } = useRetailers();
  const { data: stockData, isLoading: loadingStockData } = useStocks();

  const mappedReportData = useMemo(
    () => getMappedReportData(reportData, retailerData, stockData),
    [reportData, retailerData, stockData]
  );

  const openSingleRetailerView = (record) => {
    const retailerId = get(record, "retailerId", 0);
    history.push(`/app/wholesaler/reports/${retailerId}`);
  };

  const columns = useMemo(() => getColumns(!id), [id]);

  const singleRetailerData = find(
    mappedReportData,
    ({ retailerId }) => retailerId == id
  );
  const tableData = id
    ? get(singleRetailerData, "orders", [])
    : mappedReportData;

  return (
    <div className="w-full">
      <Header
        title={
          singleRetailerData ? (
            <span className="overflow-hidden whitespace-nowrap">
              <small>Report : </small>
              {get(singleRetailerData, "retailerName", "")}
            </span>
          ) : (
            "Report"
          )
        }
        hideSearchBar
      />
      <RangePicker dateRange={dateRange} setDateRange={setDateRange} />
      {id && (
        <Link
          to={"/app/wholesaler/reports"}
          className="text-blue-600 flex items-center py-2"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          &nbsp;Back
        </Link>
      )}
      {loadingStockData || loadingReportData || loadingRetailerData ? (
        <div className="h-full w-full">
          <Spinner />
        </div>
      ) : (
        <table className="table-auto w-full overflow-x-auto">
          <thead
            className={`text-left border-b border-black ${
              isPhone ? "text-xs" : ""
            }`}
          >
            <tr>
              {React.Children.toArray(map(columns, (col) => <th>{col}</th>))}
            </tr>
          </thead>
          <tbody>
            {React.Children.toArray(
              map(tableData, (item) =>
                id ? (
                  <tr className="border-b cursor-pointer text-xs md:text-sm lg:text-base h-9">
                    <td>{item.orderId}</td>
                    <td>{item.name}</td>
                    <td>{moment(item.time).format("DD/MM/YY hh:mm A")}</td>
                    <td>{item.quantity}pcs</td>
                    <td>Rs.{item.price * item.quantity}</td>
                    <td
                      className={`${
                        item.payment === ORDER_PAYMENT_STATUS.DUE
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {item.payment}
                    </td>
                  </tr>
                ) : (
                  <tr
                    className="border-b cursor-pointer hover:bg-app-bg1 text-xs md:text-sm lg:text-base"
                    onClick={() => openSingleRetailerView(item)}
                  >
                    <td className="py-1 text-app-primary font-medium">
                      {item.retailerName}
                    </td>
                    <td>{item.totalOrder}</td>
                    <td>Rs. {item.totalDueAmount}</td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WholesalerReport;

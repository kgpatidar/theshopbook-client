import { find, forEach, get, map } from "lodash";
import { checkIsPhone } from "../../../Helpers/global";
import { ORDER_PAYMENT_STATUS, ORDER_STATUS } from "../Orders/orders.helper";

export const getMappedReportData = (reportData, retailerData, stockData) => {
  const mappedData = [];
  forEach(reportData, (item) => {
    const {
      id,
      payment,
      price,
      quantity,
      retailerId,
      status,
      stockId,
      time,
      wholesellerId,
    } = item;
    const retailer = find(retailerData, { id: retailerId });
    const stock = find(stockData, { id: stockId });

    const existingReportElement = find(mappedData, { retailerId });
    if (existingReportElement) {
      existingReportElement.totalOrder += 1;
      if (payment === ORDER_PAYMENT_STATUS.DUE) {
        existingReportElement.totalDueAmount += price * quantity;
        existingReportElement.orders.push({
          orderId: id,
          name: get(stock, "name", ""),
          payment,
          status,
          time,
          quantity,
          price,
        });
      }
    } else {
      mappedData.push({
        retailerId,
        retailerName: get(retailer, "name", ""),
        totalDueAmount: price * quantity,
        totalOrder: 1,
        orders: [
          {
            orderId: id,
            name: get(stock, "name", ""),
            payment,
            status,
            time,
            quantity,
            price,
          },
        ],
      });
    }
  });
  return mappedData;
};

export const getColumns = (all = true) => {
  const isPhone = checkIsPhone();
  return all
    ? [
        "Name",
        isPhone ? "Orders" : "Total Orders",
        isPhone ? "Amt Due" : "Amount Due",
      ]
    : [
        isPhone ? "ID" : "Order ID",
        "Name",
        "Time",
        isPhone ? "Qty" : "Quantity",
        "Price",
        isPhone ? "Amt" : "Amount",
      ];
};

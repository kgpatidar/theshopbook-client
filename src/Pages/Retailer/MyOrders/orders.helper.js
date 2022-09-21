import {
  BadgeCheckIcon,
  CheckIcon,
  ClockIcon,
  InformationCircleIcon,
  TruckIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { filter, get, keyBy, map, orderBy } from "lodash";
import moment from "moment";

export const ORDER_STATUS = {
  ALL: "ALL",
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  CANCELED: "CANCELED",
  PROGRESS: "PROGRESS",
  DELIVERED: "DELIVERED",
  COMPLETED: "COMPLETED",
};

export const ORDER_PAYMENT_STATUS = {
  DUE: "DUE",
  PAID: "PAID",
  LATER: "LATE",
};

export const ORDER_UI_ICON = {
  PENDING: ClockIcon,
  APPROVED: CheckIcon,
  CANCELED: XCircleIcon,
  PROGRESS: InformationCircleIcon,
  DELIVERED: TruckIcon,
  COMPLETED: BadgeCheckIcon,
};

export const PAYMENT_STATUS_UI_ICON = {
  DUE: ClockIcon,
  LATE: CheckIcon,
  PAID: BadgeCheckIcon,
};

export const ORDER_UI_COLOR = {
  PENDING: "yellow",
  APPROVED: "blue",
  CANCELED: "red",
  PROGRESS: "indigo",
  DELIVERED: "cyan",
  COMPLETED: "green",
};

export const PAYMENT_STATUS_COLOR = {
  DUE: "yellow",
  PAID: "green",
  LATE: "blue",
};

export const getMappedOrdersData = (
  orderData,
  stocksData,
  orderStatus,
  paymentStatus
) => {
  const stockDataMap = keyBy(stocksData, "id");
  const mappedOrderData = map(orderData, (item) => ({
    ...item,
    stock: get(stockDataMap, `${item.stockId}`, {}),
  }));
  const orderedOrderData = orderBy(mappedOrderData, "time", "desc");
  return filter(orderedOrderData, ({ status, payment }) => {
    if (orderStatus === ORDER_STATUS.ALL && paymentStatus === ORDER_STATUS.ALL)
      return true;
    return (
      (paymentStatus === ORDER_STATUS.ALL && orderStatus === status) ||
      (paymentStatus === payment && orderStatus === ORDER_STATUS.ALL) ||
      (paymentStatus === payment && status === orderStatus)
    );
  });
};

export const getDateTime = (time) => {
  const date = moment(time);
  return date.format("h:mm A, MMM DD, 'YY");
};

export const getAvailableNewStatus = (status, type) => {
  if (type === "ORDER_STATUS") {
    if (status === ORDER_STATUS.CANCELED) return [];
    if (status === ORDER_STATUS.PENDING) {
      return [ORDER_STATUS.APPROVED, ORDER_STATUS.CANCELED];
    }
    const newList = [
      ORDER_STATUS.PROGRESS,
      ORDER_STATUS.DELIVERED,
      ORDER_STATUS.COMPLETED,
      ORDER_STATUS.CANCELED,
    ];
    return newList.filter((sts) => sts !== status);
  }
  return [ORDER_PAYMENT_STATUS.DUE, ORDER_PAYMENT_STATUS.PAID].filter(
    (sts) => sts !== status
  );
};

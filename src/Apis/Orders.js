import { toLower } from "lodash";
import Api from "../Api";

export const fetchOrdersApi = async (wholesellerId, type) => {
  return Api.get(`orders/get-orders/${wholesellerId}/${toLower(type)}`);
};

export const getRetailerOrderApi = async (wholesellerId, retailerId) => {
  return Api.get(`orders/get-orders/retailer/${wholesellerId}/${retailerId}`);
};

export const approveOrderStatusApi = async (data) => {
  return Api.post("orders/confirm-order", data);
};

export const cancelOrderStatusApi = async (orderId) => {
  console.log(orderId);
  return Api.get(`orders/cancel-order/${orderId}`);
};

export const updateOrderStatusApi = async (data) => {
  return Api.post("orders/update-order-status", data);
};

export const updatePaymentStatusApi = async (data) => {
  return Api.post("orders/update-payment-status", data);
};

export const placeOrderApi = async (data) => {
  return Api.post("orders/place-new", data);
};

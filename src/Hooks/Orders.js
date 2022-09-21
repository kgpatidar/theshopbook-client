import { get } from "lodash";
import { useMutation, useQuery } from "react-query";
import {
  approveOrderStatusApi,
  cancelOrderStatusApi,
  fetchOrdersApi,
  getRetailerOrderApi,
  placeOrderApi,
  updateOrderStatusApi,
  updatePaymentStatusApi,
} from "../Apis/Orders";
import { getRetailerId, getWholesalerId } from "../Helpers/account";
import { useUser, useWholesellerId } from "./Auth";

export const useOrders = (type) => {
  const wholesellerId = useWholesellerId();
  const { data = {}, isLoading } = useQuery(
    ["fetchOrders", wholesellerId, type],
    () => fetchOrdersApi(wholesellerId, type)
  );

  return { data: get(data, "data.data", []), isLoading };
};

export const useRetailerOrder = (userData = {}) => {
  const wholesellerId = getWholesalerId(userData);
  const retailerId = getRetailerId(userData);
  const { data, isLoading } = useQuery(
    ["fetchRetailerOrders", wholesellerId, retailerId],
    () => getRetailerOrderApi(wholesellerId, retailerId)
  );
  return { data: get(data, "data.data", []), isLoading };
};

export const useOrdersActions = () => {
  const { mutate: approveOrderStatus, isLoading: isApproving } = useMutation(
    approveOrderStatusApi
  );
  const { mutate: cancelOrderStatus, isLoading: isCanceling } = useMutation(
    cancelOrderStatusApi
  );
  const { mutate: updateOrderStatus, isLoading: isUpdatingOS } = useMutation(
    updateOrderStatusApi
  );
  const { mutate: updatePaymentStatus, isLoading: isUpdatingPS } = useMutation(
    updatePaymentStatusApi
  );

  return {
    approveOrderStatus,
    cancelOrderStatus,
    updateOrderStatus,
    updatePaymentStatus,
    isApproving,
    isCanceling,
    isUpdatingOS,
    isUpdatingPS,
  };
};

export const usePlaceOrder = () => useMutation(placeOrderApi);

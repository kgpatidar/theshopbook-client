import { get } from "lodash";
import { useMutation, useQuery } from "react-query";
import {
  approveOrderStatusApi,
  cancelOrderStatusApi,
  fetchOrdersApi,
  updateOrderStatusApi,
  updatePaymentStatusApi,
} from "../Apis/Orders";
import { useWholesellerId } from "./Auth";

export const useOrders = (type) => {
  const wholesellerId = useWholesellerId();
  const { data = {}, isLoading } = useQuery(
    ["fetchOrders", wholesellerId, type],
    () => fetchOrdersApi(wholesellerId, type)
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

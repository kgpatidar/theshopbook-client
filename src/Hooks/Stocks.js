import { get } from "lodash";
import { useMutation, useQuery } from "react-query";
import { addNewStockApi, editStockApi, getStocksApi } from "../Apis/Stocks";
import { useUser } from "./Auth";

export const useStocks = () => {
  const { data: userData } = useUser();
  const wholesellerId = get(userData, "id", null);
  const { data, isLoading } = useQuery(["fetchStocks", wholesellerId], () =>
    getStocksApi(wholesellerId)
  );
  return { data: get(data, "data.data", []), isLoading };
};

export const useAddStocks = () => {
  const { mutate: addNewStock, isLoading: isAdding } = useMutation(
    addNewStockApi
  );
  const { mutate: editStock, isLoading: isEditing } = useMutation(editStockApi);
  return { addNewStock, isAdding, editStock, isEditing };
};

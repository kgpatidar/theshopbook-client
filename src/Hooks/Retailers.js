import { get } from "lodash";

const { useQuery, useMutation } = require("react-query");
const { getRetailers, addRetailer } = require("../Apis/Retailers");

export const useRetailers = () => {
  const { data = {}, isLoading } = useQuery("fetchRetailers", getRetailers);
  return { data: get(data, "data.data", []), isLoading };
};

export const useAddRetailer = () => {
  const { mutate: addNewRetailer, isLoading: isAdding } = useMutation(
    addRetailer
  );
  return { addNewRetailer, isAdding };
};

import { get } from "lodash";
import { useQuery } from "react-query";
import { fetchRetailerReport, fetchWholesalerReport } from "../Apis/Reports";
import { getRetailerId, getWholesalerId } from "../Helpers/account";
import { useUser } from "./Auth";

export const useWholesalerReport = ({ from, to }) => {
  const payload = {
    startDate: from.format("YYYY-MM-DD HH:mm:ss"),
    endDate: to.format("YYYY-MM-DD HH:mm:ss"),
  };

  const { data, isLoading } = useQuery(["fetch-W-Report", payload], () =>
    fetchWholesalerReport(payload)
  );
  return { data: get(data, "data.data", []), isLoading };
};

export const useRetailerReport = ({ from, to }) => {
  const { data: userData } = useUser();
  const wholesalerId = getWholesalerId(userData);
  const retailerId = getRetailerId(userData);
  const payload = {
    startDate: from.format("YYYY-MM-DD HH:mm:ss"),
    endDate: to.format("YYYY-MM-DD HH:mm:ss"),
    wholesalerId,
    retailerId,
  };

  const { data, isLoading } = useQuery(["fetch-R-Report", payload], () =>
    fetchRetailerReport(payload)
  );
  return { data: get(data, "data.data", []), isLoading };
};

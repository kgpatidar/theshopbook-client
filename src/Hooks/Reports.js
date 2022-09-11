import { get } from "lodash";
import { useQuery } from "react-query";
import { fetchWholesalerReport } from "../Apis/Reports";

export const useWholesalerReport = ({ from, to }) => {
  const payload = {
    startDate: from.format("YYYY-MM-DD HH:mm:ss"),
    endDate: to.format("YYYY-MM-DD HH:mm:ss"),
  };

  const { data, isLoading } = useQuery(["fetchReport", payload], () =>
    fetchWholesalerReport(payload)
  );
  return { data: get(data, "data.data", []), isLoading };
};

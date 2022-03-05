import { toLower } from "lodash";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { queryClient } from "../Helpers/queryClient";

const useBreadcrumb = () => {
  const { pathname } = useLocation();

  const match = (regex) => pathname.match(regex);

  if (match(/app\/wholesaler\/home/g)) {
    return [{ name: "Home" }];
  } else if (match(/app\/wholesaler\/stocks/g)) {
    return [{ name: "Stocks" }];
  } else if (match(/app\/wholesaler\/retailers/g)) {
    return [{ name: "Retailers" }];
  } else if (match(/app\/wholesaler\/notification/g)) {
    return [{ name: "Notification" }];
  }

  return [];
};

const useSearch = () => {
  const { data = "" } = useQuery("searchText", () => "");
  const changeText = (text = "") => {
    queryClient.setQueryData("searchText", toLower(text));
  };
  return { text: data, changeText };
};

export { useBreadcrumb, useSearch };

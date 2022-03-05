import { get, toUpper } from "lodash";

export const getAccountStatus = (userData) => {
  return toUpper(get(userData, "meta.status", "BLOCKED"));
};

export const isWholesaler = (userData) => {
  return toUpper(get(userData, "meta.type", "WHOLESALER")) === "WHOLESALER";
};

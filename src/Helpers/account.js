import { get, isNumber, toUpper } from "lodash";

export const getAccountStatus = (userData) => {
  return toUpper(get(userData, "meta.status", "BLOCKED"));
};

export const isWholesaler = (userData) => {
  return !isNumber(get(userData, "wholesellerId", null));
};

export const getWholesalerId = (userData) => {
  return get(userData, isWholesaler(userData) ? "id" : "wholesellerId", null);
};

export const getRetailerId = (userData) => {
  if (!isWholesaler(userData)) return get(userData, "id", -1);
  return null;
};

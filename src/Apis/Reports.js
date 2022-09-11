import Api from "../Api";

export const fetchWholesalerReport = (payload) => {
  return Api.post("reports/generate", payload);
};

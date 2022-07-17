import Api from "../Api";

export const getStocksApi = async (wholesellerId) => {
  return Api.get(`stocks/get-stocks/${wholesellerId}`);
};

export const addNewStockApi = async (data) => {
  return Api.post("stocks/add-new", data);
};

export const editStockApi = async (data) => {
  return Api.post("stocks/update", data);
};

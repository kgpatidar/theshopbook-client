import Api from "../Api";

export const addRetailer = async (data) => {
  return Api.post("user/add-retailer", data);
};

export const getRetailers = async () => {
  return Api.get("user/get-retailers");
};

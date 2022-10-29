import Api from "../Api";
export const LOCAL_STORAGE_KEY = "theshopbook-user-test-key-1";

export const registerUserApi = async (data) => {
  return await Api.post("user/register", data);
};

export const loginUserApi = async (data) => {
  return await Api.post("user/login", data);
};

export const logoutUserApi = async (data) => {
  await notificationUnSubscriptionApi();
  return localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export const setUserInLS = async (data) => {
  return await localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

export const getUserFromLS = async () => {
  let data = await localStorage.getItem(LOCAL_STORAGE_KEY);
  data = data ? JSON.parse(data) : null;
  return data;
};

export const sendVerificationMailApi = async (data) => {
  return await Api.post("user/send/verify", data);
};

export const notificationSubscriptionApi = async (data) => {
  return await Api.post("notification/subscribe", data);
};

export const notificationUnSubscriptionApi = async (data) => {
  return await Api.get("notification/unsubscribe");
};

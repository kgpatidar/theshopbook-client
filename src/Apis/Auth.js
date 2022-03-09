const LOCAL_STORAGE_KEY = "theshopbook-user-test-key-1";

export const registerUserApi = (data) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

export const loginUserApi = (data) => {
  const userData = localStorage.getItem(LOCAL_STORAGE_KEY) || {};
  return JSON.parse(userData);
};

export const logoutUserApi = (data) => {
  return localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export const getUserFromLS = async () => {
  let data = await localStorage.getItem(LOCAL_STORAGE_KEY);
  data = data ? JSON.parse(data) : null;
  return data;
};

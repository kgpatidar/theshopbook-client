export const registerUserApi = (data) => {
  localStorage.setItem("theshopbook-user", JSON.stringify(data));
};

export const loginUserApi = (data) => {
  const userData = localStorage.getItem("theshopbook-user") || {};
  return JSON.parse(userData);
};

export const logoutUserApi = (data) => {
  return localStorage.removeItem("theshopbook-user");
};

export const getUserFromLS = () => {
  return JSON.parse(localStorage.getItem("theshopbook-user") || {});
};

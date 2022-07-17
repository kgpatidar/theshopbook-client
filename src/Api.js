import axios from "axios";
import { get } from "lodash";
import { getUserFromLS, LOCAL_STORAGE_KEY } from "./Apis/Auth";

const { REACT_APP_BASE_URL } = process.env;

const Api = axios.create({
  baseURL: REACT_APP_BASE_URL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

Api.interceptors.request.use(
  async function (config) {
    const user = await getUserFromLS();
    const userID = get(user, "token", null);
    if (userID) {
      config.headers["token"] = userID;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default Api;

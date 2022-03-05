import axios from "axios";

const { REACT_APP_BASE_URL, REACT_APP_AUTH_TOKEN } = process.env;

const Api = axios.create({
  baseURL: REACT_APP_BASE_URL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
    "TRUCKX-FMS-ID": " ",
    Authorization: `Bearer ${REACT_APP_AUTH_TOKEN}`,
  },
});

export default Api;

import axios from "axios";
import cookie from "../cookie";
const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 30000,
});

http.interceptors.request.use(
  (configs) => {
    if (cookie.get("token")) {
      configs.headers.Authorization = `Bearer ${cookie.get("token")}`;
    }
    return configs;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
export default http;

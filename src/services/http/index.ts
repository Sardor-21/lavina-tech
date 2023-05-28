import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import cookie from "../cookie";
import calculateMD5Sign from "services/helper";
import { get } from "lodash";
import { MD5 } from "crypto-js";
const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 30000,
});

http.interceptors.request.use(
  (configs: InternalAxiosRequestConfig) => {
    if (cookie.get("key")) {
      configs.headers.Key = cookie.get("key");
      configs.headers.Sign = calculateMD5Sign({
        method: configs.method!,
        body: configs.data,
        url: configs.url?.slice(0, -1)!,
      });
      //  calculateMD5Sign(
      //   get(configs, "method")!,
      //   get(configs, "url")?.slice(0, -1)!,
      //   JSON.stringify(get(configs, "body")),
      //   cookie.get("secret")
      // );
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

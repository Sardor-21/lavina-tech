import { useMutation } from "@tanstack/react-query";
import { http, queryBuilder } from "services";
import { IMethod, TParams } from "services/types";

interface IPostOptions {
  method: IMethod;
  url: string;
  data: any;
  params?: TParams | undefined;
}

export async function postData(options: IPostOptions) {
  const { url, data, params, method } = options;
  return await http[method](queryBuilder(url, params), data);
}

const usePost = () => {
  return useMutation(postData);
};

export default usePost;

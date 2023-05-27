import { useMutation } from "@tanstack/react-query";
import { get } from "lodash";
import { http } from "services";

interface IPostOptions {
  url: string;
  onSuccess: (data: {}) => any;
  onError: (error: {}) => any;
}

const removeData = async ({
  url,
  onSuccess = () => {},
  onError = () => {},
}: IPostOptions) => {
  return await http
    .delete(url)
    .then((data) => {
      onSuccess(get(data, "data"));
    })
    .catch((error) => {
      onError(error);
    });
};
const useDelete = () => {
  return useMutation(removeData);
};

export default useDelete;

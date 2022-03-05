import { isNull } from "lodash";
import { useMutation, useQuery } from "react-query";
import {
  getUserFromLS,
  loginUserApi,
  logoutUserApi,
  registerUserApi,
} from "../Apis/Auth";
import { refechQuery } from "../Helpers/queryClient";

export const useAuth = () => {
  const { mutate: registerUser, isLoading: isRegistering } = useMutation(
    registerUserApi
  );
  const { mutate: loginUser, isLoading: isLogging } = useMutation(
    loginUserApi,
    { onSuccess: () => refechQuery("fetchUserInfo") }
  );
  const { mutate: logoutUser } = useMutation(logoutUserApi, {
    onSuccess: () => refechQuery("fetchUserInfo"),
  });
  return {
    registerUser,
    isRegistering,
    loginUser,
    isLogging,
    logoutUser,
  };
};

export const useUser = () => {
  const { data, isLoading } = useQuery("fetchUserInfo", getUserFromLS);
  return {
    isLoggedIn: !isNull(data),
    data,
    isLoading,
  };
};

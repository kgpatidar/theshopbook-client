import { get, isNull } from "lodash";
import { useMutation, useQuery } from "react-query";
import {
  getUserFromLS,
  loginUserApi,
  logoutUserApi,
  registerUserApi,
  sendVerificationMailApi,
  setUserInLS,
} from "../Apis/Auth";
import { refechQuery } from "../Helpers/queryClient";

export const useAuth = () => {
  const { mutate: registerUser, isLoading: isRegistering } = useMutation(
    registerUserApi
  );
  const { mutate: verifyEmail, isLoading: isSendingMail } = useMutation(
    sendVerificationMailApi
  );
  const { mutate: loginUser, isLoading: isLogging } = useMutation(
    loginUserApi,
    {
      onSuccess: (data) => {
        const userData = get(data, "data.data", {});
        setUserInLS(userData).then(() => refechQuery("fetchUserInfo"));
      },
    }
  );
  const { mutate: logoutUser } = useMutation(logoutUserApi, {
    onSuccess: () => refechQuery("fetchUserInfo"),
  });
  return {
    verifyEmail,
    isSendingMail,
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

export const useWholesellerId = () => {
  const { data } = useUser();
  const wholesellerId = get(data, "wholesellerId", null);
  return wholesellerId ? wholesellerId : get(data, "id", null);
};

import {useLocalStorage} from "@mantine/hooks";
import {useMutation} from "@tanstack/react-query";
import api from "./api";
import error from "./notifications/error";
import success from "./notifications/success";

export function useAuthMutation() {
  const [accessToken, setAccessToken] = useLocalStorage({ key: 'access-token' });

  const mutation = useMutation(api.authenticate, {
    onError: (error, variables, context) => {
      try {
        if (error.response.data.detail === 'LOGIN_BAD_CREDENTIALS') {
          error.displayBadCredentialErrorMessage();
          return;
        }
      } catch (e) {
        // do nothing
      }
      console.log("error", error)

      error.displayDefaultErrorMessage();

    },
    onSuccess: (data, variables, context) => {
      // store access_token in localstorage
      setAccessToken(data.data.access_token)
    },
  })

  return mutation;
}

export function useRegisterMutation() {
  const authMutation = useAuthMutation();
  const registerMutation = useMutation(api.register, {
    onError: (error, variables, context) => {
      try {
        if (error.response.data.detail === 'REGISTER_USER_ALREADY_EXISTS') {
          error.displayUserAlreadyExistsErrorMessage();
          return;
        }
      } catch (e) {
        // do nothing
      }
      console.log("error", error)

      error.displayDefaultErrorMessage();

    },
    onSuccess: (data, variables, context) => {
      authMutation.mutate(variables)
    },
  })
  return { ...registerMutation, isLoading: registerMutation.isLoading || authMutation.isLoading};
}

export function useResetPassMutation() {
  const mutation = useMutation(api.resetPass, {
    onError: (error, variables, context) => {
      console.log("error", error)
      error.displayDefaultErrorMessage();
    },
    onSuccess: (data, variables, context) => {
      success.displayPasswordResetMessage();
    },
  })

  return mutation;
}

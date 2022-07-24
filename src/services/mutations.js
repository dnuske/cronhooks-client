import {useLocalStorage} from "@mantine/hooks";
import {useMutation} from "@tanstack/react-query";
import api from "./api";
import {
  displayBadCredentialErrorMessage,
  displayDefaultErrorMessage,
  displayUserAlreadyExistsErrorMessage
} from "./notifications";

export function useAuthMutation() {
  const [accessToken, setAccessToken] = useLocalStorage({ key: 'access-token' });

  const mutation = useMutation(api.authenticate, {
    onError: (error, variables, context) => {
      try {
        if (error.response.data.detail === 'LOGIN_BAD_CREDENTIALS') {
          displayBadCredentialErrorMessage();
          return;
        }
      } catch (e) {
        // do nothing
      }
      console.log("error", error)

      displayDefaultErrorMessage();

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
          displayUserAlreadyExistsErrorMessage();
          return;
        }
      } catch (e) {
        // do nothing
      }
      console.log("error", error)

      displayDefaultErrorMessage();

    },
    onSuccess: (data, variables, context) => {
      authMutation.mutate(variables)
    },
  })
  return { ...registerMutation, isLoading: registerMutation.isLoading || authMutation.isLoading};
}


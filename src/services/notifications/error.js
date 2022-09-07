import {showNotification} from "@mantine/notifications";

export const displayDefaultErrorMessage = () => {
  showNotification({
    title: 'Something went wrong',
    message: 'This is a default error message, feel free to dig in dev console and report for improvement of the UI',
    color: 'red',
  });
}

export const displayUserAlreadyExistsErrorMessage = () => {
  showNotification({
    title: 'User already exists',
    message: 'Try logging in instead, or use a different email address',
    color: 'red',
  });
}

export const displayBadCredentialErrorMessage = () => {
  showNotification({
    title: 'Bad credentials',
    message: 'The e-mail or password are wrong',
    color: 'red',
  });
}

export default {
  displayDefaultErrorMessage,
  displayUserAlreadyExistsErrorMessage,
  displayBadCredentialErrorMessage,
}

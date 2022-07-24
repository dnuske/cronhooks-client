import {showNotification} from "@mantine/notifications";

export const displayPasswordResetMessage = () => {
  showNotification({
    title: 'Password reset',
    message: 'An e-mail should be in your inbox anytime soon',
    color: 'green',
  });
}

export default {
  displayPasswordResetMessage
}

import { showNotification } from '@mantine/notifications';

export const displayPasswordResetMessage = () => {
  showNotification({
    title: 'Password reset',
    message: 'An e-mail should be in your inbox anytime soon',
    color: 'green',
  });
};

export const displayHookCreatedMessage = () => {
  showNotification({
    title: 'New hook created',
    message: 'A new hook was created and will be hit on the specified time.',
    color: 'green',
  });
};

export const displayHookUpdateMessage = () => {
  showNotification({
    title: 'Hook updated',
    message: 'The hook was updated and will be hit on the specified time.',
    color: 'green',
  });
};

export default {
  displayPasswordResetMessage,
  displayHookCreatedMessage,
  displayHookUpdateMessage,
};

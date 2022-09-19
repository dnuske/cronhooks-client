import { Modal } from '@mantine/core';
import AppState from '../../services/state';
import ResetPassword from '../actions/ResetPassword';
import CreateCronhook from '../actions/CreateCronhook';
import CreateOneTimeCronhook from '../actions/CreateOneTimeCronhook';
import EditCronhook from '../actions/EditCronhook';

export default function GlobalModal() {
  let appState = AppState.useContainer();

  let title;
  let aModal;

  switch (appState.globalModalWhich) {
    case 'reset-password':
      title = 'Reset your password';
      aModal = <ResetPassword />;
      break;
    case 'create-cronhook':
      title = 'Create a recurrent hook call';
      aModal = <CreateCronhook />;
      break;
    case 'create-onetime-cronhook':
      title = 'Create a one time hook call';
      aModal = <CreateOneTimeCronhook />;
      break;
    case 'edit-cronhook':
      title = 'Edit this hook';
      aModal = <EditCronhook />;
      break;
  }

  return (
    <Modal
      transition="slide-down"
      opened={appState.globalModalOpen}
      onClose={() => appState.closeGlobalModal()}
      title={title}
    >
      {aModal}
    </Modal>
  );
}

import { Modal } from '@mantine/core';
import EditCronhook from './EditCronhook';

export default function EditAction({ setOpened, opened }) {
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Edit Cronhook"
    >
      <EditCronhook />
    </Modal>
  );
}

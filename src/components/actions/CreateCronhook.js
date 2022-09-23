import {
  Button,
  Group,
  PasswordInput,
  Space,
  LoadingOverlay,
  Select,
  Input,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { ArrowBigRight } from 'tabler-icons-react';
import { useCreateHookMutation } from '../../services/mutations';
import { useLocalStorage } from '@mantine/hooks';
import AppState from '../../services/state';

export default function CreateCronhook() {
  const [accessToken] = useLocalStorage({ key: 'access-token' });

  const createHookMutation = useCreateHookMutation();

  let appState = AppState.useContainer();

  const form = useForm({
    initialValues: {
      method: 'GET',
      url: '',
      // "body": "string",
      cron: '',
      // "headers": {},
      // "last_hit": "string",
    },

    validate: {
      method: (value) =>
        ['GET', 'POST'].includes(value) ? null : 'Not a valid HTTP verb',
      // "url": "string",
      // "cron": "string",
    },
  });

  const handleSubmit = (values) => {
    createHookMutation.mutate(values, {
      onSuccess: async () => {
        appState.setLastHookCreated(values);
        appState.closeGlobalModal();
      }
    })
  };

  return (
    <div style={{ position: 'relative' }}>
      <LoadingOverlay visible={createHookMutation.isLoading} />
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Select
          label="HTTP method"
          placeholder="Pick one"
          data={[
            { value: 'GET', label: 'GET' },
            { value: 'POST', label: 'POST' },
          ]}
          {...form.getInputProps('method')}
        />
        <Space h="xs" />
        <TextInput
          placeholder="https://"
          label="URL"
          description="This url will be hit every time the time specified in cron config is met"
          required
          {...form.getInputProps('url')}
        />
        <Space h="xs" />
        <TextInput
          placeholder="0 1 * * *"
          label="Crontab configuration"
          required
          {...form.getInputProps('cron')}
        />
        <Space h="xs" />
        <Group position="right" mt="md">
          <Button type="submit">
            <ArrowBigRight size={28} strokeWidth={2} color={'white'} />
          </Button>
        </Group>
      </form>
    </div>
  );
}

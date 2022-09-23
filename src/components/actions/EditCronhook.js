import {
  Button,
  Group,
  Space,
  LoadingOverlay,
  Select,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { ArrowBigRight } from 'tabler-icons-react';
import { useUpdateHookMutation } from '../../services/mutations';
import AppState from '../../services/state';

export default function EditCronhook() {
  const updateHookMutation = useUpdateHookMutation();

  let appState = AppState.useContainer();

  let hook = appState.selectedHook;

  const form = useForm({
    initialValues: {
      method: '',
      url: '',
      cron: '',
      body: '',
    },

    validate: {
      method: (value) =>
        ['GET', 'POST'].includes(value) ? null : 'Not a valid HTTP verb',
    },
  });

  useEffect(() => {
    form.setValues({
      method: hook?.method,
      url: hook?.url,
      cron: hook?.cron,
      body: '',
    });
  }, [hook]);

  return (
    <div style={{ position: 'relative' }}>
      <LoadingOverlay visible={updateHookMutation.isLoading} />
      <form
        onSubmit={form.onSubmit((values) => {
          updateHookMutation.mutate({ values, hookId: hook.id }, {
            onSuccess: async () => {
              appState.setSelectedHook(values)
              appState.closeGlobalModal();
              appState.setUpdateToken();
            }
          });
        })}
      >
        <Select
          label="HTTP method"
          placeholder="Pick one"
          value={hook?.method}
          data={[
            { value: 'GET', label: 'GET' },
            { value: 'POST', label: 'POST' },
          ]}
          {...form.getInputProps('method')}
        />
        <Space h="xs" />
        <TextInput
          value={hook?.url}
          placeholder="https://"
          label="URL"
          description="This url will be hit every time the time specified in cron config is met"
          required
          {...form.getInputProps('url')}
        />
        <Space h="xs" />
        <TextInput
          value={hook?.cron}
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

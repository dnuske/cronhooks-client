import {
  TextInput,
  Button,
  Group,
  PasswordInput,
  Space, LoadingOverlay
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {ArrowBigRight} from "tabler-icons-react";
import {useAuthMutation} from "../../services/mutations";


export default function Login() {

  const authMutation = useAuthMutation();

  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => value.length > 6 ? null : 'Password too short',
    },
  });

  return (<div style={{position: 'relative'}} >
    <LoadingOverlay visible={authMutation.isLoading} />
      <form onSubmit={form.onSubmit((values) => authMutation.mutate(values))}>
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />
        <Space h="sm" />
        <PasswordInput
          placeholder="Password"
          label="Password"
          required
          {...form.getInputProps('password')}
        />
        <Space h="xs" />

        <Group position="right" mt="md">
          <Button type="submit" ><ArrowBigRight
            size={28}
            strokeWidth={2}
            color={'white'}
          /></Button>
        </Group>
      </form>
    </div>
  );
}
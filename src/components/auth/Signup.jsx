import {
  TextInput,
  Checkbox,
  Button,
  Group,
  PasswordInput,
  Space, LoadingOverlay
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {ArrowBigRight} from "tabler-icons-react";
import {useRegisterMutation} from "../../services/mutations";

export default function Signup() {

  const registerMutation = useRegisterMutation();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      password2: '',
      wants_product_updates: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => value.length > 6 ? null : 'Password too short',
      password2: (value, values) => {
        if (!(value.length > 6)) {return 'Password too short'}
        if (value !== values.password) {return 'Passwords did not match'}
      }
    },
  });

  return <div style={{position: 'relative'}} >
    <LoadingOverlay visible={registerMutation.isLoading} />
    <form onSubmit={form.onSubmit((values) => registerMutation.mutate(values))}>
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
      <PasswordInput
        placeholder="Repeat password"
        label="Repeat password"
        required
        {...form.getInputProps('password2')}
      />
      <Space h="xs" />

      <Checkbox
        mt="md"
        label="I want to receive Cronhooks product updates"
        {...form.getInputProps('wants_product_updates', { type: 'checkbox' })}
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

}
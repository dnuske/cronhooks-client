import {
  TextInput,
  Checkbox,
  Button,
  Group,
  useMantineTheme,
  PasswordInput,
  Space, LoadingOverlay
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {ArrowBigRight} from "tabler-icons-react";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {showNotification} from "@mantine/notifications";
import qs from "qs";
import {useLocalStorage} from "@mantine/hooks";
import api from "../../services/api";
import {displayBadCredentialErrorMessage, displayDefaultErrorMessage} from "../../services/notifications";


export default function Login() {
  const theme = useMantineTheme();

  const [accessToken, setAccessToken] = useLocalStorage({ key: 'access-token' });

  const authMutation = useMutation(api.authenticate, {
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

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      allowEmails: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      // password: (value) => value.length > 6 ? null : 'Password too short',
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

        <Checkbox
          mt="md"
          label="I want to receive Cronhooks product updates"
          {...form.getInputProps('allowEmails', { type: 'checkbox' })}
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
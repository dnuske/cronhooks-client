import {
  TextInput,
  Checkbox,
  Button,
  Group,
  useMantineTheme,
  PasswordInput,
  Space
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {ArrowBigRight} from "tabler-icons-react";
import {useState} from "react";
// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
// } from '@tanstack/react-query'
// import { getTodos, postTodo } from '../my-api'

export default function Login() {
  const theme = useMantineTheme();

  const [activeTab, setActiveTab] = useState(0);

  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  // // Access the client
  // const queryClient = useQueryClient()
  //
  // // Queries
  // const query = useQuery(['todos'], getTodos)
  //
  // // Mutations
  // const mutation = useMutation(postTodo, {
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries(['todos'])
  //   },
  // })

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
      />
      <Space h="xs" />

      <Checkbox
        mt="md"
        label="I want to receive Cronhooks product updates"
        {...form.getInputProps('termsOfService', { type: 'checkbox' })}
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
  );
}
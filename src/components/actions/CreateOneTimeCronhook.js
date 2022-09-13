import {
  Button,
  Group,
  PasswordInput,
  Space,
  LoadingOverlay,
  Select,
  Input,
  TextInput,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ArrowBigRight } from "tabler-icons-react";
import {
  useCreateHookMutation,
  useResetPassMutation,
} from "../../services/mutations";
import { useLocalStorage } from "@mantine/hooks";
import { DatePicker, TimeInput } from "@mantine/dates";

export default function CreateCronhook() {
  const [accessToken] = useLocalStorage({ key: "access-token" });

  const createHookMutation = useCreateHookMutation();

  const form = useForm({
    initialValues: {
      method: "GET",
      url: "",
      // "body": "string",
      cron: "",
      // "headers": {},
      // "last_hit": "string",
    },

    validate: {
      method: (value) =>
        ["GET", "POST"].includes(value) ? null : "Not a valid HTTP verb",
      // "url": "string",
      // "cron": "string",
    },
  });

  return (
    <div style={{ position: "relative" }}>
      <LoadingOverlay visible={createHookMutation.isLoading} />
      <form
        onSubmit={form.onSubmit((values) => createHookMutation.mutate(values))}
      >
        <Select
          label="HTTP method"
          placeholder="Pick one"
          data={[
            { value: "GET", label: "GET" },
            { value: "POST", label: "POST" },
          ]}
          {...form.getInputProps("method")}
        />
        <Space h="xs" />
        <TextInput
          placeholder="https://"
          label="URL"
          description="This url will be hit every time the time specified in cron config is met"
          required
          {...form.getInputProps("url")}
        />
        <Space h="xs" />
        <Box
          sx={(theme) => ({ display: "flex", alignItems: "flex-end", gap: 8 })}
        >
          <DatePicker
            placeholder="Pick date"
            label="Dispatch at"
            withAsterisk
          />
          <TimeInput defaultValue={new Date()} withAsterisk />
        </Box>
        <Space h="xs" />
        <Group position="right" mt="md">
          <Button type="submit">Schedule a single call</Button>
        </Group>
      </form>
    </div>
  );
}

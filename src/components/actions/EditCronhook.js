import {
  Button,
  Group,
  Space,
  LoadingOverlay,
  Select,
  TextInput,
  Modal,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { ArrowBigRight } from "tabler-icons-react";
import { useUpdateHookMutation } from "../../services/mutations";

export default function EditCronhook({ setOpened, opened, hook }) {
  const updateHookMutation = useUpdateHookMutation();

  const form = useForm({
    initialValues: {
      method: "",
      url: "",
      cron: "",
    },

    validate: {
      method: (value) =>
        ["GET", "POST"].includes(value) ? null : "Not a valid HTTP verb",
      url: "string",
      cron: "string",
    },
  });

  useEffect(() => {
    form.setValues({
      method: hook.method,
      url: hook.url,
      cron: hook.cron,
    });
  }, [opened, hook]);

  //TODO: Hacer que el submit sea le pegue al update
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Edit Cronhook"
    >
      <div style={{ position: "relative" }}>
        <LoadingOverlay visible={updateHookMutation.isLoading} />
        <form
          onSubmit={form.onSubmit((values) =>
            updateHookMutation.mutate(values)
          )}
        >
          <Select
            label="HTTP method"
            placeholder="Pick one"
            value={hook.method}
            data={[
              { value: "GET", label: "GET" },
              { value: "POST", label: "POST" },
            ]}
            {...form.getInputProps("method")}
          />
          <Space h="xs" />
          <TextInput
            value={hook.url}
            placeholder="https://"
            label="URL"
            description="This url will be hit every time the time specified in cron config is met"
            required
            {...form.getInputProps("url")}
          />
          <Space h="xs" />
          <TextInput
            value={hook.cron}
            placeholder="0 1 * * *"
            label="Crontab configuration"
            required
            {...form.getInputProps("cron")}
          />
          <Space h="xs" />
          <Group position="right" mt="md">
            <Button type="submit">
              <ArrowBigRight size={28} strokeWidth={2} color={"white"} />
            </Button>
          </Group>
        </form>
      </div>
    </Modal>
  );
}
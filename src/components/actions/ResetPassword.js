import {
  Button,
  Group,
  PasswordInput,
  Space,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ArrowBigRight } from "tabler-icons-react";
import { useResetPassMutation } from "../../services/mutations";
import { useLocalStorage } from "@mantine/hooks";

export default function ResetPassword() {
  const [accessToken] = useLocalStorage({ key: "access-token" });

  const resetPassMutation = useResetPassMutation();

  const resetForm = useForm({
    initialValues: {
      password: "",
      password2: "",
      token: accessToken,
    },

    validate: {
      password: (value) => (value.length > 6 ? null : "Password too short"),
      password2: (value, values) => {
        if (!(value && value.length > 6)) {
          return "Password too short";
        }
        if (values && value !== values.password) {
          return "Passwords did not match";
        }
      },
    },
  });

  return (
    <div style={{ position: "relative" }}>
      <LoadingOverlay visible={resetPassMutation.isLoading} />
      <form
        onSubmit={resetForm.onSubmit((values) =>
          resetPassMutation.mutate(values)
        )}
      >
        <PasswordInput
          placeholder="Password"
          label="Password"
          required
          {...resetForm.getInputProps("password")}
        />
        <Space h="xs" />
        <PasswordInput
          placeholder="Repeat password"
          label="Repeat password"
          required
          {...resetForm.getInputProps("password2")}
        />
        <Space h="xs" />
        <Group position="right" mt="md">
          <Button type="submit">
            <ArrowBigRight size={28} strokeWidth={2} color={"white"} />
          </Button>
        </Group>
      </form>
    </div>
  );
}

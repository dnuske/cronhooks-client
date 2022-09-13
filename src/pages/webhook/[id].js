import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLocalStorage } from "@mantine/hooks";
import { Edit, Trash } from "tabler-icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Center,
  Container,
  Divider,
  Grid,
  Loader,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { useModals } from "@mantine/modals";

import { deleteHook, getHook, getHookHits } from "../../services/api";
import EditCronhook from "../../components/actions/EditCronhook";

const WebhookId = () => {
  const router = useRouter();
  const [accessToken] = useLocalStorage({ key: "access-token" });
  const [openedEditModal, setOpenedEditModal] = useState(false);

  const modals = useModals();

  const { id } = router.query;

  const {
    isLoading: loadingHook,
    data: hook,
    refetch: refetchHook,
  } = useQuery(["cronhook"], () => getHook(accessToken, id));

  const {
    isLoading: loadingHits,
    data: hookHits,
    refetch: refetchHits,
  } = useQuery(["hits"], () => getHookHits(accessToken, id));

  useEffect(() => {
    refetchHook();
    refetchHits();
  }, [id]);

  const openModalDelete = () =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          q This action is so important that you are required to confirm it with
          a modal. Please click one of these buttons to proceed.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });

  if (loadingHook || loadingHits) {
    return (
      <Center style={{ marginTop: 300, fontSize: 50 }}>
        <Loader />
      </Center>
    );
  }

  if (hook && hookHits) {
    return (
      <Container size={"md"}>
        <Paper shadow="xs" p="md">
          <Grid>
            <Grid.Col span={7}>
              <Link href="/">{`<- Back`}</Link>
            </Grid.Col>
            <Grid.Col span={1} offset={3}>
              <Edit
                onClick={() => setOpenedEditModal(true)}
                style={{
                  cursor: "pointer",
                }}
              />
            </Grid.Col>
            <Grid.Col span={1}>
              <Trash
                onClick={openModalDelete}
                style={{
                  cursor: "pointer",
                }}
              />
            </Grid.Col>
          </Grid>
          <Divider my="sm" variant="dotted" />
          <Stack align="flex-start" spacing="xs">
            <p>Hook: {hook.id}</p>
            <p>URL: {hook.url}</p>
            <p>Method: {hook.method}</p>
            <p>Cron: {hook.cron}</p>
            <p>Hits: </p>
            {hookHits.length > 0 ? (
              hookHits.map((hit, i) => (
                <p key={`p${i}`}>
                  {hit.started_at} {hit.response_status} - {hit.response}
                </p>
              ))
            ) : (
              <p>No hits yet</p>
            )}
          </Stack>
        </Paper>
        <EditCronhook
          setOpened={setOpenedEditModal}
          opened={openedEditModal}
          hook={hook}
        />
      </Container>
    );
  }
};

export default WebhookId;

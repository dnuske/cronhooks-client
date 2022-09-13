/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLocalStorage } from "@mantine/hooks";
import { Edit, Trash } from "tabler-icons-react";
import { useQuery } from "@tanstack/react-query";
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

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Delete this hook",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this hook? This action is irreversible
        </Text>
      ),
      labels: { confirm: "Delete hook", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        deleteHook(accessToken, id);
        router.push("/");
      },
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
                onClick={openDeleteModal}
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

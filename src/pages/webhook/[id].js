import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLocalStorage } from '@mantine/hooks';
import { Edit, Trash } from 'tabler-icons-react';
import { useQuery } from '@tanstack/react-query';
import {
  Center,
  Container,
  Divider,
  Grid,
  Loader,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { useModals } from '@mantine/modals';
import AppState from '../../services/state';
import { deleteHook, getHook, getHookHits } from '../../services/api';
import HitList from '../../components/display/HitList';
import Authenticated from '../../components/auth/Authenticated';
import GlobalModal from '../../components/architecture/GlobalModal';
// import EditAction from '../../components/actions/EditAction';

const WebhookId = () => {
  const router = useRouter();
  let appState = AppState.useContainer();
  const [accessToken] = useLocalStorage({ key: 'access-token' });

  const modals = useModals();

  const { id } = router.query;

  const {
    isLoading: loadingHook,
    data: hook,
  } = useQuery(
    ['cronhook', id, appState.updateToken],
    () => {
      if (id) {
        return getHook(accessToken, id)
      }
    }
  );

  const { isLoading: loadingHits, data: hookHits } = useQuery(
    ['hits', id],
    () => {
      if (id) {
        return getHookHits(accessToken, id)
      }
    },
    {
      refetchInterval: 10000,
    }
  );

  useEffect(() => {
    !loadingHook && appState.setSelectedHook(hook);
  }, [loadingHook, id]);

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: 'Delete this hook',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this hook? This action is irreversible
        </Text>
      ),
      labels: { confirm: 'Delete hook', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        deleteHook(accessToken, id);
        router.push('/');
      },
    });

  return (
    <Authenticated>
      <>
        <Container size={'md'}>
          {loadingHook || !hook ? (
            <Center style={{ marginTop: 300, fontSize: 50 }}>
              <Loader />
            </Center>
          ) : (
            <Paper shadow="xs" p="md">
              <Grid>
                <Grid.Col span={7}>
                  <Link href="/">{`<- Back`}</Link>
                </Grid.Col>
                <Grid.Col span={1} offset={3}>
                  <Edit
                    onClick={() => {
                      appState.openGlobalModal('edit-cronhook');
                    }}
                    style={{
                      cursor: 'pointer',
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={1}>
                  <Trash
                    onClick={openDeleteModal}
                    style={{
                      cursor: 'pointer',
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
              </Stack>
            </Paper>
          )}
          {!hookHits || loadingHits ? (
            <Center style={{ marginTop: 300, fontSize: 50 }}>
              <Loader />
            </Center>
          ) : (
            <Paper shadow="xs" p="md" mt="md">
              <p>Hits: </p>
              <Stack
                align="flex-start"
                spacing="xs"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {hookHits?.length > 0 ? (
                  <HitList hookHits={hookHits} />
                ) : (
                  <p>No hits yet</p>
                )}
              </Stack>
            </Paper>
          )}
        </Container>
        <GlobalModal />
      </>
    </Authenticated>
  );
};

export default WebhookId;

import { Center, Container, Kbd, Loader, Paper, Stack } from '@mantine/core';
import { useLocalStorage, useOs } from '@mantine/hooks';
import AppState from '../../services/state';
import { useEffect } from 'react';
import { getAllHooks } from '../../services/api';
import { useQuery } from '@tanstack/react-query';
import CronhookListItem from './CronhookListItem';
import MainTable from './MainTable';

export default function Main() {
  const os = useOs();

  let appState = AppState.useContainer();
  const [accessToken] = useLocalStorage({ key: 'access-token' });

  const {
    isLoading,
    data: cronhooks,
    refetch: refetchcronhooks,
  } = useQuery(['cronhooks', appState.lastHookCreated], () =>
    getAllHooks(accessToken)
  );

  useEffect(() => {
    appState.setCronhooks(cronhooks);
    appState.setSelectedHook(null);
  }, [cronhooks]);

  if (isLoading) {
    return (
      <Center style={{ marginTop: 300, fontSize: 50 }}>
        <Loader />
      </Center>
    );
  }
  if (cronhooks.length > 0) {
    return (
      <Center>
        <Container size={'md'}>
          <Paper shadow="xs" p="md">
            <MainTable cronhooks={cronhooks} />
          </Paper>
        </Container>
      </Center>
    );
  } else {
    return (
      <Center style={{ marginTop: 300, fontSize: 50 }}>
        {os === 'macos' ? (
          <>
            <Kbd style={{ fontSize: 50 }}>⌘</Kbd> +{' '}
            <Kbd style={{ fontSize: 50 }}>k</Kbd>
          </>
        ) : (
          <>
            <Kbd style={{ fontSize: 50 }}>ctrl</Kbd> +{' '}
            <Kbd style={{ fontSize: 50 }}>k</Kbd>
          </>
        )}
        &nbsp;to get started
      </Center>
    );
  }
}

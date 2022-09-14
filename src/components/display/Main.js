import { Center, Kbd, Loader, Paper, Stack } from '@mantine/core';
import { useLocalStorage, useOs } from '@mantine/hooks';
import AppState from '../../services/state';
import { useEffect } from 'react';
import { getAllHooks } from '../../services/api';
import { useQuery } from '@tanstack/react-query';
import CronhookListItem from './CronhookListItem';
import Link from 'next/link';

export default function Main() {
  const os = useOs();

  let appState = AppState.useContainer();
  const [accessToken] = useLocalStorage({ key: 'access-token' });

  // console.log(" --- ", accessToken)

  const {
    isLoading,
    data: cronhooks,
    refetch: refetchcronhooks,
  } = useQuery(['cronhooks'], () => getAllHooks(accessToken), {
    refetchInterval: 10000,
  });

  useEffect(() => {
    appState.setCronhooks(cronhooks);
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
        <Paper shadow="xs" p="md">
          <Stack align="flex-start" spacing="xs">
            {cronhooks.map((cronhook, i) => (
              <CronhookListItem key={`p${i}`} cronhook={cronhook} />
            ))}
          </Stack>
        </Paper>
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

import '../styles/globals.css';
import {
  Container,
  MantineProvider,
  Global,
  Center,
  Kbd,
  Badge,
} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import Head from 'next/head';
import AppState from '../services/state';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificationsProvider } from '@mantine/notifications';
import Link from 'next/link';
import { useLocalStorage, useOs } from '@mantine/hooks';
import NonSSRWrapper from "../components/architecture/NonSSRWrapper";

// Create a client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const [accessToken] = useLocalStorage({ key: 'access-token' });
  const os = useOs();

  return (
    <NonSSRWrapper>
      <Head>
        <title>Cronhooks</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <AppState.Provider>
        <QueryClientProvider client={queryClient}>
          <MantineProvider
            theme={{
              colorScheme: 'light',
              fontFamily: 'Verdana',
              Button: (theme, params) => ({
                // Shared button styles are applied to all buttons
                light: {
                  // subscribe to component params
                  color: theme.colors.violet,
                },
              }),
            }}
            withGlobalStyles
            withNormalizeCSS
          >
            <ModalsProvider>
              <NotificationsProvider>
                <Global
                  styles={(theme) => ({
                    body: {
                      ...theme.fn.fontStyles(),
                      backgroundColor: theme.colors.gray[0],
                      color: theme.black,
                      fontFamily: 'Fira Code',
                    },
                  })}
                />
                <Container size="md" px="md">
                  <Center>
                    <Link href="/">
                      <div style={{ fontSize: 50 }}>cronhooks</div>
                    </Link>
                    <Badge
                      ml={20}
                      size="xl"
                      radius="xl"
                      variant="gradient"
                      gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                    >
                      {os === 'macos' ? (
                        <>
                          <Kbd style={{ bottom: '3px', position: 'relative' }}>⌘</Kbd> +{' '}
                          <Kbd style={{ bottom: '3px', position: 'relative' }}>k</Kbd>
                        </>
                      ) : (
                        <>
                          <Kbd style={{ bottom: '3px', position: 'relative' }}>ctrl</Kbd> +
                          <Kbd style={{ bottom: '3px', position: 'relative' }}>k</Kbd>
                        </>
                      )}
                      &nbsp; to open the menu
                    </Badge>
                  </Center>
                  <Component {...pageProps} />
                </Container>
              </NotificationsProvider>
            </ModalsProvider>
          </MantineProvider>
        </QueryClientProvider>
      </AppState.Provider>
    </NonSSRWrapper>
  );
}

export default MyApp;

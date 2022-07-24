import '../styles/globals.css'
import {Container, MantineProvider, Global} from "@mantine/core";
import Head from 'next/head';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {NotificationsProvider} from "@mantine/notifications";

// Create a client
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <title>Page title</title>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    </Head>

    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={{
        colorScheme: 'light',
        fontFamily: 'Verdana',
        Button: (theme, params) => ({
          // Shared button styles are applied to all buttons
          light: {
            // subscribe to component params
            color: theme.colors.violet,
          },
        })
    }} withGlobalStyles withNormalizeCSS>
      <NotificationsProvider>
        <Global
          styles={(theme) => ({
            body: {
              ...theme.fn.fontStyles(),
              backgroundColor: theme.colors.gray[0],
              color: theme.black,
            },
          })}
        />
        <Container size="md" px="md">
          <Component {...pageProps} />
        </Container>
      </NotificationsProvider>
    </MantineProvider>
  </QueryClientProvider>
  </>
}

export default MyApp

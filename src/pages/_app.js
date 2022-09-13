import "../styles/globals.css";
import { Container, MantineProvider, Global, Center } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import Head from "next/head";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationsProvider } from "@mantine/notifications";
import AppState from "../services/state";

// Create a client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <AppState.Provider>
        <QueryClientProvider client={queryClient}>
          <MantineProvider
            theme={{
              colorScheme: "light",
              fontFamily: "Verdana",
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
                      fontFamily: "Fira Code",
                    },
                  })}
                />
                <Container size="md" px="md">
                  <Center>
                    <div style={{ fontSize: 50 }}>cronhooks</div>
                  </Center>
                  <Component {...pageProps} />
                </Container>
              </NotificationsProvider>
            </ModalsProvider>
          </MantineProvider>
        </QueryClientProvider>
      </AppState.Provider>
    </>
  );
}

export default MyApp;

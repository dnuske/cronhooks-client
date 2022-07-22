import '../styles/globals.css'
import {Container, MantineProvider, ButtonStylesParams} from "@mantine/core";


// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from '@tanstack/react-query'


// Create a client
// const queryClient = new QueryClient()


function MyApp({ Component, pageProps }) {
  // return <QueryClientProvider client={queryClient}>
  return <MantineProvider theme={{
      fontFamily: 'Verdana',
      Button: (theme, params) => ({
        // Shared button styles are applied to all buttons
        light: {
          // subscribe to component params
          color: theme.colors.violet,
        },
      })
    }} withGlobalStyles withNormalizeCSS>
      <Container size="md" px="md">
        <Component {...pageProps} />
      </Container>
    </MantineProvider>
  // </QueryClientProvider>

}

export default MyApp

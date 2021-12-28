import { ApolloProvider, NormalizedCacheObject } from '@apollo/client'
import type { AppProps } from 'next/app'
import { useApollo } from './hooks/useApollo'

interface AppPropsCache extends AppProps {
  pageProps: {
    cache: NormalizedCacheObject;
  }
}

export function App({ Component, pageProps }: AppPropsCache) {
  const client = useApollo(pageProps.cache)
  
  return (
    <ApolloProvider client={client}>
      <Component />
      <style jsx> {`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
              Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
    </ApolloProvider>
  )
}
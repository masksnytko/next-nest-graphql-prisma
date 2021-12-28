import { ApolloClient, InMemoryCache } from '@apollo/client'
import type { TypedTypePolicies } from '../types/type-policies'

const ssrMode = typeof window === 'undefined'

const typePolicies: TypedTypePolicies = {
  Query: {
    fields: {
      userById(user, { args, toReference }) {
        return user || toReference({
          __typename: 'User',
          id: args?.id
        })
      }
    }
  }
}

export function createApollo() {
  return new ApolloClient({
    ssrMode: ssrMode,
    cache: new InMemoryCache({
      typePolicies
    }),
    uri: ssrMode ? process.env.NEST_PUBLIC_GRAPHQL : process.env.NEXT_PUBLIC_GRAPHQL
  })
}
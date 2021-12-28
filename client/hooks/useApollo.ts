import type { NormalizedCacheObject } from '@apollo/client'
import { useMemo } from 'react'
import { createApollo } from '../lib/apollo'

const client = createApollo()

export function useApollo(cache: NormalizedCacheObject) {
  return useMemo(() => {
    const oldCache = client.cache.extract()
    client.cache.restore({ ...oldCache, ...cache })    
    return client
  }, [cache])
}
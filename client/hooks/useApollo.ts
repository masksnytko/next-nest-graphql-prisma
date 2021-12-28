import type { NormalizedCacheObject } from '@apollo/client'
import { useMemo } from 'react'
import { apollo } from '../lib/apollo'

export function useApollo(cache: NormalizedCacheObject) {
  return useMemo(() => {
    const oldCache = apollo.cache.extract()
    apollo.cache.restore({ ...oldCache, ...cache })    
    return apollo
  }, [cache])
}
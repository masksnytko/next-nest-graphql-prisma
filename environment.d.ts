declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      NEXT_PUBLIC_GRAPHQL: string
      NEST_PORT: string
      NEST_PUBLIC_GRAPHQL: string
    }
  }
}

export { }
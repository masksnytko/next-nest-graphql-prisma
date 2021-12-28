/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  redirects() {
    const redirects = []
    if (process.env.NEST_PUBLIC_GRAPHQL) {
      redirects.push({
        source: '/graphql',
        destination: process.env.NEST_PUBLIC_GRAPHQL,
        permanent: true
      })
    }
    return redirects
  }
}
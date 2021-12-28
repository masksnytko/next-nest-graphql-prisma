import { GetServerSideProps } from 'next'
import { UsersDocument } from '../../client/global'
import { createApollo } from '../../client/lib/apollo'
import { Users } from '../../client/pages/users'

export const getServerSideProps: GetServerSideProps = async () => {
  const client = createApollo()
  
  await client.query({
    fetchPolicy: 'network-only',
    query: UsersDocument
  })

  return {
    props: {
      cache: client.cache.extract()
    }
  }
}

export default Users
import { GetServerSideProps } from 'next'
import { UsersDocument } from '../../client/global'
import { apollo } from '../../client/lib/apollo'
import { Users } from '../../client/pages/users'

export const getServerSideProps: GetServerSideProps = async () => {
  await apollo.query({
    fetchPolicy: 'network-only',
    query: UsersDocument
  })

  return {
    props: {
      cache: apollo.cache.extract()
    }
  }
}

export default Users
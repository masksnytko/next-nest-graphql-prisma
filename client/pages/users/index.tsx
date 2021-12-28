import { User } from '../../components/user'
import { useUsersQuery } from '../../global'

export function Users() {
  const data = useUsersQuery()

  if (data.loading) {
    return '...loading'
  }

  if (data.error) {
    return (
      <div>
        <div>...error</div>
        <button onClick={() => data.refetch()} children='repeat loading'/>
      </div>
    )
  }

  return (
    <ul>
      {
        data.data?.users.map(user => {
          return (
            <li key={user.id}>
              <User id={user.id} />
            </li>
          )
        })
      }
    </ul>
  )
}
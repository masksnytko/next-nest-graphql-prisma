import { UsersDocument, useUserByIdQuery } from '../global'
import { useDeleteUserMutation } from './operation'

export interface UserProps {
  id: string
}

export function User({ id }: UserProps) {
  const data = useUserByIdQuery({
    variables: {
      id: id
    }
  })

  const [onDelete, dataOnDelete] = useDeleteUserMutation({
    variables: {
      id: id
    },
    refetchQueries: [UsersDocument]
  })

  const user = data.data?.userById
  if (user === undefined) {
    return null
  }

  return (
    <div>
      <div>{user.firstName}</div>
      <div>{user.lastName}</div>
      <div>{user.fullName}</div>
      <button onClick={() => {
        onDelete({
          variables: {
            id: user.id
          }
        })
      }}>
        {dataOnDelete.loading && '...deleting'}
        {dataOnDelete.error && 'repeat delete'}
        {!dataOnDelete.loading && !dataOnDelete.error && 'delete'}
      </button>
    </div>
  )
}
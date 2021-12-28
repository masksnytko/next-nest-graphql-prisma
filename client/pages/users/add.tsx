import { useState } from 'react'
import { UserInput } from '../../types/graphql'
import { useAddUserMutation } from './operations'
import Router from 'next/router'

export function UserAdd() {
  const [state, setState] = useState<UserInput>({
    email: 'test@example.com',
    firstName: 'first',
    lastName: 'last'
  })
  
  const [action, dataAction] = useAddUserMutation({
    onCompleted() {
      Router.push('/')
    }
  })

  if (dataAction.error! && dataAction.loading) {
    return '...loading'
  }

  if (dataAction.error) {
    return (
      <div>
        <div>...error</div>
        <button onClick={() => action({
          variables: {
            data: state
          }
        })} children='repeat add' />
      </div>
    )
  }

  return (
    <div>
      email: <input value={state?.email} onChange={value => {
        setState({
          ...state,
          email: value.target.value
        })
      }}/>
      first name: <input value={state?.firstName || ''} onChange={value => {
        setState({
          ...state,
          firstName: value.target.value
        })
      }}/>
      first name: <input value={state?.lastName || ''} onChange={value => {
        setState({
          ...state,
          lastName: value.target.value
        })
      }}/>

      <button children='add new' onClick={() => {
        action({
          variables: {
            data: state
          }
        })
      }}/>
    </div>
  )
}
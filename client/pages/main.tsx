import Link from 'next/link'

export function Main() {
  return (
    <>
      <Link children='users' href='/users' />
      <br/>
      <Link children='add new users' href='/users/add' />
    </>
  )
}
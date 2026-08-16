import { useLoaderData, Outlet } from 'react-router'

const UsersOutlet = () => {
  const { users } = useLoaderData()

  return <Outlet context={{ users }} />
}

export default UsersOutlet

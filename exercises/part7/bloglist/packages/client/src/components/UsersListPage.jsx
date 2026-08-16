import { useLoaderData } from 'react-router'
import UsersList from './UsersList'

const UsersListPage = () => {
  const { users } = useLoaderData()

  return <UsersList users={users} />
}

export default UsersListPage

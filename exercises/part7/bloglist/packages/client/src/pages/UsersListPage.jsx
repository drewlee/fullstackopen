import { useOutletContext } from 'react-router'
import UsersList from '../components/UsersList'

const UsersListPage = () => {
  const { users } = useOutletContext()

  return <UsersList users={users} />
}

export default UsersListPage

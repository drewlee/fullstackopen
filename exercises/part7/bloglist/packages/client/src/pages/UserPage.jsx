import { useOutletContext, useParams } from 'react-router'
import User from '../components/User'

const UserPage = () => {
  const { users } = useOutletContext()
  const { id } = useParams()
  const user = users.find((user) => user.id === id)

  return <User user={user} />
}

export default UserPage

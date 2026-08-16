import { createBrowserRouter, redirect } from 'react-router'
import { useBlogStore } from './stores/blogs'
import { useUserStore } from './stores/user'
import persistentUser from './services/persistent-user'
import blogService from './services/blogs'
import userService from './services/users'
import App from './App'
import BlogsPage from './pages/BlogsPage'
import BlogPage from './pages/BlogPage'
import LoginFormPage from './pages/LoginFormPage'
import BlogFormPage from './pages/BlogFormPage'
import UsersListPage from './components/UsersListPage'
import CatchAll from './pages/CatchAll'

const appPageLoader = async () => {
  const user = persistentUser.getUser()

  if (user) {
    useUserStore.setState({ user })
  }

  try {
    const blogs = await blogService.getAll()
    useBlogStore.setState({ blogs })
  } catch (error) {
    console.error(error)
  }
}

const loginPageLoader = () => {
  const { user } = useUserStore.getState()
  if (user) {
    return redirect('/')
  }
}

const createPageLoader = () => {
  const { user } = useUserStore.getState()
  if (!user) {
    return redirect('/')
  }
}

const usersPageLoader = async () => {
  let users = []

  try {
    users = await userService.getAll()
  } catch (error) {
    console.error(error)
  }

  return { users }
}

const router = createBrowserRouter([
  {
    Component: App,
    loader: appPageLoader,
    children: [
      {
        index: true,
        Component: BlogsPage,
      },
      {
        path: '/login',
        loader: loginPageLoader,
        Component: LoginFormPage,
      },
      {
        path: '/create',
        loader: createPageLoader,
        Component: BlogFormPage,
      },
      {
        path: '/blogs',
        loader: () => redirect('/'),
      },
      { path: '/blogs/:id', Component: BlogPage },
      {
        path: '/users',
        loader: usersPageLoader,
        Component: UsersListPage,
      },
      { path: '*', Component: CatchAll },
    ],
  },
])

export default router

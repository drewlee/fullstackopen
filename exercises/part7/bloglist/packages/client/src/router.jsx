import { createBrowserRouter, redirect } from 'react-router'
import persistentUser from './services/persistent-user'
import authService from './services/auth'
import App from './App'
import BlogsPage from './pages/BlogsPage'
import BlogPage from './pages/BlogPage'
import LoginFormPage from './pages/LoginFormPage'
import BlogFormPage from './pages/BlogFormPage'
import CatchAll from './pages/CatchAll'

const appPageLoader = () => {
  const user = persistentUser.getUser()
  if (user) {
    authService.setUser(user)
  }

  return { user }
}

const loginPageLoader = () => {
  const user = authService.getUser()
  if (user) {
    return redirect('/')
  }
}

const createPageLoader = () => {
  const user = authService.getUser()
  if (!user) {
    return redirect('/')
  }
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
      { path: '*', Component: CatchAll },
    ],
  },
])

export default router

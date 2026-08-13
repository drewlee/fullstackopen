import { createBrowserRouter, redirect } from 'react-router'
import authService from './services/auth'
import blogService from './services/blogs'
import App from './App'
import BlogsPage from './components/BlogsPage'
import BlogPage from './components/BlogPage'
import LoginFormPage from './components/LoginFormPage'
import BlogFormPage from './components/BlogFormPage'

const appPageLoader = async () => {
  const user = authService.getUserFromStorage()
  let blogs = []

  if (user) {
    authService.setUser(user)
  }

  try {
    blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
  } catch (error) {
    console.error(error)
  }

  return { blogs, user }
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
    ],
  },
])

export default router

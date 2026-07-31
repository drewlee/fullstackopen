import { createBrowserRouter } from 'react-router'
import blogService from './services/blogs'
import App from './App'
import BlogsPage from './components/BlogsPage'
import BlogPage from './components/BlogPage'
import LoginFormPage from './components/LoginFormPage'

const appPageLoader = async () => {
  let blogs = []

  try {
    blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
  } catch (error) {
    console.error(error)
  }

  return { blogs }
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
        Component: LoginFormPage,
      },
      { path: '/blogs/:id', Component: BlogPage },
    ],
  },
])

export default router

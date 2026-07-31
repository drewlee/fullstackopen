import { createBrowserRouter } from 'react-router'
import blogService from './services/blogs'
import App from './App'
import BlogsPage from './components/BlogsPage'
import LoginFormPage from './components/LoginFormPage'

const blogsPageLoader = async () => {
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
    children: [
      {
        index: true,
        Component: BlogsPage,
        loader: blogsPageLoader,
      },
      { path: '/login', Component: LoginFormPage },
    ],
  },
])

export default router

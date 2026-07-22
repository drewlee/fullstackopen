import Blog from './Blog'

const Blogs = ({ blogs, user, onLogout }) => {
  return (
    <div>
      <h2>blogs</h2>

      <p>{user.name} logged in</p>

      <button type="button" onClick={onLogout}>logout</button>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs

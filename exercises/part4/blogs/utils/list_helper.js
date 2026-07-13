const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  if (!blogs.length) {
    return 0
  }

  return blogs.reduce((count, blog) => {
    return count + blog.likes
  }, 0)
}

const favoriteBlog = blogs => {
  if (!blogs.length) {
    return null
  }

  return blogs.reduce((maxBlog, blog) => {
    if (blog.likes > maxBlog.likes) {
      return blog
    }
    return maxBlog
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}

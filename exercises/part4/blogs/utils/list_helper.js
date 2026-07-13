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

const mostBlogs = blogs => {
  if (!blogs.length) {
    return null
  }

  const authorCount = new Map()

  for (const blog of blogs) {
    const count = authorCount.get(blog.author) ?? 0
    authorCount.set(blog.author, count + 1)
  }

  const most = {
    author: '',
    blogs: 0,
  };

  for (const [key, value] of authorCount.entries()) {
    if (value > most.blogs) {
      most.author = key;
      most.blogs = value;
    }
  }

  return most;
}

const mostLikes = blogs => {
  if (!blogs.length) {
    return null
  }

  const likesCount = new Map()

  for (const blog of blogs) {
    const count = likesCount.get(blog.author) ?? 0
    likesCount.set(blog.author, count + blog.likes)
  }

  const most = {
    author: '',
    likes: 0,
  };

  for (const [key, value] of likesCount.entries()) {
    if (value > most.likes) {
      most.author = key;
      most.likes = value;
    }
  }

  return most;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}

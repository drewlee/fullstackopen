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

  const authorCount = {}

  for (const { author } of blogs) {
    const count = authorCount[author] ?? 0
    authorCount[author] = count + 1
  }

  const most = {
    author: '',
    blogs: 0,
  };

  for (const [key, value] of Object.entries(authorCount)) {
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

  const likesCount = {}

  for (const { author, likes } of blogs) {
    const count = likesCount[author] ?? 0
    likesCount[author] = count + likes
  }

  const most = {
    author: '',
    likes: 0,
  };

  for (const [key, value] of Object.entries(likesCount)) {
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

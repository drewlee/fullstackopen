const { beforeEach, test, describe } = require('node:test')
const assert = require('node:assert')
const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} = require('../utils/list_helper')

let singleBlog = null
let multipleBlogs = null

beforeEach(() => {
  singleBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  multipleBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }
  ]
})

test('dummy returns one', () => {
  const result = dummy([])
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is 0', () => {
    const result = totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only 1 blog, the total equals its likes', () => {
    const result = totalLikes(singleBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated correctly', () => {
    const result = totalLikes(multipleBlogs)
    assert.strictEqual(result, 36)
  })
})

describe('favorite blog', () => {
  test('of empty list is null', () => {
    const result = favoriteBlog([])
    assert.strictEqual(result, null)
  })

  test('when list has only 1 blog, it is returned', () => {
    const result = favoriteBlog(singleBlog)

    assert.deepStrictEqual(result, {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    })
  })

  test('of a bigger list is returned', () => {
    const result = favoriteBlog(multipleBlogs)

    assert.deepStrictEqual(result, {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    })
  })

  test('of duplicate likes, the first blog is returned', () => {
    multipleBlogs[2].likes = 10

    const result = favoriteBlog(multipleBlogs)

    assert.deepStrictEqual(result, {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 10,
      __v: 0
    })
  })
})

describe('most blogs', () => {
  test('of empty list is null', () => {
    const result = mostBlogs([])
    assert.strictEqual(result, null)
  })

  test('when list has only 1 blog it returns it', () => {
    const result = mostBlogs(singleBlog)

    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    })
  })

  test('of a bigger list is returned', () => {
    const result = mostBlogs(multipleBlogs)

    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })

  test('of duplicate authors, the first is returned', () => {
    multipleBlogs[5].author = 'John Doe'

    const result = mostBlogs(multipleBlogs)

    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      blogs: 2,
    })
  })
})

describe('most likes', () => {
  test('of empty list is null', () => {
    const result = mostLikes([])
    assert.strictEqual(result, null)
  })

  test('when list has only 1 blog it returns it', () => {
    const result = mostLikes(singleBlog)

    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('of a bigger list is returned', () => {
    const result = mostLikes(multipleBlogs)

    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })

  test('of duplicate authors, the first is returned', () => {
    multipleBlogs[1].likes = 0

    const result = mostLikes(multipleBlogs)

    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })
})

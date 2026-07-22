const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '')
    request.token = token
  }

  next()
}

const userExtractor = (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (decodedToken && decodedToken.id) {
      request.user = {
        username: decodedToken.username,
        id: decodedToken.id,
      }
    }
  }

  next()
}

module.exports = { tokenExtractor, userExtractor }

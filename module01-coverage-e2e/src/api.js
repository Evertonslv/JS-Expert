const http = require('http');
const DEFAULT_USER = { usarname: 'Everton', password: '123' }

const routes = {
  '/contact:get': (request, response) => {
    response.write('Contact us page!')
    return response.end()
  },
  '/login:post': async (request, response) => {
    for await (const data of request) {
      const user = JSON.parse(data)
      if (user.usarname !== DEFAULT_USER.usarname || user.password !== DEFAULT_USER.password) {
        response.writeHead(401)
        response.write('Logging failed!')
        return response.end()
      }

      response.write('Logging has succeeded!')
      return response.end()
    }
  },
  default: (request, response) => {
    response.write('Hello Wolrd!')
    return response.end()
  }
}

const handler = (request, response) => {
  const {url, method} = request
  const routeKey = `${url}:${method.toLowerCase()}`
  const chosen = routes[routeKey] || routes.default

  response.writeHead(200, {
    'Content-Type': 'text/html'
  })

  return chosen(request, response)
}

const app = http.createServer(handler)
    .listen(3001, () => console.log('app running at', 3001))

module.exports = app

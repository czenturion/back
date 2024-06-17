const http = require('http')
const { randomUUID } = require('crypto')

let reqCounter = 0

const server = http.createServer( (req, res) => {

  reqCounter++

  switch (req.url) {
    case 'requests':
      res.write('Requests ' + reqCounter)
      break

    case 'auth':
      res.write('UUID: ' + randomUUID())
      break

    default:
      res.write('Not Found')
  }

  res.end()
} )

server.listen(3003)
const http = require('http')
const fs = require('fs')
const { randomUUID } = require('crypto')


const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

const server = http.createServer(async  (req, res) => {
  if (req.url !== '/favicon.ico') {
    switch (req.url) {
      case '/':
        try {
          const data = await readFile('pages/home.html')
          res.write(data)
        } catch (e) {
          res.write('500 error occurred...')
        }
        res.end()
        break

      case '/requests':
        res.write('Requests ')
        res.end()
        break

      case '/auth':
        res.write('UUID: ' + randomUUID())
        res.end()
        break

      default:
        res.write('Not Found')
        res.end()
    }
  }
})

server.listen(3003)
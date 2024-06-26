import express from 'express'

const app = express()
const port = 3000

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

const db = {
  users: [
    {id: 1, name: 'first'},
    {id: 2, name: 'second'},
    {id: 3, name: 'third'},
    {id: 4, name: 'fourth'}]
}
const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404
}

app.get('/', (req, res) => {
  res.json({ message: [{id: 1}, {id: 2}, {id: 3}]})
})

app.get('/users', (req, res) => {
  let foundUsers = db.users

  if (req.query.name) {
    foundUsers = foundUsers
      .filter(u => u.name.indexOf(req.query.name) > -1)
  }

  if (foundUsers.length === 0) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
  }

  res.send(foundUsers)
})

app.get('/users/:id', (req, res) => {
  const foundUser = db.users.find(u => u.id === +req.params.id)

  if (!foundUser) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
  }

  res.json(foundUser)
})

app.post('/users', (req, res) => {
  if (!req.body.name) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    return
  }

  const createdUser = {
    id: +(new Date()),
    name: req.body.name
  }

  db.users.push(createdUser)

  res
    .status(HTTP_STATUSES.CREATED_201)
    .json(createdUser)
})

app.delete('/users/:id', (req, res) => {
  db.users = db.users.filter(u => u.id !== +req.params.id)

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

app.put('/users/:id', (req, res) => {
  if (!req.body.name) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    return
  }

  const foundUser = db.users.find(u => u.id === +req.params.id)

  if (!foundUser) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
  }

  foundUser.name = req.body.name

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
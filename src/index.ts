import express, { Response } from 'express'
import path from 'path'
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithQuery
} from './types'
import { QueryUserModel } from './models/QueryUserModel'
import { CreateUserModel } from './models/CreateUserModel'
import { UserViewModel } from './models/UserViewModel'
import { URIParamsUserIdModel } from './models/URIParamsUserIdModel'
import { UpdateUserModel } from './models/UpdateUserModel'

export const app = express()
const port = process.env.port || 5000

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

type UserType = {
  id: number
  name: string
  secret: string
}

export const db: { users: UserType[] } = {
  users: [
    {id: 1, name: 'first', secret: 'qwerty'},
    {id: 2, name: 'second', secret: 'qwerty'},
    {id: 3, name: 'third', secret: 'qwerty'},
    {id: 4, name: 'fourth', secret: 'qwerty'}
  ]
}
export const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404
}

const getUserViewModel = (user: UserType): UserViewModel => {
  return {
    id: user.id,
    name: user.name
  }
}

app.get('/', (req, res) => {
  res
    .status(HTTP_STATUSES.OK_200)
    .sendFile(path.join(__dirname, 'pages', 'home.html'))
})

app.get('/users', (req: RequestWithQuery<QueryUserModel>,
                   res: Response<UserViewModel[]>) => {
  const name = req.query.name
  let foundUsers = db.users

  if (name) {
    foundUsers = foundUsers
      .filter(u => u.name.indexOf(name) > -1)
  }

  if (foundUsers.length === 0) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
  }

  res.send(foundUsers.map(getUserViewModel))
})

app.get('/users/:id', (req: RequestWithParams<URIParamsUserIdModel>,
                       res: Response<UserViewModel>) => {
  const id = req.params.id
  const foundUser = db.users.find(u => u.id === +id)

  if (!foundUser) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
  }

  res.json(getUserViewModel(foundUser))
})

app.post('/users', (req: RequestWithBody<CreateUserModel>,
                    res: Response<UserViewModel>) => {
  const name = req.body.name
  if (!name) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    return
  }

  const createdUser = {
    id: +(new Date()),
    name: name,
    secret: ''
  }

  db.users.push(createdUser)

  res
    .status(HTTP_STATUSES.CREATED_201)
    .json(getUserViewModel(createdUser))
})

app.delete('/users/:id', (req: RequestWithParams<URIParamsUserIdModel>, res) => {
  const id = req.params.id
  db.users = db.users.filter(u => u.id !== +id)

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

app.put('/users/:id', (req: RequestWithParamsAndBody<URIParamsUserIdModel, UpdateUserModel>, res) => {
  const name = req.body.name
  if (!name) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    return
  }

  const id = req.params.id
  const foundUser = db.users.find(u => u.id === +id)

  if (!foundUser) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
  }

  foundUser.name = name

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

app.delete('/__test__/data', (req, res) => {
  db.users = []
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
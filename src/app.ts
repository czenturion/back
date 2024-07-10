import express, { NextFunction, Request, Response } from 'express'
import { getHomeRoutes } from './routes/home'
import { getUsersRoutes } from './routes/users'
import { getTestsRoutes } from './routes/tests'
import { HTTP_STATUSES } from './utils'

const authGuardMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.query.token === '123') {
    next()
  } else {
    res.send(HTTP_STATUSES.UNAUTHORIZED_401)
  }
}

export let requestCounter = 0
const requestCountMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  requestCounter++
  next()
}

export const app = express()

const jsonBodyMiddleware = express.json()

app.use(requestCountMiddleware)
app.use(jsonBodyMiddleware)
app.use(authGuardMiddleware)

app.use('/', getHomeRoutes)
app.use('/users', getUsersRoutes)
app.use('/__test__', getTestsRoutes)

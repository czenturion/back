import express from 'express'
import { getHomeRoutes } from './routes/home'
import { getUsersRoutes } from './routes/users'
import { getTestsRoutes } from './routes/tests'


export const app = express()

const jsonBodyMiddleware = express.json()

app.use(jsonBodyMiddleware)

app.use('/', getHomeRoutes)
app.use('/users', getUsersRoutes)
app.use('/__test__', getTestsRoutes)



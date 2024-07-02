import express from 'express'
import { UserViewModel } from './models/UserViewModel'
import { db, UserType } from './db/db'
import { getUsersRoutes } from './routes/users'
import { getTestsRoutes } from './routes/tests'
import {getHomeRoutes} from "./routes/home";


export const app = express()

const jsonBodyMiddleware = express.json()

app.use(jsonBodyMiddleware)

app.use('/', getHomeRoutes())
app.use('/users', getUsersRoutes(db))
app.use('/__test__', getTestsRoutes(db))



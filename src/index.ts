import { app } from './app'


const port = process.env.port || 5000


app.listen(port, () => {
  console.log(`Example app listening on port ${ port }`)
})

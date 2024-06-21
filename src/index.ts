import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!!!!')
})
app.get('/users', (req, res) => {
  res.send('No users yet!')
})
app.post('/users', (req, res) => {
  res.send('User created')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
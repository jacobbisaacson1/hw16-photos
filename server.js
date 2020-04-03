require('dotenv').config()
const express = require('express')
const server = express()
const PORT = process.env.PORT

server.get('/', (req, res) => {
  res.send('hi im server')
})

server.get('*', (req, res) => {
  res.status(404).send('404 Page not found')
})

server.listen(PORT, () => {
  const d = new Date()
  console.log(`${d.toLocaleString()}: Server listening on port ${PORT}`);
})
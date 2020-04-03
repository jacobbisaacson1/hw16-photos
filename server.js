require('dotenv').config()
const express = require('express')
const server = express()
const PORT = process.env.PORT

//midware
server.use(express.static('public'))

server.get('/', (req, res) => {
  res.render('home.ejs')
})

server.get('*', (req, res) => {
  res.status(404).render('404.ejs')
})

server.listen(PORT, () => {
  const d = new Date()
  console.log(`${d.toLocaleString()}: Server listening on port ${PORT}`);
})
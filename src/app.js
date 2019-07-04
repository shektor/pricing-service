const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => res.send('Pricing Service'))

app.post('/quotes', (req, res) => {
  let content = req.body

  return res.status(201).send(content)
})

module.exports = app

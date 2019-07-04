const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => res.send('Pricing Service'))

app.post('/sales', (req, res) => {
  let content = req.body

  if (content.order) {
    return res.status(201).send(content)
  }
  return res.status(400).send()
})

module.exports = app

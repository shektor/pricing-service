const pricing = require('../data/pricing')
const { Sale } = require('./models/sale')
const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => res.send('Pricing Service'))

app.post('/sales', (req, res) => {
  let content = req.body

  if (content.order) {
    let sale = new Sale(content.order, pricing)
    return res.status(201).send(sale.jsonFormat())
  }
  return res.status(400).send()
})

module.exports = app

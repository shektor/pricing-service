const apiConnect = require('./connections/apiConnect')
const pricing = require('../data/pricing')
const { Sale } = require('./models/sale')
const express = require('express')
const app = express()

let forexData
const url = 'https://api.exchangeratesapi.io/latest?base=GBP'

apiConnect.fetchData(url)
  .then(data => forexData = data)

app.use(express.json())

app.get('/', (req, res) => res.send('Pricing Service'))

app.post('/sales', (req, res) => {
  const content = req.body

  if (content.order) {
    const exchangeRate = {
      currency: content.order.currency,
      rate: forexData.rates[content.order.currency]
    }
    const sale = new Sale(content.order, pricing, exchangeRate)
    sale.priceItems()

    return res.status(201).send(sale.jsonFormat())
  }
  return res.status(400).send()
})

module.exports = app

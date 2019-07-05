class Sale {
  constructor (order, prices, exchangeRate) {
    this.order = order
    this.prices = prices
    this.items = []
    this.total = 0
    this.vat = 0
    this.exchangeRate = exchangeRate
  }

  priceItems () {
    this.order.items.forEach((item) => {
      const vatBand = this.prices.product[item.product_id].vat_band
      const vatMultiplier = this.prices.vat_bands[vatBand]

      const itemPrice = this.prices.product[item.product_id].price
      const itemPriceConverted = Math.round(itemPrice * this.exchangeRate.rate)

      const netItemTotal = itemPriceConverted * item.quantity
      const vatTotal = this.calculateVAT(vatMultiplier, netItemTotal)

      const itemPriced = {
        'product_id': item.product_id,
        'quantity': item.quantity,
        'price': itemPrice,
        'total': netItemTotal + vatTotal,
        'vat': vatTotal
      }

      this.items.push(itemPriced)
      this.addToTotal(netItemTotal + vatTotal)
      this.addToVAT(vatTotal)
    })
    return this.items
  }

  addToTotal (value) {
    this.total += value
    return this.total
  }

  addToVAT (value) {
    this.vat += value
    return this.vat
  }

  calculateVAT (multiplier, value) {
    return Math.round(multiplier * value)
  }

  jsonFormat () {
    this.priceItems()

    const json = {
      'sale': {
        'total': this.total,
        'vat': this.vat,
        'currency': this.exchangeRate.currency,
        'items': this.items
      }
    }

    return json
  }
}

module.exports = {
  Sale
}

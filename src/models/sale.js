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
      const vatMultiplier = this.vatMultiplierFor(item.product_id)

      const itemPrice = this.priceOne(item.product_id)

      const netItemTotal = itemPrice * item.quantity
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

  vatMultiplierFor (product_id) {
    const band = this.prices.product[product_id].vat_band
    const multiplier = this.prices.vat_bands[band]
    return multiplier
  }

  priceOne (product_id) {
    const price = this.prices.product[product_id].price
    const priceConverted = Math.round(price * this.exchangeRate.rate)

    return priceConverted
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
    const vat = Math.round(multiplier * value)
    return vat
  }

  jsonFormat () {
    this.priceItems()

    const json = {
      'sale': {
        'order_id': this.order.id,
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

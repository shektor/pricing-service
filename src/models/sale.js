class Sale {
  constructor (order, prices) {
    this.order = order
    this.prices = prices
    this.items = []
    this.total = 0
  }

  priceItems () {
    this.order.items.forEach((item) => {
      const vatBand = this.prices.product[item.product_id].vat_band
      const vatMultiplier = this.prices.vat_bands[vatBand]

      const itemPrice = this.prices.product[item.product_id].price

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
    })
    return this.items
  }

  addToTotal (value) {
    this.total += value
    return this.total
  }

  calculateVAT (multiplier, value) {
    return Math.round(multiplier * value)
  }

  jsonFormat () {
    this.priceItems()

    const json = {
      'sale': {
        'total': this.total
      }
    }

    return json
  }
}

module.exports = {
  Sale
}

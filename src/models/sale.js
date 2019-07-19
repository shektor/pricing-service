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

      const itemTotal = this.twoDecimalPlace(netItemTotal + vatTotal)

      const itemPriced = {
        'product_id': item.product_id,
        'quantity': item.quantity,
        'price': itemPrice,
        'total': itemTotal,
        'vat': vatTotal
      }

      this.items.push(itemPriced)
      this.addToTotal(itemTotal)
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
    const priceInGBP = this.prices.product[product_id].price / 100
    const priceConverted = this.twoDecimalPlace(priceInGBP * this.exchangeRate.rate)

    return priceConverted
  }

  addToTotal (value) {
    this.total = this.twoDecimalPlace(this.total + value)
    return this.total
  }

  addToVAT (value) {
    this.vat = this.twoDecimalPlace(this.vat + value)
    return this.vat
  }

  calculateVAT (multiplier, value) {
    const vat = this.twoDecimalPlace(multiplier * value)
    return vat
  }

  twoDecimalPlace (value) {
    const fixedString = value.toFixed(2)
    const parsedBack = parseFloat(fixedString)
    return parsedBack
  }

  jsonFormat () {
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

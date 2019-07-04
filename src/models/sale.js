class Sale {
  constructor (order, prices) {
    this.order = order
    this.prices = prices
  }

  total () {
    let total = 0

    this.order.items.forEach((item) => {
      const vatBand = this.prices.product[item.product_id].vat_band
      const vatMultiplier = this.prices.vat_bands[vatBand]

      const itemPrice = this.prices.product[item.product_id].price

      const netItemTotal = itemPrice * item.quantity
      const vatItemTotal = Math.round(netItemTotal * vatMultiplier)

      total += netItemTotal + vatItemTotal
    })

    return total
  }

  jsonFormat () {
    const json = {
      'sale': {
        'total': this.total()
      }
    }

    return json
  }
}

module.exports = {
  Sale
}

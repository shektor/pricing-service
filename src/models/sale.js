class Sale {
  constructor (order, prices) {
    this.order = order
    this.prices = prices
  }

  total () {
    let total = 0

    this.order.items.forEach((item) => {
      total += this.prices.product[item.product_id].price * item.quantity
    })

    return total
  }
}

module.exports = {
  Sale
}

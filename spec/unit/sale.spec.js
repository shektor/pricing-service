const { Sale } = require('../../src/models/sale')
const pricing = require('../../data/pricing')

describe('Sale', () => {
  describe('::new', () => {
    it('is an instance of Sale', () => {
      const sale = new Sale()

      expect(sale).toBeInstanceOf(Sale)
    })
  })

  describe('#total', () => {
    it('returns order total for items with no VAT', () => {
      const order = {
        items: [
          {
            product_id: 2,
            quantity: 1
          },
          {
            product_id: 3,
            quantity: 2
          }
        ]
      }

      const sale = new Sale(order, pricing)

      expect(sale.total()).toBe(750)
    })
  })
})

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

    it('returns order total for items with VAT', () => {
      const order = {
        items: [
          {
            product_id: 1,
            quantity: 2
          },
          {
            product_id: 4,
            quantity: 3
          }
        ]
      }

      const sale = new Sale(order, pricing)

      expect(sale.total()).toBe(4438)
    })
  })

  describe('#calculateVAT', () => {
    it('returns VAT value with standard arithmetic rounding', () => {
      const sale = new Sale()
      const vat = sale.calculateVAT(0.2, 599)

      expect(vat).toBe(120)
    })
  })

  describe('#jsonFormat', () => {
    it('returns json formatted sale data', () => {
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

      const json = {
        'sale': {
          'total': 750
        }
      }

      expect(sale.jsonFormat()).toEqual(json)
    })
  })
})

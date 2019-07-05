const { Sale } = require('../../src/models/sale')
const pricing = require('../../data/pricing')

describe('Sale', () => {
  let sale

  beforeEach(() => {
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

    sale = new Sale(order, pricing)
  })

  describe('::new', () => {
    it('is an instance of Sale', () => {
      expect(sale).toBeInstanceOf(Sale)
    })
  })

  describe('#priceItems', () => {
    it('returns an array of priced items based on the order', () => {
      const pricedItems = [
        {
          'product_id': 1,
          'quantity': 2,
          'price': 599,
          'total': 1438,
          'vat': 240
        },
        {
          'product_id': 4,
          'quantity': 3,
          'price': 1000,
          'total': 3000,
          'vat': 0
        }
      ]

      expect(sale.priceItems()).toEqual(pricedItems)
    })
  })

  describe('#addToTotal', () => {
    it('adds to the total of sale', () => {
      expect(sale.addToTotal(250)).toBe(250)
      expect(sale.addToTotal(300)).toBe(550)
    })
  })

  describe('#addToVAT', () => {
    it('adds to the VAT of sale', () => {
      expect(sale.addToVAT(20)).toBe(20)
      expect(sale.addToVAT(40)).toBe(60)
    })
  })

  describe('#calculateVAT', () => {
    it('returns VAT value with standard arithmetic rounding', () => {
      const vat = sale.calculateVAT(0.2, 599)

      expect(vat).toBe(120)
    })
  })

  describe('#jsonFormat', () => {
    it('returns json formatted sale data', () => {
      const json = {
        'sale': {
          'total': 4438
        }
      }

      expect(sale.jsonFormat()).toEqual(json)
    })
  })
})

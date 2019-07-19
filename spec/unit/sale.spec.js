const { Sale } = require('../../src/models/sale')
const pricing = require('../../data/pricing')

describe('Sale', () => {
  let sale, exchangeRate, order

  beforeEach(() => {
    exchangeRate = {
      currency: 'GBP',
      rate: 1
    }

    order = {
      id: 1,
      currency: 'GBP',
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

    sale = new Sale(order, pricing, exchangeRate)
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
          'price': 5.99,
          'total': 14.38,
          'vat': 2.40
        },
        {
          'product_id': 4,
          'quantity': 3,
          'price': 10,
          'total': 30,
          'vat': 0
        }
      ]

      expect(sale.priceItems()).toEqual(pricedItems)
    })
  })

  describe('#vatMultiplierFor', () => {
    it('returns VAT multiplier for product', () => {
      const product_id = 1
      expect(sale.vatMultiplierFor(product_id)).toBe(0.2)
    })
  })

  describe('#priceOne', () => {
    it('returns price of product in requested currency GBP', () => {
      const product_id = 1

      expect(sale.priceOne(product_id)).toEqual(5.99)
    })

    it('returns price of product in requested currency USD', () => {
      exchangeRate = {
        currency: 'USD',
        rate: 1.25
      }

      sale = new Sale(order, pricing, exchangeRate)
      const product_id = 1

      expect(sale.priceOne(product_id)).toEqual(7.49)
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
      const vat = sale.calculateVAT(0.2, 100)

      expect(vat).toEqual(20)
    })
  })

  describe('#twoDecimalPlace', () => {
    it('returns a value fixed to 2 decimal places, rounding if required', () => {
      const value = 3.966

      expect(sale.twoDecimalPlace(value)).toEqual(3.97)
    })
  })

  describe('#jsonFormat', () => {
    it('returns json formatted sale data', () => {
      const json = {
        'sale': {
          'order_id': 1,
          'total': 44.38,
          'vat': 2.4,
          'currency': 'GBP',
          'items': [
            {
              'product_id': 1,
              'quantity': 2,
              'price': 5.99,
              'total': 14.38,
              'vat': 2.4
            },
            {
              'product_id': 4,
              'quantity': 3,
              'price': 10,
              'total': 30,
              'vat': 0
            }
          ]
        }
      }

      expect(sale.jsonFormat()).toEqual(json)
    })
  })
})

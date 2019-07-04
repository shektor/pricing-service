const { Sale } = require('../../src/models/sale')

describe('Sale', () => {
  describe('::new', () => {
    it('is an instance of Sale', () => {
      const sale = new Sale()

      expect(sale).toBeInstanceOf(Sale)
    })
  })
})

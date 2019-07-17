const forex = require('../../src/connections/forex')
const axios = require('axios')

jest.mock('axios')

describe('forex', () => {
  describe('fetchData', () => {
    it('returns a axios.get() promise that resolves with forex data', () => {
      const currencyData = {
        "EUR": 1.11
      }

      const response = {
        data: currencyData,
        status: 200
      }

      axios.get.mockResolvedValue(response)

      return forex.fetchData()
        .then(data => expect(data).toEqual(currencyData))
    })
  })
})

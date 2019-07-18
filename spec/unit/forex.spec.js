const forex = require('../../src/connections/forex')
const axios = require('axios')

jest.mock('axios')

describe('forex', () => {
  let currencyData, response

  beforeEach(() => {
    currencyData = {
      "EUR": 1.11
    }

    response = {
      data: currencyData,
      status: 200
    }

    axios.get.mockImplementation(() => {
      return Promise.resolve(response)
    })

  })

  describe('fetchData', () => {
    it('returns a axios.get() promise that resolves with forex data', () => {
      return forex.fetchData()
        .then(data => expect(data).toEqual(currencyData))
    })

    it('passes url parameter to axios.get()', async () => {
      await forex.fetchData('url')

      expect(axios.get).toHaveBeenCalledWith('url')
    })
  })
})

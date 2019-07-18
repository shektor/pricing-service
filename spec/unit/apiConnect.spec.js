const apiConnect = require('../../src/connections/apiConnect')
const axios = require('axios')

jest.mock('axios')

describe('api', () => {
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
      return apiConnect.fetchData()
        .then(data => expect(data).toEqual(currencyData))
    })

    it('passes url parameter to axios.get()', async () => {
      await apiConnect.fetchData('url')

      expect(axios.get).toHaveBeenCalledWith('url')
    })
  })
})

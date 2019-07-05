const axios = require('axios')
const url = 'https://api.exchangeratesapi.io/latest?base=GBP'

function fetchData() {
  return axios.get(url)
    .then((response) => {
      if(response.status === 200) {
        return response.data
      }
    }).catch((error) => {
      console.log('Currency API error: ', error.message)
    })
}

module.exports = {
  fetchData
}

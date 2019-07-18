const axios = require('axios')

function fetchData(url) {
  return axios.get(url)
    .then((response) => {
      if(response.status === 200) {
        return response.data
      }
    }).catch((error) => {
      console.log('Request error: ', error.message)
    })
}

module.exports = {
  fetchData
}

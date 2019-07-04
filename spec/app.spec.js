const request = require('supertest')
const app = require('../src/app')

describe('GET /', () => {
  test('it displays holding text', (done) => {
    request(app)
      .get('/')
      .expect(200, 'Pricing Service')
      .end((err) => {
        if (err) throw done(err)
        done()
      })
  })
})

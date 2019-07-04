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

describe('POST /sales', () => {
  test('it returns 201 with JSON echo', (done) => {
    let data = { 'order': {} }

    request(app)
      .post('/sales')
      .send(data)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual(data)

        if (err) throw done(err)
        done()
      })
  })

  test('it returns 400 with invalid JSON request body', (done) => {
    let data = {}

    request(app)
      .post('/sales')
      .send(data)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).toBe(400)

        if (err) throw done(err)
        done()
      })
  })
})

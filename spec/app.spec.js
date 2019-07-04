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
  test('it returns 201 with sale data in JSON', (done) => {
    const order = {
      'order': {
        'id': 12345,
        'customer': {},
        'items': [
          {
            'product_id': 1,
            'quantity': 1
          },
          {
            'product_id': 2,
            'quantity': 5
          },
          {
            'product_id': 3,
            'quantity': 1
          }
        ]
      }
    }

    const sale = {
      'sale': {
        'total': 2099
      }
    }

    request(app)
      .post('/sales')
      .send(order)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual(sale)

        if (err) throw done(err)
        done()
      })
  })

  test('it returns 400 with invalid JSON request body', (done) => {
    const data = {}

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

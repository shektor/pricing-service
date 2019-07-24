# Pricing Service

A RESTful API endpoint that accepts json order requests and returns a sale (priced order).

The endpoint returns a JSON data structure which includes:

* the total price for the order
* the total VAT for the order
* the price and VAT for each item in the order

Pricing is based on the current list [here](https://github.com/shektor/pricing-service/blob/master/data/pricing.json), where prices are in pennies (pound sterling, `GBP`).

The pricing service can return prices in any currency listed [here](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html), by updating the currency code in the request. Prices are calculated using the latest available exchange rate from [Foreign exchange rates API](http://exchangeratesapi.io/). The same VAT rates apply to all returned sales.

## Getting started

```bash
> git clone git@github.com:shektor/pricing-service.git
> cd pricing-service
> npm install
> npm start
```

Server will be available to use when `Listening on port 3000` appears in console.

Pricing endpoint will now be available on http://localhost:3000/sales

## Running tests

The Jest and Supertest frameworks have been used for unit and integration tests respectively.

```bash
> npm test
```

## How to use

A `POST` request needs to be sent to `/sales` with a body that contains a JSON formatted order.

A request that includes the following order...
```json
{
    "order": {
        "id": 12345,
        "customer": {},
        "currency": "GBP",
        "items": [
            {
                "product_id": 1,
                "quantity": 1
            },
            {
                "product_id": 2,
                "quantity": 5
            },
            {
                "product_id": 3,
                "quantity": 1
            }
        ]
    }
}
```

...will return the following sale response.
```json
{
    "sale": {
        "order_id": 12345,
        "total": 29.38,
        "vat": 2.4,
        "currency": "GBP",
        "items": [
            {
                "product_id": 1,
                "quantity": 2,
                "price": 5.99,
                "total": 14.38,
                "vat": 2.4
            },
            {
                "product_id": 2,
                "quantity": 5,
                "price": 2.5,
                "total": 12.5,
                "vat": 0
            },
            {
                "product_id": 3,
                "quantity": 1,
                "price": 2.5,
                "total": 2.5,
                "vat": 0
            }
        ]
    }
}
```

### Currency conversion

The endpoit will convert prices returned in the sale to a currency of your choice. Please supply a three letter currency code as part of the order. An example request is as follows...
```json
{
    "order": {
        "id": 12345,
        "customer": {},
        "currency": "USD",
        "items": [
            {
                "product_id": 1,
                "quantity": 1
            },
            {
                "product_id": 2,
                "quantity": 5
            },
            {
                "product_id": 3,
                "quantity": 1
            }
        ]
    }
}
```

...and the response.
```json
{
    "sale": {
        "order_id": 12345,
        "total": 36.54,
        "vat": 2.98,
        "currency": "USD",
        "items": [
            {
                "product_id": 1,
                "quantity": 2,
                "price": 7.45,
                "total": 17.88,
                "vat": 2.98
            },
            {
                "product_id": 2,
                "quantity": 5,
                "price": 3.11,
                "total": 15.55,
                "vat": 0
            },
            {
                "product_id": 3,
                "quantity": 1,
                "price": 3.11,
                "total": 3.11,
                "vat": 0
            }
        ]
    }
}
```

### Example curl request

```bash
# request
curl -d '{"order":{"id":12345,"customer":{},"currency":"GBP","items":[{"product_id":1,"quantity":1},{"product_id":2,"quantity":5},{"product_id":3,"quantity":1}]}}' -H 'Content-Type: application/json' http://localhost:3000/sales

# response
{"sale":{"order_id":12345,"total":22.19,"vat":1.2,"currency":"GBP","items":[{"product_id":1,"quantity":1,"price":5.99,"total":7.19,"vat":1.2},{"product_id":2,"quantity":5,"price":2.5,"total":12.5,"vat":0},{"product_id":3,"quantity":1,"price":2.5,"total":2.5,"vat":0}]}}
```

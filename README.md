# Pricing Service

A tails.com tech challenge.

## Test Specification

Using pricing data, build a RESTful API endpoint that accepts requests like the one below.

```json
{
    "order": {
        "id": 12345,
        "customer": {},
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

The endpoint should return a data structure which includes:

* the total price for the order
* the total VAT for the order
* the price and VAT for each item in the order

Data structure for the response is up to you.

All monetary values in the `pricing.json` file are in pennies (pound sterling, `GBP`).
The calculated results should be in pennies too.
Any rounding should use standard arithmetic rounding to the nearest penny.

### Going international

In this hypothetical universe we have decided to launch tails.com overseas. 
We now want the pricing service to return prices in any currency. 
Those prices should be calculated using the latest available exchange rate.

Expand the API to allow a currency to be submitted as part of the request, and return the prices in that currency. 
How that currency code is passed in is up to you. 

Use a currency conversion rate API like [free.currencyconverterapi.com](https://free.currencyconverterapi.com/) to get the latest exchange rates as part of your solution.
Assume the same VAT rates apply to all countries and currencies.

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

A `POST` request needs to be sent to http://localhost:3000/sales with a body that contains a JSON formatted order.

As an example you can use a curl request,
```bash
curl -d '{"order":{"id":12345,"customer":{},"currency":"GBP","items":[{"product_id":1,"quantity":1},{"product_id":2,"quantity":5},{"product_id":3,"quantity":1}]}}' -H 'Content-Type: application/json' http://localhost:3000/sales
```

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
        "total": 2219,
        "vat": 120,
        "currency": "GBP",
        "items": [
            {
                "product_id": 1,
                "quantity": 1,
                "price": 599,
                "total": 719,
                "vat": 120
            },
            {
                "product_id": 2,
                "quantity": 5,
                "price": 250,
                "total": 1250,
                "vat": 0
            },
            {
                "product_id": 3,
                "quantity": 1,
                "price": 250,
                "total": 250,
                "vat": 0
            }
        ]
    }
}
```

The API can also convert prices returned in the sale to a currency of your choice. Please supply a three letter currency code as part of the order. An example request is as follows...
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
        "total": 2786,
        "vat": 150,
        "currency": "USD",
        "items": [
            {
                "product_id": 1,
                "quantity": 1,
                "price": 599,
                "total": 902,
                "vat": 150
            },
            {
                "product_id": 2,
                "quantity": 5,
                "price": 250,
                "total": 1570,
                "vat": 0
            },
            {
                "product_id": 3,
                "quantity": 1,
                "price": 250,
                "total": 314,
                "vat": 0
            }
        ]
    }
}
```

## User Stories

```
As a tails customer
So that I can submit a request
I would like an endpoint to submit my data

So that I can create an order consistently
I would like to use the JSON format

So that I can have an order priced
I would like a response from the order

So that I know how much it will cost
I would like the to see an total for the order

So that I know how much VAT I can reclaim
I would like to see the total vat for the order

So that I can check the order was calculated correctly
I would like to see the price for each item
```
```
As a French tails customer
So that I can use the service in France
I would like to provide a currency code

So that I can have the order price in my local currency
I would like the prices returned in provided currency
```

# Pricing Service

A tails.com tech challenge.

## Specification

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

## Running tests

## How to use

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
## Approach


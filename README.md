# Pricing API

A simple REST API that returns product prices.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### GET /api/products/:productId/price

Returns the price for a given product ID.

Example request:
```
GET http://localhost:3000/api/products/123/price
```

Example response:
```json
{
    "productId": "123",
    "price": "99.99"
}
```

Note: Currently returns a static price of 99.99 for all product IDs. 
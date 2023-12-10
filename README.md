<center>

# Store API

</center>

This api is built with NodeJS, ExpressJS, MongoDB. It enables to make an advanced filtering using a **_REST API_**

This documentation describes how to request data from the API and how to interpret the response.

### Product Base URL
> <span style="font-size: 18px; font-weight: 900">`GET`</span> `http://localhost:5000/api/v1/products`

*Responses:*

* <span style="color: #22c55e; font-weight: 900; background: #052e16; padding-inline: 5px; border-radius: 3px">200</span> 
Return Search results for products.

```js
{
  "success": true,
  "pagination": {
        "currentPage": number | 1,
        "totalPages": number,
        "items": {
            "count": number,
            "totalDocument": number,
            "per_page": number | 4
        }
    },
    // Array of products
    "products": {
        "_id": ObjectID,  // mongoDB Id type
        "name": string,
        "price": float,
        "features": boolean,  // default: false
        "rating": boolean,
        "company": string,
        "createdAt": Date,
        "updatedAt": Date
    }[],
}
```

* <span style="color: #ef4444; font-weight: 900; background: #450a0a; padding-inline: 5px; border-radius: 3px">400</span> 
Error: Bas request. When some params doesn't match.

```js
{
  "success": false,
  "error": {
    "status": number,
    "message": string
  }
}
```

<hr />

### query parameters:

| Parameter  | Description                 | Type      |
|  ----      |  ----                       | ---       |
| `search=`  | Search with product `name` _or_ `company`| _String_  |
| `features=`| N/A                         | _Boolean_ |
| `company=` | Filter on specific company.<br /> _enum:_<br />_`ikea`_<br /> _`liddy`_<br />_`caressa`_<br />_`marcos`_| _Boolean_  |
| `numericFilter=`| filter on a specific numerical condition (<, <=, =, > or >=).<br /> Available on:<br />`price`<br /> `rating`| _Boolean_  |
| `limit=`   | Limit the response number   | _Number_  |
| `page=`    | Page Number                 | _Number_  |
| `select=`  | N/A                         | _String_  |
|            |                             |           |

<br />
<br />

By default the limit number of the response is `25` if the given query is higher than the default one, you gonna get Error response: `400:` **Bad Request** 

### Examples
Get all products matching `bra`
> <span style="font-size: 18px; font-weight: 900">`GET`</span> `http://localhost:5000/api/v1/products?search=bra...`

Get all product that have _price_ `<` _500_ ◽ _rating_ `=>` _4_.  
_you can filter with **numericFilter=...**_

> <span style="font-size: 18px; font-weight: 900">`GET`</span>`http://localhost:5000/api/v1/products?search=bra&numericFilter=price<50,rating>=4...`

Select query:
> <span style="font-size: 18px; font-weight: 900">`GET`</span>`http://localhost:5000/api/v1/products?select=name,price...`

```js
{
  "success": true,
  "pagination": {...},
  "products": {
    "name": string,
    "price": float
  }
}
```


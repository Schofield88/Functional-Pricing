# Pricing Data API - Functional Edition

## Objective

To re-write an API I'd coded previously (original readMe for that project at the end) in JavaScript along Functional Programming lines.

## What The Hell Was I Thinking

Functional programming is not something I'm trained in, but I did encounter it at Makers - in the middle of the course it was suggested in my morning article digest by Medium. I had no idea at that time that the Object-Oriented paradigm was not the only way to write code, and struggled to get my head around pretty much everything the article was saying.

However, given that I chose to retrain my touch typing to a Dvorak layout many years ago, after reading one article on alternate keyboard maps, I was probably doomed from the start. I bookmarked a number of FP articles and promised myself that I'd eventually get round to poking the subject with a stick.

The time has come round.

## What The Hell Have I Done

I'd previously built a simple API, designed along OO lines, as an exploratory jaunt into REST and web apps, which would serve as a perfect vehicle to re-write as Functional due to the simplicity of the business logic. When I was coding the thing the first time around, I noticed that a couple of the classes I'd used were only there to support a single method. They were also stateless (as ESLint insisted on constantly pointed out). This felt like a dose of extra code just to get at something that could easily be a single function: the class supporting the method needed to be written, then instantiated and called in the endpoint's controlled function.

During the re-write I also noticed that my previous solution went round the houses a touch, and so chose to strip out a number of steps at the same time. The app now follows four steps:

- The items array on the order request is passed into price(), which returns an array of objects to include the pricing data for each order item
- That return is passed to subtotal(), which calculates the various subtotals and returns the further developed items array
- The array is passed to grandTotal(), that calculates the various order totals and returns an assembled response object
- This invoice object is sent back to the client as the response

## Functional Principles I've Attempted To Not Muff Up

- _Use of pure functions:_ As far as possible, the functions used here are pure, in that they only act on the arguments passed into them with no side effects. Some impure functions are necessary, of course, because the app recovers pricing data from an external json source (represented here by the pricing.json file in the project root) using a synchronous Node function.
- _No mutable state:_ No variables were mutated in the writing of this app. This had the rather curious effect of making the code much more explicit in some places: namely, because price() and subTotal() build and return an object, the structure of the object is present in the code itself. This massively enhances the readability of the code for someone coming after.
- _No loops:_ Any iteration is handled with methods such as map() and reduce().
- _Function composition:_ The response of the app is built on a chain of three functions, in which the output of one is the argument of the next. Initially, in the orderController the final invoice object was built thus:
  `const final = grandTotal(subTotal(price(orderJson)))`
  which was rubbish. Function composition is the correct way to chain functions in this manner, which makes use of the higher order function compose() on line 7. NB: this was not my code. However, the result is correct application of function composition.

## Known Issues

The price function is currently tightly coupled with getPriceAndVat(). The test for this function, then, is technically an integration test and is not correctly isolated.

_(Original ReadMe below)_

# Pricing Data API

## Objective

Build a back-end with a single end point that returns a response object for a simulated customer order.

## Setup

As this is an Express.js app, you will need [Node.js installed](https://nodejs.org/en/download/) on your machine. Then, once the zip file has extracted, at the command line run:

`npm install`

to install project dependencies.

## Run

To start the server, type:

`npm start`

at the command line. As Nodemon is used as a project dependency, if you wish to make any changes to the code you will not need to restart the server.

The server listens on port 3000, and the end point for the app is:

`http://localhost:3000/api/order`

Please see the [Testing](#testing) section below for details on how to interact with the app.

## Design choices and assumptions

The app was build using an Express.js skeleton, which permitted a fast set-up for the single end-point. The acceptance criteria for this API are:

> The endpoint should return a data structure which includes:
>
> - the total price for the order
> - the total VAT for the order
> - the price and VAT for each item in the order

It was decided that the response would be in .json format. The response would be structured as below:

```
{
  "invoice" : {
    "order_net": [value_in_pennies],
    "order_vat": [value_in_pennies],
    "order_gross": [value_in_pennies],
    "items": [
          {
            "product_id": [number],
            "quantity": [number],
            "unit_price": [value_in_pennies],
            "unit_vat": [value_in_pennies],
            "sub_total": [value_in_pennies],
            "sub_vat": [value_in_pennies],
          },
          {
	          "product_id": [a_different_id]
	          ...
          }
    ],
  }
}
```

The items array would be populated by as many objects as there were items in the json request sent to the end-point.

The design flow implemented here is as such:

- The request (the order) is made to the end-point with JSON data
- The request is passed to a route controller, orderController
- The process() controller function instantiates classes responsible for handling the processing logic and creates a skeleton invoice response
- The Items instance is used to create and populate a remapped items array returns the fully-remapped items array
- The customer object is passed to GrandTotal.calculate(), which returns the completed invoice
- The process function sends the full invoice object to the client

It was assumed initially that front-end error handling would ensure that the request to the end point would always be correctly-formatted, and that it would contain at least one product in the items array.

## Testing

The testing framework for this solution was Jest, chosen over Jasmine simply because I have a preference for the command line interface (similar to Rspec, which was the framework I was trained in). The Unit tests are fully isolated, while the Integration test is properly mocked out.

To run the tests, at the command line type:

`npm test`

to run the Jest script. Please note that this will start Jest in Watch mode; press 'q' to exit.

To interact with the app directly, [you will need to use something like Postman](https://www.getpostman.com/downloads/). Postman was used to manually test the API throughout development. Open Postman, click the orange "New" button in the top left, then "Request". Give the new request a name, then save it.

Click "Get" and change the request type to "Post", and enter the following end-point into the address bar to the right:

`http://localhost:3000/api/order`

The Post request requires a json body, samples of which are provided below:

```
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
                "product_id": 3,
                "quantity": 1
            }
        ]
    }
}
```

```
{
    "order": {
        "id": 1337,
        "customer": {},
        "items": [
            {
                "product_id": 1,
                "quantity": 1
            },
            {
                "product_id": 2,
                "quantity": 10
            },
            {
                "product_id": 4,
                "quantity": 8
            }
        ]
    }
}
```

Paste one of these, or any json following this structure, into body of the request, click the "raw" radio button, and ensure the drop-down menu at the end is set to "JSON (application/json)".

Press the blue Send button, and the response will appear in the window at the bottom.

## Future Changes

At the time of writing, the decision was made to create a separate class that would calculate the subtotal for each of the items array objects. In hindsight, this feels like an over-abstraction; the SubTotal class has no state and a single method, which probably belongs on the Price class. This will be refactored later, but for the moment has been left as-is because the test contains my first successful class mock in Jest. I may need this example sitting somewhere for a while.

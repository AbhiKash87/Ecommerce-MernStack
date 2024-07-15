const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const stripe = require("stripe")(process.env.stripe_server_key);


const webhookRouter = express.Router();

const endpointSecret = process.env.endpointSecret;

webhookRouter.post('/', express.raw({type: 'application/json'}), (request, response) => {
    const sig = request.headers['stripe-signature'];
    
    console.log("yha tak aa rha")
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      console.log(err)
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        const order_id = paymentIntentSucceeded.metadata.order_id;
        console.log("paymentSuccessfull:")
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  });




exports.router = webhookRouter;
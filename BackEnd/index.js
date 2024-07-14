// package import
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport')
const {sessionLogger} = require('./Middlewares/sessionLogger');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv')


// Routers import
const ProductRouters = require('./routes/ProductRoutes');
const categoryRouters = require('./routes/CategoryRoutes');
const brandRouters = require('./routes/BrandRoutes');
const userRouters = require('./routes/UserRoutes');
const authRouters = require('./routes/AuthRoutes');
const cartRouters = require('./routes/CartRoutes');
const orderRouters = require('./routes/OrderRoutes');
const ensureAuthenticated = require('./Middlewares/Ensureauthenticated');
const path = require('path');


dotenv.config()
const app = express();
const PORT = process.env.PORT;
const DBURI = process.env.DBURI; 




//middlewares 
app.use(cors()); // Enable CORS for all routes

const endpointSecret = process.env.endpointSecret;

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {

  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      const orderId = paymentIntentSucceeded.metadata.order_id;

      console.log('Payment successful! Order ID:', orderId);
      
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});




//To parse req.body
app.use(express.json());  
app.use(express.urlencoded({extended:true}));


// app.use(sessionLogger);
app.use(passport.initialize());




// Routers imported
app.use('/products',ensureAuthenticated(),ProductRouters.router); //product Routers
app.use('/categories',ensureAuthenticated(),categoryRouters.router); //category Routers
app.use('/brands',ensureAuthenticated(),brandRouters.router); //brand Routers
app.use('/user',ensureAuthenticated(),userRouters.router); //user Routers
app.use('/auth',authRouters.router); //auth Routers
app.use('/cart',ensureAuthenticated(),cartRouters.router); //auth Routers
app.use('/order',ensureAuthenticated(),orderRouters.router); //auth Routers



//for react build
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
//Mongo db connection and server(app) listen code 
mongoose.connect(DBURI)
.then((result) => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})
.catch((err) => console.log(err));


 

// This is your test secret API key.
const stripe = require("stripe")(process.env.stripe_server_key);
app.post("/create-payment-intent", async (req, res) => {
  const { subTotal,order_id } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    description: 'Software development services',
    shipping: {
      name: 'Abhishek kashyap',
      address: {
        line1: 'abhishek kashyap',
        postal_code: '495668',
        city: 'Raipur',
        state: 'Chhattisgarh',
        country: 'india',
      },
    },
    amount: subTotal*100,
    currency: "inr",
    metadata: {
      order_id: order_id
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });

  console.log("payment intent created")
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});





// app.use(express.raw({type:'application/json'}));
// This is your Stripe CLI webhook secret for testing your endpoint locally.




// const session = require('express-session')
// const passportSessionConfig = require('./Middlewares/passportSessionConfig')
// const PassportJWTConfig = require('./Middlewares/PassportJWTConfig')

// session based authentication
// app.use(session({
//     secret: process.env.SECRET_KEY,
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({mongoUrl:DBURI,collectionName:'session'}),
//     cookie: {
//         maxAge: 60*60*1000
//     }

// }))

// app.use(passport.session());
// app.use(passport.authenticate('session'));











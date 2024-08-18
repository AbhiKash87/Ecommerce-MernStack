// package import
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const sessionLogger = require("./Middlewares/sessionLogger");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");

// Routers import
const ProductRouters = require("./routes/ProductRoutes");
const categoryRouters = require("./routes/CategoryRoutes");
const brandRouters = require("./routes/BrandRoutes");
const userRouters = require("./routes/UserRoutes");
const authRouters = require("./routes/AuthRoutes");
const cartRouters = require("./routes/CartRoutes");
const orderRouters = require("./routes/OrderRoutes");
const webhookRouters = require("./routes/WebhookRoutes");
const ensureAuthenticated = require("./Middlewares/Ensureauthenticated");
const path = require("path");

dotenv.config();
const app = express();
const port = process.env.PORT || 5173;
const DBURI = process.env.DBURI;

//middlewares
app.use(cors()); // Enable CORS for all routes

app.use("/webhook", webhookRouters.router);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Routers imported
app.use("/products", ensureAuthenticated(), ProductRouters.router);
app.use("/categories", ensureAuthenticated(), categoryRouters.router);
app.use("/brands", ensureAuthenticated(), brandRouters.router);
app.use("/user", ensureAuthenticated(), userRouters.router);
app.use("/auth", authRouters.router);
app.use("/cart", ensureAuthenticated(), cartRouters.router);
app.use("/order", ensureAuthenticated(), orderRouters.router);

// Serve React build
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({ message: "Api has started running" }).status(200);
  });
}

// Stripe API setup
const stripe = require("stripe")(process.env.stripe_server_key);
app.post("/create-payment-intent", async (req, res) => {
  const { subTotal, order_id } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      description: "Software development services",
      shipping: {
        name: "Abhishek kashyap",
        address: {
          line1: "abhishek kashyap",
          postal_code: "495668",
          city: "Raipur",
          state: "Chhattisgarh",
          country: "india",
        },
      },
      amount: subTotal * 100,
      currency: "inr",
      metadata: {
        order_id: order_id,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log("Payment intent created");
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    res.status(500).json({ error: "Failed to create PaymentIntent" });
  }
});

// MongoDB connection and server listen
mongoose
  .connect(DBURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
//  module.exports = app; // Export the Express app

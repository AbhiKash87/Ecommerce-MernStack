/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./Stripe.css";
import { useSelector } from "react-redux";
import { authFetch } from "../features/CustomApi/CustomFetch";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51MrJw9SJq6iHf5n9g1oA5Z0BksJvM5DLVmySW5jkcy6vaAX4iplugbnVSPmI3BxEDtHkJc2u44jyjmKbzi9RLfM300sK3aEk4r");

export default function StripeCheckOut() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector((state) => state.order.currentOrder);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    authFetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subTotal: currentOrder.subTotal, order_id: currentOrder.id })

    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
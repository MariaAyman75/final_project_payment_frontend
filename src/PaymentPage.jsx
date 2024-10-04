// PaymentPage.js
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useEffect } from 'react';

const stripePromise = loadStripe('pk_test_51Q5PQ5RriQFy8QgNx1vb4HOY9l1f3o8uduqmBFWGh0Nq7JQJQcU1hTuvahkwFlS0HB0ZnOESjlq0YapdUm4w8hdn008DuMtvKL');

function PaymentPage({ cartItems, totalPrice }) {
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    // Call backend to create checkout session
    fetch('http://127.0.0.1:8000/api/create-checkout-session/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartItems, totalPrice }),
    })
      .then((res) => res.json())
      .then((data) => setSessionId(data.id));
  }, [cartItems, totalPrice]);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <div>
      <h2>Total: ${totalPrice}</h2>
      <button onClick={handleCheckout}>Checkout with Stripe</button>
    </div>
  );
}

export default PaymentPage;

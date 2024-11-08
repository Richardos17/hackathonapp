// pages/checkout.js
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const amount = 2000; // e.g., $20.00 in cents

  const handleCheckout = async () => {
    setLoading(true);

    // Call API to create a checkout session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    const { id } = await response.json();

    // Redirect to Stripe Checkout
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    await stripe.redirectToCheckout({ sessionId: id });
    setLoading(false);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Reserve Your Pitch</h1>
      <p>Amount: ${(amount / 100).toFixed(2)}</p>
      <button
        onClick={handleCheckout}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '18px',
          color: '#fff',
          backgroundColor: '#0070f3',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Processing...' : 'Reserve Now'}
      </button>
    </div>
  );
};

export default CheckoutPage;

// components/CheckoutForm.js
import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    // Call API to create a payment intent
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });
    const { clientSecret } = await response.json();

    // Confirm the payment with Stripe
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setErrorMessage(result.error.message);
      setIsProcessing(false);
    } else if (result.paymentIntent.status === 'succeeded') {
      setPaymentSuccess(true);
      setIsProcessing(false);
    }
  };

  const appearance = {
    theme: 'stripe', // Other options: 'night', 'flat', 'none'
    variables: {
      colorPrimary: '#0570de',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      fontFamily: 'Ideal Sans, system-ui, sans-serif',
      spacingUnit: '2px',
      borderRadius: '4px',
    },
  };

  const cardStyle = {
    style: {
      base: {
        fontSize: '16px',
        color: '#30313d',
        '::placeholder': {
          color: '#a0aec0',
        },
      },
      invalid: {
        color: '#df1b41',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <CardElement options={cardStyle} />
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        style={{
          marginTop: '20px',
          backgroundColor: '#0570de',
          color: '#ffffff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        {isProcessing ? 'Processing…' : `Pay $${(amount / 100).toFixed(2)}`}
      </button>
      {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
      {paymentSuccess && <p style={{ color: 'green', marginTop: '10px' }}>Payment successful! Thank you!</p>}
    </form>
  );
};

export default CheckoutForm;

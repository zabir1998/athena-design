import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51HscrnEL4mlfb13cdUdKPCDNThXdDdt0sbIvUxBNY4AhUb6JcdQnCAXa0Rf9VMBw8IO0u4iVrAIS1oRjTN72ezXL00Jf3MX7Xt');

const Payment = ({handlePay}) => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm handlePay = {handlePay}></PaymentForm>
        </Elements>
    );
};

export default Payment;
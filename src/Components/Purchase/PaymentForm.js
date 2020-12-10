import React, { useState } from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { Link } from 'react-router-dom';

const PaymentForm = ({handlePay}) => {

    const stripe = useStripe();
  const elements = useElements();
  const [payError, setPayError] = useState(null);
  const [paySuccess, setPaySuccess] = useState(null);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
        setPayError(error.message);
        setPaySuccess(null);
    //   console.log('[error]', error);
    } else {
        setPaySuccess(paymentMethod.id);
        setPayError(null);
        handlePay(paymentMethod.id);
    //   console.log('[PaymentMethod]', paymentMethod);
    }
  };


    return (
         <div>
             <form onSubmit={handleSubmit}>
      <div className="bg-light p-4"><CardElement /> </div> <br/>
      <button className="btn btn-light" type="submit" disabled={!stripe}>
        Done Payment! 
      </button>
    </form> <br/>
    {
        payError && <p className="text-danger bg-light text-center">{payError}</p>
    }
    {
        paySuccess && <p className="text-secondary bg-light text-center">Your payment Was Successful</p>
    }
    <br/>
    {
        paySuccess && <Link style={{textDecoration: 'none'}} to = "/userService"><button className="btn btn-success">Dashboard</button> </Link>
    }
         </div>
    );
};

export default PaymentForm;
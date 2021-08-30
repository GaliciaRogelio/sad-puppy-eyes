import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
require('dotenv').config();
//const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

// const stripePromise = loadStripe(
//     process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

// );

const stripePromise = loadStripe('pk_test_51JSANPInUtp60H3yifEcWiP5Cd3JYJxkkTz6WjNqVkjlNvEG2xHEMBU0VQEIVfpjACiUr0j12SNsopWO5tLEcDmY00f7P2Qu1s');

const CheckoutPage3 = () => {
    const [stripeError, setStripeError] = useState();
    const [loading, setLoading] = useState();

    const handleClick = async () => {
        setLoading(true);

        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            lineItems: [
                {
                    price: 'price_1JTfA6InUtp60H3ySBd67Z0e',
                    quantity: 1,
                },
            ],
            mode: "payment",
            cancelUrl: window.location.origin,
            successUrl: `${window.location.origin}`,
        });

        if (error) {
            setLoading(false);
            setStripeError(error);
        }

    };

    return (
        <>
            {stripeError && <p style={{ color: "red" }}>{stripeError}</p>}
            <div className="donateDiv">
                <div className="donateMsg">
                    Thank you for your generosity!
                    Please click the button below to donate $50!
                </div>
                <button className="btn col-12 col-md-2" role="link" onClick={handleClick} disabled={loading}>
                    Donate Today!
                </button>
            </div>
        </>
    );
};


export default CheckoutPage3;
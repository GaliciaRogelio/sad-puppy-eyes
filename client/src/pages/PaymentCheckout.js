import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
//const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

// const stripePromise = loadStripe(
//     `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`

// );

const stripePromise = loadStripe('pk_test_51JSANPInUtp60H3yifEcWiP5Cd3JYJxkkTz6WjNqVkjlNvEG2xHEMBU0VQEIVfpjACiUr0j12SNsopWO5tLEcDmY00f7P2Qu1s');

const IndexPage = () => {
    const [stripeError, setStripeError] = useState();
    const [loading, setLoading] = useState();

    const handleClick = async() => {
        setLoading(true);

        const stripe = await stripePromise;

        const { error } = await stripe.redirectToCheckout({
            lineItems: [
                {
                    // price: `${process.env.NEXT_PUBLIC_STRIPE_PRICE_ID}`,
                    price: 'price_1JSCSPInUtp60H3yUp3Wyfnl',
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
        {/* {stripeError && <p style={{ color: "red" }}>{StripeError}</p>} */}

        <button role="link" onClick={handleClick} disabled={loading}>
            Go to Checkout
        </button>
        </>
    );
};

export default IndexPage;
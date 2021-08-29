export const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://sad-puppy-eyes.herokuapp.com'
  : 'http://localhost:3001'


  module.exports = {
    env: {
      PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    }
  };

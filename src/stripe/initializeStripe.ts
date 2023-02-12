import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Stripe | null;

export default async function() {
  if (!stripePromise) {
    stripePromise = await loadStripe(
      process.env.REACT_APP_STRIPE_PK!
    );
  }
  return stripePromise;
}
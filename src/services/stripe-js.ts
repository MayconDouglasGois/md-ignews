import { loadStripe } from "@stripe/stripe-js";

async function GetStripeJs() {
  const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_API_KEY);

  return stripeJs
}

export { GetStripeJs };

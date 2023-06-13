import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./Checkout";

const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_pk);
console.log(stripePromise);
const Payment = () => {

  return (
    <div>
      <h2 className="text-3xl text-center mb-5 underline">Pay Class</h2>
      <Elements stripe={stripePromise}>
        <Checkout></Checkout>
      </Elements>
    </div>
  );
};

export default Payment;

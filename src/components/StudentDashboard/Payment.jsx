import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./Checkout";
import useSelectedClass from "../../hooks/useSelectedClass";

// TODO: provide publishable key
const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_pk);
console.log(stripePromise);
const Payment = () => {
  const [selectedClass] = useSelectedClass();
  const total = selectedClass.reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
    <div>
      <h2 className="text-3xl text-center mb-5 underline">Payment</h2>
      <Elements stripe={stripePromise}>
        <Checkout price={total}></Checkout>
      </Elements>
    </div>
  );
};

export default Payment;

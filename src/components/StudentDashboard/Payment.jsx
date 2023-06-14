import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./Checkout";
import useUserData from "../../hooks/useUserData";
import { Navigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_pk);
console.log(stripePromise);
const Payment = () => {
  const [userData] = useUserData();

  return (
    <div>
      {!userData.role ? (
        <>
          <h2 className="text-3xl text-center mb-5 underline">Pay Class</h2>
          <Elements stripe={stripePromise}>
            <Checkout></Checkout>
          </Elements>
        </>
      ) : (
        <Navigate to="/dashboard/user-role" replace={true}></Navigate>
      )}
    </div>
  );
};

export default Payment;

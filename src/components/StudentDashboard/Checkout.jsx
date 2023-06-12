import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

// eslint-disable-next-line react/prop-types
const Checkout = ({ price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCardError("");

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      console.log(paymentMethod);
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "unknown",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }
    if (paymentIntent.status === "succeeded") {
     setSuccess(paymentIntent.id) 
    }
    console.log(paymentIntent);
  };

  return (
    <div className="bg-base-200 p-8 rounded-lg">
      <h3 className="my-3 text-secondary text-xl font-semibold">Total Price: ${price}</h3>
      <form onSubmit={handleSubmit}>
        <CardElement
          className="border border-gray-300 dark:border-gray-600 p-5 rounded-lg"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "gray",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        {cardError && <p className="text-error">{cardError}</p>}
        {success && <p className="text-success pt-2">Transaction success! Transaction id: {success}</p>}
        <button
          type="submit"
          className="btn btn-primary mt-5 btn-sm"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default Checkout;

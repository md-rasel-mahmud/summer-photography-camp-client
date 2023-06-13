import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useSelectedClass from "../../hooks/useSelectedClass";
import { useNavigate, useParams } from "react-router-dom";
import {} from "react-icons";
import { FaEnvelope } from "react-icons/fa";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [selectedClass, refetch] = useSelectedClass();
  const { checkoutId } = useParams();
  const [processOrder, setProcessOrder] = useState(false);


  const navigate = useNavigate();

  const paymentInfo = selectedClass.find(
    (payItem) => payItem._id === checkoutId
  );
  const { price } = paymentInfo || {};

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price]);

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
    setProcessOrder(true);
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
      axiosSecure
        .delete(`/selected-classes?id=${paymentInfo?._id}`)
        .then((res) => console.log(res.data));

      axiosSecure
        .post("/enrolled-class", { selectedClass })
        .then((res) => console.log(res.data));
      
        axiosSecure.patch(`/classes/${paymentInfo.classId}`).then(res=> console.log(res.data))
      refetch();

      setProcessOrder(false);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Payment Success.",
        text: `Order Id: ${paymentIntent.id}`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard/student/my-classes");
    }
    console.log(paymentIntent);
  };

  return (
    <div>
      {paymentInfo && (
        <div className="card lg:card-side bg-base-300 shadow-xl my-2">
          <figure className="p-2">
            <img
              className="lg:w-40 rounded-lg"
              src={paymentInfo?.image}
              alt={paymentInfo?.className}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{paymentInfo?.className}</h2>
            <p className="flex gap-2 items-center">
              <FaEnvelope></FaEnvelope> {paymentInfo?.email}
            </p>
            <div>
              <div className="badge badge-lg badge-secondary badge-outline">
                Price: ${paymentInfo?.price}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="bg-base-200 p-8 rounded-lg">
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
          <button
            type="submit"
            className='btn btn-primary mt-5 btn-sm'
            disabled={!stripe || !clientSecret || processOrder}
          >
            Pay{" "}
            {processOrder && (
              <span className="loading loading-dots loading-sm"></span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

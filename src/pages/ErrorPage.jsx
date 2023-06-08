import { Link, useRouteError } from "react-router-dom";
import Lottie from "lottie-react";
import errorAnimation from "../assets/error-animation.json";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="text-center flex min-h-screen flex-col justify-center ">
      <div className="w-1/4 mx-auto">
        <Lottie animationData={errorAnimation} />
      </div>
      <h2 className="text-2xl text-error mb-4">
        {error.status} {error.statusText}! {error.data}
      </h2>
      <div className="text-center ">
        <Link to={"/"} className="btn btn-accent">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;

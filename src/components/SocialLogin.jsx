import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { loginWithGooglePopup } = useContext(AuthContext);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSocialLogin = () => {
    setProcessing(true)
    loginWithGooglePopup().then((result) => {
      //fetch data: send user email to server via post method
      const user = result.user;
      fetch(`${import.meta.env.VITE_api_link}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          name: user?.displayName,
          photoUrl: user?.photoURL,
        }),
      });
      setProcessing(false)
      navigate("/");
    });
  };
  return (
    <button
      onClick={handleSocialLogin}
      className="btn btn-outline text-xl"
      type="button"
      disabled={processing}
    >
      <FaGoogle></FaGoogle> Google{" "}
      {processing && <span className="loading loading-dots loading-sm"></span>}
    </button>
  );
};

export default SocialLogin;

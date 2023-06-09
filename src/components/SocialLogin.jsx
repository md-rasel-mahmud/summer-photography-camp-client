import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { loginWithGooglePopup } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <button
      onClick={() => loginWithGooglePopup().then(() => navigate("/"))}
      className="btn btn-outline text-xl"
      type="button"
    >
      <FaGoogle></FaGoogle> Google
    </button>
  );
};

export default SocialLogin;

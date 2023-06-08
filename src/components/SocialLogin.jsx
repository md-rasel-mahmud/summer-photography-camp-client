import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { loginWithGooglePopup } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="flex gap-3 justify-center">
      <button
        onClick={() => loginWithGooglePopup().then(() => navigate("/"))}
        className="btn btn-outline text-xl btn-circle"
      >
        <FaGoogle></FaGoogle>
      </button>
    </div>
  );
};

export default SocialLogin;

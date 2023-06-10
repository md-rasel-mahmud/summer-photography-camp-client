import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { loginWithGooglePopup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSocialLogin = () => {
    loginWithGooglePopup().then((result) => {
      //fetch data: send user email to server via post method

      const user = result.user;
      fetch(`${import.meta.env.VITE_api_link}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user?.email, name: user?.displayName}), //pass your email here (optional)
      })
        .then((res) => res.json()) //convert res.body to json and store it in user (optional)
        .then((data) => console.log(data)); //log user data (optional)

      navigate("/");
    }); //redirects to home page if succesful or shows an error message if not.
  };
  return (
    <button
      onClick={handleSocialLogin}
      className="btn btn-outline text-xl"
      type="button"
    >
      <FaGoogle></FaGoogle> Google
    </button>
  );
};

export default SocialLogin;

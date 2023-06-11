/* eslint-disable react/no-unescaped-entities */
import Lottie from "lottie-react";
import registerAnimation from "../assets/registation-animation.json";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import SocialLogin from "../components/SocialLogin";
const Register = () => {
  const { registerWithEmailPass, updateUserInfo } = useContext(AuthContext);
  const [errors, setErrors] = useState("");
  const [showHidePass, setShowHidePass] = useState(false);

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { name, photoUrl, email, password, confirmPass } = data;

    setErrors("");
    if (password.length < 6 && confirmPass.length < 6) {
      setErrors("Password must be at least 6 character");
      return;
    }
    if (!/[A-Z]/.test(password) && !/[A-Z]/.test(confirmPass)) {
      setErrors("Password has to at lest one capital letter");
      return;
    }
    if (
      !/[*@!#%&()^~{}]+/.test(password) &&
      !/[*@!#%&()^~{}]+/.test(confirmPass)
    ) {
      setErrors("Password has to at lest one Spacial Character");
      return;
    }

    if (password !== confirmPass) {
      setErrors("Password does not match");
      return;
    }
    setErrors("");
    console.log(data);
    registerWithEmailPass(email, password).then((result) => {
      const user = result.user;
      // fetch data to server post method send data user email password and user name and password is encrypted and send data to server to register user.
      fetch(`${import.meta.env.VITE_api_link}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user?.email, name , photoUrl}), 
      })
        .then((res) => res.json()) 
        .then((data) => console.log(data));
      updateUserInfo(name, photoUrl);
      console.log(user);
      navigate("/");
    });
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left w-1/2">
            <Lottie animationData={registerAnimation} />
          </div>

          <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
              <h2 className="text-2xl text-secondary text-center font-bold uppercase bg-base-200 py-3 rounded-lg">
                Register Here
              </h2>
              <div className="grid grid-cons-1 md:grid-cols-2 gap-3">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Full Name*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="input input-bordered"
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="email"
                    className="input input-bordered"
                    {...register("email", { required: true })}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password*</span>
                  </label>
                  <input
                    type={showHidePass ? "text" : "password"}
                    placeholder="password"
                    className="input input-bordered"
                    {...register(
                      "password",
                      { required: true },
                      { minLength: 6 }
                    )}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password*</span>
                  </label>
                  <input
                    type={showHidePass ? "text" : "password"}
                    placeholder="Confirm password"
                    className="input input-bordered"
                    {...register(
                      "confirmPass",
                      { required: true },
                      { minLength: 6 }
                    )}
                  />
                </div>
              </div>
              <div className="flex gap-2 my-2 rounded-lg">
                <button
                  onClick={() => setShowHidePass(!showHidePass)}
                  type="button"
                  className="p-2 bg-base-200"
                >
                  {showHidePass ? (
                    <AiFillEyeInvisible></AiFillEyeInvisible>
                  ) : (
                    <AiFillEye></AiFillEye>
                  )}
                </button>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo url</span>
                </label>
                <input
                  type="url"
                  placeholder="Photo url"
                  className="input input-bordered"
                  {...register("photoUrl")}
                />
              </div>

              {errors && <span className="text-error">{errors}</span>}
              <label className="label">
                Already have an account?
                <Link
                  to="/login"
                  className="label-text-alt link link-hover text-success"
                >
                  Login Here
                </Link>
              </label>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-accent">
                  Login
                </button>
              </div>
              <div className="divider">OR REGISTER WITH</div>
              <SocialLogin></SocialLogin>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

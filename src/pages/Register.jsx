/* eslint-disable react/no-unescaped-entities */
import Lottie from "lottie-react";
import registerAnimation from "../assets/registation-animation.json";
import { useForm } from "react-hook-form";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <Lottie animationData={registerAnimation} />
          </div>

          <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
              <h2 className="text-2xl text-secondary text-center font-bold uppercase bg-base-200 py-3 rounded-lg">Register Here</h2>
              <div className="grid grid-cons-1 md:grid-cols-2 gap-3">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo url</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Photo url"
                    className="input input-bordered"
                    {...register("photoUrl", { required: true })}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
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
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="text"
                    placeholder="password"
                    className="input input-bordered"
                    {...register("password", { required: true })}
                  />
                </div>
              </div>
              <label className="label">
                Already have an account?
                <Link
                  to="/login"
                  className="label-text-alt link link-hover text-success"
                >
                  Login Here
                </Link>
              </label>
              {errors.exampleRequired && <span>This field is required</span>}
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-accent">
                  Login
                </button>
              </div>
              <div className="divider">OR REGISTER WITH</div>
              <div className="flex gap-3 justify-center">
                <button className="btn btn-outline text-xl btn-circle">
                  <FaGoogle></FaGoogle>
                </button>
                <button className="btn btn-outline text-xl btn-circle">
                  <FaGithub></FaGithub>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

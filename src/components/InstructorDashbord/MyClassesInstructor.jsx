import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import useUserData from "../../hooks/useUserData";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { FaCheckCircle, FaEnvelope, FaRegTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { AiOutlineWarning } from "react-icons/ai";

const MyClassesInstructor = () => {
  const { user, loading } = useContext(AuthContext);
  const [userData] = useUserData();
  const { register, handleSubmit } = useForm();
  const [updateInfo, setUpdateInfo] = useState("");
  const [processing, setProcessing] = useState(false);

  const { refetch, data: myClass = [] } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["classes", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_api_link}/classes?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });
  const onSubmit = (data) => {
    setProcessing(true);

    fetch(`${import.meta.env.VITE_api_link}/classes/${updateInfo._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          Swal.fire(
            "Updated Class!",
            "Your class has been updated.",
            "success"
          );
          refetch();
        }
      });

    setProcessing(false);
    refetch();
  };

  const handleSeeFeedback = (feedback) => {
    console.log(feedback);
    Swal.fire({
      title: "Admin Feedback",
      text: feedback,
    });
  };

  return (
    <div>
      {userData.role === "instructor" ? (
        <>
          {myClass.length > 0 ? (
            <div className="overflow-x-auto">
              <h2 className="text-2xl font font-semibold text-center underline">
                My Classes
              </h2>
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Class Name</th>
                    <th>Price</th>
                    <th>Instructor Email</th>
                    <th>Enrolled</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {myClass.map((myClass, index) => (
                    <tr key={myClass._id}>
                      <th>{index + 1}</th>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={myClass.classImg}
                                alt={`${myClass.className} image`}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{myClass.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="text-right">${myClass.price}</p>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <FaEnvelope></FaEnvelope> {myClass.instructorEmail}
                        </div>
                      </td>
                      <td>{myClass.enrolledStudents}</td>
                      {/* TODO: add icon to buttons */}
                      <td className="text-center">
                        {myClass.status == "approved" ? (
                          <div className="flex gap-1 items-center text-warning bg-base-200 p-2 rounded-lg text-lg">
                            <FaCheckCircle></FaCheckCircle>
                            <button className="btn btn-warning btn-xs">
                              {myClass.status}
                            </button>
                          </div>
                        ) : myClass.status == "denied" ? (
                          <div className="flex gap-1 items-center text-warning bg-base-200 p-2 rounded-lg text-lg">
                            <FaRegTimesCircle></FaRegTimesCircle>
                            <button className="btn btn-warning btn-xs">
                              {myClass.status}
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-1 items-center text-warning bg-base-200 p-2 rounded-lg text-lg">
                            <AiOutlineWarning></AiOutlineWarning>
                            <button className="btn btn-warning btn-xs">
                              Pending
                            </button>
                          </div>
                        )}
                      </td>
                      <th>
                        <div className="flex items-center gap-2 w-max bg-base-300 p-2 rounded-lg">
                          <label
                            htmlFor="my_modal_6"
                            onClick={() => setUpdateInfo(myClass)}
                            className={`btn btn-accent btn-sm ${
                              processing
                                ? "disabled loading loading-dots loading-sm"
                                : ""
                            }`}
                          >
                            Update
                          </label>
                          <button
                            disabled={myClass.feedbackMsg ? false : true}
                            onClick={() =>
                              handleSeeFeedback(myClass.feedbackMsg)
                            }
                            className="btn btn-primary btn-sm"
                          >
                            See Feedback
                          </button>
                        </div>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* The button to open modal */}
              <input type="checkbox" id="my_modal_6" className="modal-toggle" />
              <div className="modal">
                <div className="modal-box">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="card-body "
                  >
                    <h2 className="text-2xl text-secondary text-center font-bold uppercase bg-base-200 py-3 rounded-lg">
                      Update A Class
                    </h2>
                    <div className="grid grid-cons-1 md:grid-cols-2 gap-3">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Class Name*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Class Name"
                          className="input input-bordered"
                          defaultValue={updateInfo.name}
                          {...register("name", { required: true })}
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Photo url*</span>
                        </label>
                        <input
                          type="url"
                          placeholder="Photo url"
                          className="input input-bordered"
                          defaultValue={updateInfo.classImg}
                          {...register("classImg", { required: true })}
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Available seats*</span>
                        </label>
                        <input
                          type="number"
                          placeholder="Available seats"
                          className="input input-bordered"
                          defaultValue={updateInfo.availableSeats}
                          {...register("availableSeats", { required: true })}
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Price*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Price"
                          className="input input-bordered"
                          defaultValue={updateInfo.price}
                          {...register("price", { required: true })}
                        />
                      </div>
                      <div className="form-control">
                        <input
                          type="hidden"
                          value={updateInfo._id}
                          {...register("id")}
                        />
                      </div>
                    </div>

                    <div className="form-control mt-6">
                      <button type="submit" className="btn btn-accent">
                        Add Class
                      </button>
                    </div>
                  </form>
                  <div className="modal-action">
                    <label htmlFor="my_modal_6" className="btn btn-error">
                      Close!
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-center text-3xl text-error">
                You didn&apos;t added any class!
              </h1>
              <div className="text-center my-3">
                <Link className="btn btn-sm btn-primary" to={"/classes"}>
                  Go to Classes
                </Link>
              </div>
            </div>
          )}
        </>
      ) : (
        <Navigate to="/dashboard/user-role" replace={true}></Navigate>
      )}
    </div>
  );
};

export default MyClassesInstructor;

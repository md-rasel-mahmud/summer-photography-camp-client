import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from 'sweetalert2'

const AddAClass = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const classData = {...data, status: 'pending', instructorImg: user?.photoURL} 
    // fetch data to server /class post method
    fetch(`${import.meta.env.VITE_api_link}/classes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(classData),
    })
    .then(res=> res.json())
    .then(data => {
    if (data.insertedId) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your Class Added Successful.',
            showConfirmButton: false,
            timer: 1500
          })
    }
    })
    // console.log(classData);
  };
  return (
    <div>
      <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
          <h2 className="text-2xl text-secondary text-center font-bold uppercase bg-base-200 py-3 rounded-lg">
            Add A Class
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
                {...register("classImg")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Instructor Name</span>
              </label>
              <input
                type="text"
                placeholder="Instructor Name"
                className="input input-bordered"
                value={user?.displayName}
                {...register("instructorName", { required: true })}
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
                value={user?.email}
                {...register("instructorEmail", { required: true })}
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
                {...register(
                  "availableSeats",
                  { required: true },
                  { minLength: 6 }
                )}
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
                {...register("price", { required: true })}
              />
            </div>
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-accent">
              Add Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAClass;

import {
  FaChalkboardTeacher,
  FaEnvelope,
  FaUser,
  FaUserShield,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useUserData from "../../hooks/useUserData";
import useAllUserData from "../../hooks/useAllUserData";

const AllUsers = () => {
  const [userData] = useUserData();
  const [allUserData, refetch] = useAllUserData();
  console.log(allUserData);

  const handleMakeInstructor = (instructor) => {
    Swal.fire({
      title: "Are you sure?",
      text: `to make Instructor ${instructor.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I do!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_api_link}/user?id=${instructor._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: "instructor" }),
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            refetch();
          });
      }
    });
  };

  const handleMakeAdmin = (admin) => {
    Swal.fire({
      title: "Are you sure?",
      text: `to make Admin ${admin.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I do!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_api_link}/user?id=${admin._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: "admin" }),
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            refetch();
          });
      }
    });
  };
  return (
    <>
      {userData.role === "admin" && allUserData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Student Name</th>
                <th>Student Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {allUserData.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={user.photoUrl}
                            alt={`${user.className} image`}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <FaEnvelope></FaEnvelope> {user.email}
                    </div>
                  </td>
                  <td>
                    {user.role ? (
                      <div className="flex w-max btn btn-xs pointer-events-none btn-secondary items-center gap-1 uppercase">
                        <FaUserShield></FaUserShield>
                        {user.role}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 uppercase">
                        <FaUser></FaUser> student
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="flex items-center w-max gap-2 bg-base-300 p-2 rounded-lg">
                      <button
                        onClick={() => handleMakeInstructor(user)}
                        className="btn btn-accent btn-sm"
                        disabled={
                          user.role === "instructor" ||
                          (user.role === "admin" && true)
                        }
                      >
                        <FaChalkboardTeacher></FaChalkboardTeacher> Make
                        instructor
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleMakeAdmin(user)}
                        disabled={user.role === "admin" && true}
                      >
                        <FaUserShield></FaUserShield> make admin
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h1 className="text-center text-3xl text-error">User not found!</h1>
          <div className="text-center my-3">
            <Link className="btn btn-sm btn-primary" to={"/classes"}>
              Go to Classes
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default AllUsers;

import { FaEnvelope } from "react-icons/fa";
import useSelectedClass from "../../hooks/useSelectedClass";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import useUserData from "../../hooks/useUserData";

const MyClassesStudent = () => {
  const [selectedClass, refetch] = useSelectedClass();
  const [userData] = useUserData();
  console.log(selectedClass);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_api_link}/selected-classes?id=${id}`, {
          method: "DELETE",
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
      {!userData.role ? (
        <>
          {selectedClass.length > 0 ? (
            <div className="overflow-x-auto">
              <h2 className="text-2xl font font-semibold text-center underline">
                My Classes
              </h2>
              <div className="flex justify-between bg-base-200 p-4 rounded-lg mt-2">
                <p>Selected classes: {selectedClass.length}</p>
                <p>
                  Total Price:{" "}
                  {selectedClass.reduce((sum, item) => {
                    const price = parseFloat(item.price);
                    return sum + price;
                  }, 0)}
                </p>
                <Link to={'/dashboard/student/checkout'} className="btn btn-primary btn-sm">
                  Pay
                </Link>
              </div>
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Class Name</th>
                    <th>Price</th>
                    <th>Student Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {selectedClass.map((myClass, index) => (
                    <tr key={myClass._id}>
                      <th>{index + 1}</th>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={myClass.image}
                                alt={`${myClass.className} image`}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{myClass.className}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="text-right">${myClass.price}</p>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <FaEnvelope></FaEnvelope> {myClass.email}
                        </div>
                      </td>
                      <th>

                          <button
                            onClick={() => handleDelete(myClass._id)}
                            className="btn btn-error btn-sm btn-circle"
                          >
                            X
                          </button>
                        
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
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
      ) : userData.role === "admin" ? (
        <Navigate to="/dashboard/admin/manage-users" replace={true}></Navigate>
      ) : (
        <Navigate
          to="/dashboard/instructor/my-classes"
          replace={true}
        ></Navigate>
      )}
    </>
  );
};

export default MyClassesStudent;

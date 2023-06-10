import { FaEnvelope } from "react-icons/fa";
import useSelectedClass from "../../hooks/useSelectedClass";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyClasses = () => {
  const [selectedClass, refetch] = useSelectedClass();
  console.log(selectedClass);

  const handleDelete = async (id) => {
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

    // console.log(data);
  };
  return (
    <>
      {selectedClass.length > 0 ? (
        <div className="overflow-x-auto">
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
                    <div className="flex items-center gap-2 bg-base-300 p-2 rounded-lg">
                      <button
                        onClick={() => handleDelete(myClass._id)}
                        className="btn btn-error btn-sm"
                      >
                        X
                      </button>
                      <button className="btn btn-primary btn-sm">Pay</button>
                    </div>
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
  );
};

export default MyClasses;

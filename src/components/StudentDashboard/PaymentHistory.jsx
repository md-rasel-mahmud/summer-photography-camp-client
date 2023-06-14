import { Link, Navigate } from "react-router-dom";
import useEnrolledClasses from "../../hooks/useEnrolledClasses";
import useUserData from "../../hooks/useUserData";
import { FaCheckCircle, FaEnvelope } from "react-icons/fa";

const PaymentHistory = () => {
  const [enrolledClasses] = useEnrolledClasses();
  const [userData] = useUserData();

  return (
    <div>
      <h2 className="capitalize my-4 text-2xl text-center">
        my enrolled classes: {enrolledClasses.length}
      </h2>
      <>
        {!userData.role ? (
          <>
            {enrolledClasses.length > 0 ? (
              <div className="overflow-x-auto bg-base-200 rounded-lg">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Class Name</th>
                      <th>Price</th>
                      <th>Student Email</th>
                      <th>Transaction Id</th>
                      <th>Payment Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {enrolledClasses.map((enrolled, index) => (
                      <tr key={enrolled._id}>
                        <th>{index + 1}</th>
                        <td>
                          <div className="flex items-center space-x-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  src={enrolled.image}
                                  alt={`${enrolled.className} image`}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">
                                {enrolled.className}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="text-right">${enrolled.price}</p>
                        </td>
                        <td>
                          <div className="flex items-center gap-1">
                            <FaEnvelope></FaEnvelope> {enrolled.email}
                          </div>
                        </td>
                        <td>
                          {enrolled.transactionId}
                        </td>
                        <td>
                          {enrolled.enrolledAt
                            .split("T")
                            .join(" ")
                            .split(":")
                            .slice(0, 2)
                            .join(":")}
                        </td>
                        <th>
                          <div className="flex gap-2 rounded-lg w-fit bg-base-300 p-3">
                            <button className="btn btn-success btn-sm pointer-events-none">
                              Payed <FaCheckCircle></FaCheckCircle>
                            </button>
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
                  You didn&apos;t Enrolled any class!
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
          <Navigate
            to="/dashboard/user-role"
            replace={true}
          ></Navigate>
        )}
      </>
    </div>
  );
};

export default PaymentHistory;

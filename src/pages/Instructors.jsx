import { FaEnvelope } from "react-icons/fa";
import Heading from "../components/Heading";
import useAllClasses from "../hooks/useAllClasses";

const Instructors = () => {
  const [allClasses, status] = useAllClasses();

  return (
    <>
      <Heading heading={"Instructors"}></Heading>
      {status === "loading" && (
        <div className="flex justify-center items-center h-[40vh]">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}
      <div className="max-w-screen-xl mx-auto my-8">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-primary/20 text-xl dark:text-white">
              <tr>
                <th>#</th>
                <th>Instructor Name</th>
                <th>Class Name</th>
                <th>Available Seat</th>
                <th>Enrolled</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody className="">
              {/* row 1 */}
              {allClasses
                .filter((approved) => approved.status === "approved")
                .map((instructor, index) => (
                  <tr
                    className={
                      instructor.availableSeats === 0
                        ? "bg-red-500/20"
                        : "bg-base-200"
                    }
                    key={instructor._id}
                  >
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={instructor.instructorImg}
                              alt={`Avatar for ${instructor.instructorName}`}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {instructor.instructorName}
                          </div>
                          <div className="text-sm opacity-50 flex items-center gap-1">
                            <FaEnvelope></FaEnvelope>{" "}
                            {instructor.instructorEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{instructor.name}</td>
                    <td>{instructor.availableSeats}</td>
                    <td>{instructor.enrolledStudents}</td>
                    <th>{instructor.price}</th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Instructors;

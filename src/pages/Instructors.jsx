import { useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import Heading from "../components/Heading";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_api_link}/classes`)
      .then((res) => res.json())
      .then((data) => setInstructors(data));
  }, []);

  return (
    <>
    <Heading heading={'Instructors'}></Heading>
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
                <th>Price</th>
              </tr>
            </thead>
            <tbody className="">
              {/* row 1 */}
              {instructors.map((instructor, index) => (
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
                          <FaEnvelope></FaEnvelope> {instructor.instructorEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{instructor.name}</td>
                  <td>{instructor.availableSeats}</td>
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

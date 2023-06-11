import { FaChalkboardTeacher, FaEnvelope } from "react-icons/fa";

/* eslint-disable react/prop-types */
const InstructorCard = ({ instructorsCard }) => {
  return (
    <>
      {instructorsCard.map((card) => (
        <div
          key={card._id}
          className={`card lg:card-side ${
            card.availableSeats === 0 ? "bg-red-500/50" : "bg-base-300"
          } shadow-lg mx-2`}
        >
          <figure className="p-5 shadow-lg">
            <img
              className="rounded-lg w-full lg:h-40"
              src={card.instructorImg}
              alt={card.name}
            />
          </figure>
          <div
            className={`card-body ${
              card.availableSeats === 0 ? "bg-red-500/70" : "bg-base-200"
            } w-full rounded-lg`}
          >
            <h2 className="card-title ">
              Instructor Name:{" "}
              <span className="text-primary">{card.instructorName}</span>
            </h2>
            <p className="flex items-center gap-1">
              <FaChalkboardTeacher></FaChalkboardTeacher> 
              <b>Class:</b> {card.name}
            </p>
            <p className="flex items-center gap-1">
              <FaEnvelope></FaEnvelope>  { card.instructorEmail}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default InstructorCard;

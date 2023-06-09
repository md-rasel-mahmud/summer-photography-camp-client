import { FaChalkboardTeacher } from "react-icons/fa";

/* eslint-disable react/prop-types */
const ClassCard = ({ classesCard }) => {

  return (
    <>
      {classesCard.map((card) => (
        <div key={card._id} className={`card lg:card-side ${card.availableSeats === 0 ? 'bg-red-500/50' : 'bg-base-300'} shadow-lg mx-2`}>
          <figure className="p-5 shadow-lg">
            <img className="rounded-lg w-full lg:h-44" src={card.classImg} alt={card.name} />
          </figure>
          <div className={`card-body ${card.availableSeats === 0 ? 'bg-red-500/70' : 'bg-base-200'} w-full rounded-lg`}>
            <h2 className="card-title text-primary">{card.name}</h2>
            <p className="flex items-center gap-1"><FaChalkboardTeacher></FaChalkboardTeacher> {card.instructorName}</p>
            <p><b>Price: </b> ${card.price}</p>
            <p><b>Available Seats: </b> {card.availableSeats}</p>
            <div className="card-actions">
              <button className={`btn btn-accent btn-block btn-sm ${card.availableSeats === 0 ? 'btn-disabled opacity-50' : ''}`}>Select</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ClassCard;

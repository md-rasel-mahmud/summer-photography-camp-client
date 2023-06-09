import { FaChalkboardTeacher } from "react-icons/fa";

/* eslint-disable react/prop-types */
const ClassCard = ({ classesCard }) => {

  return (
    <>
      {classesCard.map((card) => (
        <div key={card._id} className={`card lg:card-side ${card.available_seats === 0 ? 'bg-red-500' : 'bg-base-300'} shadow-lg mx-2`}>
          <figure className="p-5 shadow-lg">
            <img className="rounded-lg" src={card.image} alt={card.name} />
          </figure>
          <div className={`card-body ${card.available_seats === 0 ? 'bg-red-500/50' : 'bg-base-200'} w-full rounded-lg`}>
            <h2 className="card-title text-primary">{card.name}</h2>
            <p className="flex items-center gap-1"><FaChalkboardTeacher></FaChalkboardTeacher> {card.instructor_name}</p>
            <p><b>Price: </b> ${card.price}</p>
            <p><b>Available Seats: </b> {card.available_seats}</p>
            <div className="card-actions">
              <button className={`btn btn-accent btn-block btn-sm ${card.available_seats === 0 ? 'btn-disabled opacity-50' : ''}`}>Select</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ClassCard;

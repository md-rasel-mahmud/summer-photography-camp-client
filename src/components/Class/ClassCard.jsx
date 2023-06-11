import { useContext } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from 'sweetalert2'
import useSelectedClass from "../../hooks/useSelectedClass";
import useUserData from "../../hooks/useUserData";

/* eslint-disable react/prop-types */
const ClassCard = ({ classesCard }) => {
  const { user } = useContext(AuthContext);
  const [, refetch] = useSelectedClass()
  const [userData] = useUserData()

  const handleSelectedClass = (card) => {
    // fetch data from server: method post and the card data will be send
    if (user && user.email) {
      fetch(`${import.meta.env.VITE_api_link}/selected-classes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classId: card._id,
          className: card.name,
          price: card.price,
          image: card.classImg,
          email: user?.email,
        }),
      })
        .then((res) => res.json()) // convert response to json and return it.)
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            refetch()
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your Class has been added success.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
  };

  return (
    <>
      {classesCard.map((card) => (
        <div
          key={card._id}
          className={`card lg:card-side ${
            card.availableSeats === 0 ? "bg-red-500/50" : "bg-base-300"
          } shadow-lg mx-2`}
        >
          <figure className="p-5 shadow-lg">
            <img
              className="rounded-lg w-full lg:h-44"
              src={card.classImg}
              alt={card.name}
            />
          </figure>
          <div
            className={`card-body ${
              card.availableSeats === 0 ? "bg-red-500/70" : "bg-base-200"
            } w-full rounded-lg`}
          >
            <h2 className="card-title text-primary">{card.name}</h2>
            <p className="flex items-center gap-1">
              <FaChalkboardTeacher></FaChalkboardTeacher> {card.instructorName}
            </p>
            <p>
              <b>Price: </b> ${card.price}
            </p>
            <p>
              <b>Available Seats: </b> {card.availableSeats}
            </p>
            <div className="card-actions">
              <button
                onClick={() => handleSelectedClass(card)}
                className="btn btn-accent btn-block btn-sm"
                disabled={userData.role === 'admin' || 'instructor' && card.availableSeats === 0 ? true : false}
              >
                Select
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ClassCard;

import { useEffect, useState } from "react";

import Heading from "../Heading";
import InstructorCard from "../Instructor/InstructorCard";

const PopularInstructors = () => {
  const [popularInstructors, setPopularInstructors] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_api_link}/classes`)
      .then((res) => res.json())
      .then((data) => {
        const sortClass = data.sort(
          (a, b) => b.availableSeats - a.availableSeats
        );
        setPopularInstructors(sortClass);
      });
  }, []);
  return (
    <>
      <div className="divider"></div>
      <Heading heading={"Popular Instructors"}></Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-screen-xl mx-auto my-8">
        <InstructorCard instructorsCard={popularInstructors.slice(0, 6)}></InstructorCard>
      </div>
      <div className="divider"></div>
    </>
  );
};

export default PopularInstructors;

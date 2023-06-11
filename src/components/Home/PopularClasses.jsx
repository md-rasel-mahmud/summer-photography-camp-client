import { useEffect, useState } from "react";
import Heading from "../Heading";
import ClassCard from "../Class/ClassCard";

const PopularClasses = () => {
  const [popularClass, setPopularClass] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_api_link}/classes`)
      .then((res) => res.json())
      .then((data) => {
        const sortClass = data.sort(
          (a, b) => b.availableSeats - a.availableSeats
        );
        console.log(sortClass);
        setPopularClass(sortClass);
      });
  }, []);
  console.log(popularClass);
  return (
    <>
      <div className="divider"></div>
      <Heading heading={"popular classes"}></Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-screen-xl mx-auto my-8">
        <ClassCard classesCard={popularClass.filter(approved => approved.status === 'approved').slice(0, 6)}></ClassCard>
      </div>
      <div className="divider"></div>
    </>
  );
};

export default PopularClasses;

import { useEffect, useState } from "react";
import ClassCard from "../components/ClassCard";
import Heading from "../components/Heading";

const Classes = () => {
    const [classesCard, setClassesCard] = useState([])
  useEffect(() => {
    fetch(`${import.meta.env.VITE_api_link}/classes`)
      .then((res) => res.json())
      .then((data) => setClassesCard(data));
  }, []);

  console.log(classesCard);

  return (
    <>
    <Heading heading={'classes'}></Heading>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-screen-xl mx-auto my-8">
      <ClassCard classesCard={classesCard}></ClassCard>
    </div>
    </>
  );
};

export default Classes;

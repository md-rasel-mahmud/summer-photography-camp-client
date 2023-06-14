import { useEffect, useState } from "react";
import Heading from "../Heading";
import ClassCard from "../Class/ClassCard";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const PopularClasses = () => {
  const [popularClass, setPopularClass] = useState([]);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_api_link}/classes`)
      .then((res) => res.json())
      .then((data) => {
        const sortClass = data.sort(
          (a, b) => b.availableSeats - a.availableSeats
        );
        setPopularClass(sortClass);
      });
  }, []);

  return (
    <>
      <div className="divider"></div>
      <Heading heading={"popular classes"}></Heading>
      <motion.div ref={ref} initial={{ opacity: 0, y: 80 }} animate={controls}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-screen-xl mx-auto my-8">
          <ClassCard
            classesCard={popularClass
              .filter((approved) => approved.status === "approved")
              .slice(0, 6)}
          ></ClassCard>
        </div>
      </motion.div>
      <div className="divider"></div>
    </>
  );
};

export default PopularClasses;

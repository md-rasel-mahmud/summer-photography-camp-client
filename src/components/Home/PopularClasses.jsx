import { useEffect } from "react";
import Heading from "../Heading";
import ClassCard from "../Class/ClassCard";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useAllClasses from "../../hooks/useAllClasses";

const PopularClasses = () => {
  const [allClasses, status] = useAllClasses();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <>
      <div className="divider"></div>
      <Heading heading={"popular classes"}></Heading>
      {status === "loading" && (
        <div className="flex justify-center items-center h-[40vh]">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}
      <motion.div ref={ref} initial={{ opacity: 0, y: 80 }} animate={controls}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-screen-xl mx-auto my-8">
          <ClassCard
            classesCard={allClasses
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

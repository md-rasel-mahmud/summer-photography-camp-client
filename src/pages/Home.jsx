import Banner from "../components/Home/Banner";
import Faq from "../components/Home/Faq";
import PopularClasses from "../components/Home/PopularClasses";
import PopularInstructors from "../components/Home/PopularInstructors";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Home = () => {
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
    <div>
      <motion.div ref={ref} initial={{ opacity: 0, y: -50 }} animate={controls}>
        <Banner></Banner>
        <PopularClasses></PopularClasses>
        <PopularInstructors></PopularInstructors>
        <Faq></Faq>
      </motion.div>
    </div>
  );
};

export default Home;

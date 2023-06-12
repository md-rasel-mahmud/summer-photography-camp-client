import Banner from "../components/Home/Banner";
import Faq from "../components/Home/Faq";
import PopularClasses from "../components/Home/PopularClasses";
import PopularInstructors from "../components/Home/PopularInstructors";

const Home = () => {
  return (
    <div>
      <Banner></Banner>

      <PopularClasses></PopularClasses>
      <PopularInstructors></PopularInstructors>
      <Faq></Faq>
    </div>
  );
};

export default Home;

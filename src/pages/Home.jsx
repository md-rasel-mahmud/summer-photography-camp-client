import Banner from "../components/Home/Banner";
import PopularClasses from "../components/Home/PopularClasses";
import PopularInstructors from "../components/Home/PopularInstructors";

const Home = () => {
  return (
    <div>
      <Banner></Banner>

      <PopularClasses></PopularClasses>
      <PopularInstructors></PopularInstructors>
    </div>
  );
};

export default Home;

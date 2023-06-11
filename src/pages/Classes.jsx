import Heading from "../components/Heading";
import ClassCard from "../components/Class/ClassCard";
import useAllClasses from "../hooks/useAllClasses";

const Classes = () => {
  const [allClasses] = useAllClasses()

  return (
    <>
      <Heading heading={"classes"}></Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-screen-xl mx-auto my-8">
        <ClassCard classesCard={allClasses}></ClassCard>
      </div>
    </>
  );
};

export default Classes;

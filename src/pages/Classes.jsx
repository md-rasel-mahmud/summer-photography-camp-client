import Heading from "../components/Heading";
import ClassCard from "../components/Class/ClassCard";
import useAllClasses from "../hooks/useAllClasses";

const Classes = () => {
  const [allClasses, status] = useAllClasses()

  return (
    <>
      <Heading heading={"classes"}></Heading>
      {status === "loading" && (
        <div className="flex justify-center items-center h-[40vh]">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-screen-xl mx-auto my-8">
        <ClassCard classesCard={allClasses.filter(approved => approved.status === 'approved')}></ClassCard>
      </div>
    </>
  );
};

export default Classes;

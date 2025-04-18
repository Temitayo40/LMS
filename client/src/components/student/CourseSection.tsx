import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";
import { Course } from "../../Model/Courses";

const CourseSection = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("CourseSection must be used within an AppContextProvider");
  }

  const { allCourses } = context;
  return (
    <div className="py-16 md:px-40 px-8">
      <h2 className="text-3xl font-medium text-gray-800">
        Learn from the best
      </h2>
      <p className="text-sm md:text-base text-gray-500">
        Discover our top rated courses across various categoreis. from coding to{" "}
        <br />
        business and wellness, Our courses are crafted to deliver results.
      </p>
      <div className="grid [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] px-4 md:px-0 md:my-16 my-10 gap-4">
        {allCourses.slice(0, 4).map((course: Course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
      <Link
        to={"/course-list"}
        onClick={() => scrollTo(0, 0)}
        className="text-gray-500 border border-gray-500/30 px-10 py-3 rounded"
      >
        Show all courses
      </Link>
    </div>
  );
};

export default CourseSection;

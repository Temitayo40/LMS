import { useContext, useEffect, useState } from "react";
import SearchBar from "../../components/student/SearchBar";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import CourseCard from "../../components/student/CourseCard";
import { Course } from "../../Model/Courses";
import { assets } from "../../assets/assets";
import Footer from "../../components/student/Footer";

const CoursesList = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("CoursesList must be used within an AppContextProvider");
  }

  const { navigate, allCourses } = context;
  const { id } = useParams();

  const [filteredCourse, setFilteredCourse] = useState<Course[]>([]);

  useEffect(() => {
    const tempCourses = allCourses.slice();
    // if filterdValues = () =>{}
    if (allCourses && allCourses.length > 0) {
      const filterdValue = id
        ? setFilteredCourse(
            tempCourses.filter((item) =>
              item.courseTitle.toLowerCase().includes(id.toLowerCase())
            )
          )
        : setFilteredCourse(tempCourses);
      return filterdValue;
    }
  }, [allCourses, id]);

  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 text-left">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">
              Course List
            </h1>
            <p className="text-gray-500">
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => navigate("/")}
              >
                Home
              </span>{" "}
              / <span>Course Lists</span>
            </p>
          </div>
          <SearchBar data={id} />
        </div>
        {id && (
          <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600">
            <p>{id}</p>
            <img
              src={assets.cross_icon}
              alt="cross_icon"
              className="cursor-pointer"
              onClick={() => navigate("/course-list")}
            />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 px-2 gap-3 md:px-0">
          {filteredCourse.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CoursesList;

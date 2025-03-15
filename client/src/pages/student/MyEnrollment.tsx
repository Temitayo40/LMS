import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from "rc-progress";
import Footer from "../../components/student/Footer";

const MyEnrollment = () => {
  const context = useContext(AppContext);

  const [progressArray, setProgressArray] = useState([
    {
      lectureCompleted: 2,
      totalecture: 4,
    },
    {
      lectureCompleted: 1,
      totalecture: 5,
    },
    {
      lectureCompleted: 2,
      totalecture: 6,
    },
    {
      lectureCompleted: 3,
      totalecture: 7,
    },
    {
      lectureCompleted: 2,
      totalecture: 6,
    },
    {
      lectureCompleted: 0,
      totalecture: 9,
    },
    {
      lectureCompleted: 3,
      totalecture: 4,
    },
    {
      lectureCompleted: 7,
      totalecture: 7,
    },
    {
      lectureCompleted: 4,
      totalecture: 10,
    },
    {
      lectureCompleted: 2,
      totalecture: 10,
    },
    {
      lectureCompleted: 2,
      totalecture: 4,
    },
  ]);

  if (!context) throw new Error("Can't use context outside of it's context");

  const { enrolledCourses, calculateCourseDuration, navigate } = context;
  return (
    <>
      <div className="md:px-36 px-8 pt-10">
        <h1 className="text-2xl font-semibold">My Enrollments</h1>
        <table className="md:table-auto table-fixed w-full overflow-hidden border mt-10">
          <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden">
            <tr>
              <th className="px-4 py-3 font-semibold truncate">Course</th>
              <th className="px-4 py-3 font-semibold truncate">Duration</th>
              <th className="px-4 py-3 font-semibold truncate">Completed</th>
              <th className="px-4 py-3 font-semibold truncate">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {enrolledCourses.map((course, index) => (
              <tr key={index} className="border-b border-gray-500/20">
                <td className="md:px-4 pl-2 py-3 flex items-center space-x-3">
                  <img
                    src={course.courseThumbnail}
                    alt=""
                    className="w-14 sm:w-24 md:w-28"
                  />
                  <div className="flex-1">
                    <p>{course.courseTitle}</p>
                    <Line
                      strokeWidth={2}
                      percent={
                        progressArray[index]
                          ? (progressArray[index].lectureCompleted * 100) /
                            progressArray[index].totalecture
                          : 0
                      }
                      className="bg-gray-300 rounded-full"
                    />
                  </div>
                </td>
                <td className="px-4  py-3 max-sm:hidden">
                  {calculateCourseDuration(course)}
                </td>
                <td className="px-4 py-3 max-sm:hidden">
                  4 / 10
                  {progressArray[index] &&
                    `${progressArray[index].lectureCompleted} / ${progressArray[index].totalecture}`}
                  <span>Lectures</span>
                </td>
                <td className="px-4 py-3 sm:text-right">
                  <button
                    onClick={() => navigate("/player/" + course._id)}
                    className="bg-blue-600 text-white px-3 sm:px-5 py-1.5 sm:py-2 max-sm:text-xs "
                  >
                    {progressArray[index] &&
                    progressArray[index].lectureCompleted /
                      progressArray[index].totalecture ===
                      1
                      ? "completed"
                      : "On Going"}
                    On Going
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default MyEnrollment;
